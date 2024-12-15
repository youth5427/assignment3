const express = require("express");
const { Op } = require("sequelize");
const authenticateToken = require("../middlewares/authenticateToken");
const Application = require("../models/application");
const JobPosting = require("../models/job_posting");

const router = express.Router();

// 지원하기
router.post("/", authenticateToken, async (req, res) => {
  const { userId } = req.user; // 토큰에서 사용자 정보 추출
  const { jobPostingId } = req.body;

  try {
    // 중복 지원 체크
    const existingApplication = await Application.findOne({
      where: { userId, jobPostingId },
    });

    // 기존 지원 내역이 존재하고 상태가 'applied'인 경우 에러 반환
    if (existingApplication) {
      if (existingApplication.status === "applied") {
        return res
          .status(400)
          .json({ error: "이미 해당 공고에 지원했습니다." });
      } else if (existingApplication.status === "cancelled") {
        // 상태가 'cancelled'인 경우 기존 내역 업데이트
        existingApplication.status = "applied";
        existingApplication.appliedAt = new Date();
        await existingApplication.save();
        return res.status(200).json({
          message: "지원 상태 갱신 완료",
          application: existingApplication,
        });
      }
    }

    // 새로운 지원 정보 저장
    const application = await Application.create({
      userId,
      jobPostingId,
      status: "applied",
      appliedAt: new Date(),
    });

    res.status(201).json({ message: "지원 완료", application });
  } catch (error) {
    console.error("지원 중 오류 발생:", error);
    res.status(500).json({ error: error.message });
  }
});

// 사용자 지원 내역 조회
router.get("/view", authenticateToken, async (req, res) => {
  const { userId } = req.user; // 토큰에서 사용자 정보 추출

  try {
    // 사용자 지원 내역 조회
    const applications = await Application.findAll({
      where: {
        userId,
        status: "applied", // 지원 상태가 "applied"인 경우만 필터링
      },
      include: [
        {
          model: JobPosting,
          as: "jobPosting",
          attributes: ["title", "company", "location", "deadline"],
        },
      ],
      order: [["appliedAt", "DESC"]], // 지원일 기준으로 내림차순 정렬
    });

    console.log("Applications:", applications);

    if (applications.length === 0) {
      return res.status(404).json({ message: "지원 내역이 없습니다." });
    }

    res.status(200).json({
      message: "사용자 지원 내역 조회 성공",
      applications,
    });
  } catch (error) {
    console.error("사용자 지원 내역 조회 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 지원 취소
router.delete("/:id", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    // 지원 내역 확인
    const application = await Application.findOne({ where: { id, userId } });
    if (!application) {
      return res.status(404).json({ error: "지원 내역을 찾을 수 없습니다." });
    }

    // 취소 가능 여부 확인
    if (application.status !== "applied") {
      return res
        .status(400)
        .json({ error: "현재 상태에서는 지원을 취소할 수 없습니다." });
    }

    // 상태 업데이트
    application.status = "cancelled";
    await application.save();

    res.json({ message: "지원 취소 완료", application });
  } catch (error) {
    console.error("지원 취소 중 오류 발생:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

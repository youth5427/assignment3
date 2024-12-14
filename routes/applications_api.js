const express = require("express");
const { Op } = require("sequelize");
const authenticateToken = require("../middlewares/authenticateToken");
const Application = require("../models/application");
const JobPosting = require("../models/job_posting");
const User = require("../models/user");

const router = express.Router();

// 지원하기
router.post("/applications", authenticateToken, async (req, res) => {
  const { userId } = req.user; // 토큰에서 사용자 정보 추출
  const { jobPostingId } = req.body;

  try {
    // 중복 지원 체크
    const existingApplication = await Application.findOne({
      where: { userId, jobPostingId },
    });

    if (existingApplication) {
      return res.status(400).json({ error: "이미 해당 공고에 지원했습니다." });
    }

    // 지원 정보 저장
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

// 지원 내역 조회
router.get("/applications", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const { status, sortBy = "appliedAt", order = "DESC" } = req.query;

  try {
    // 필터 설정
    const filters = { userId };
    if (status) filters.status = status;

    // 지원 내역 조회
    const applications = await Application.findAll({
      where: filters,
      include: [{ model: JobPosting, attributes: ["title", "company"] }],
      order: [[sortBy, order]],
    });

    res.json({ applications });
  } catch (error) {
    console.error("지원 내역 조회 중 오류 발생:", error);
    res.status(500).json({ error: error.message });
  }
});

// 지원 취소
router.delete("/applications/:id", authenticateToken, async (req, res) => {
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

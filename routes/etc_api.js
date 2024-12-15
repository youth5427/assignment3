const express = require("express");
const { Op } = require("sequelize");
const JobPosting = require("../models/job_posting");

const router = express.Router();

// 총 데이터 갯수를 반환하는 API
router.get("/", async (req, res) => {
  try {
    // 데이터베이스의 전체 JobPosting 갯수 조회
    const totalJobs = await JobPosting.count();

    // 결과 반환
    res.json({ total: totalJobs });
  } catch (error) {
    console.error("Error fetching total job count:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

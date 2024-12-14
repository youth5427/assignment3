const express = require("express");
const { Op } = require("sequelize");
const JobPosting = require("../models/job_posting");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      sortBy = "id",
      order = "ASC",
      location,
      experience,
      salary,
      keyword,
    } = req.query;
    const pageSize = 20;
    const offset = (page - 1) * pageSize;

    // 필터 초기화
    const filters = {};
    if (location) filters.location = location;
    if (experience) filters.experience = experience;
    if (salary) filters.salary = { [Op.gte]: salary };
    if (keyword) filters.title = { [Op.like]: `%${keyword}%` };

    console.log("Applied Filters:", filters);

    const jobs = await JobPosting.findAndCountAll({
      where: filters,
      order: [[sortBy, order]],
      limit: pageSize,
      offset,
    });

    res.json({ total: jobs.count, jobs: jobs.rows, page, pageSize });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching job with ID: ${id}`);

    const job = await JobPosting.findByPk(id); // Primary Key로 조회
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await job.increment("views"); // 조회수 증가
    // 최신 데이터를 다시 가져오기
    const updatedJob = await JobPosting.findByPk(id);

    // 클라이언트에 반환
    res.json(updatedJob);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

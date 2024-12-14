const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // JWT 키
const authenticateToken = require("../middlewares/authenticateToken"); //authenticateToken 미들웨어

const authorizeAdmin = require("../middlewares/authorizeAdmin");

// 회원가입
router.post("/register", async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // 역할 검증: admin 또는 user만 허용
    if (role !== "admin" && role !== "user") {
      return res
        .status(400)
        .json({ error: "유효하지 않은 역할입니다. (admin 또는 user만 허용)" });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role, // 입력받은 역할 저장
    });

    res.status(201).json({
      message: "회원가입 성공",
      userId: newUser.id,
      role: newUser.role,
    });
  } catch (error) {
    res.status(500).json({ error: "회원가입 실패", details: error.message });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 확인
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    // Access Token 생성 (사용자 역할 포함)
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role, // 사용자의 역할 정보 (admin, user 등)
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1h", // 토큰 만료 시간
    });

    // 응답으로 Access Token 반환
    res.json({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role, // 사용자 역할 반환
      },
    });
  } catch (error) {
    res.status(500).json({ error: "로그인 실패", details: error.message });
  }
});

// 회원 정보 수정
// 회원 정보 수정 (관리자 전용으로 변경)
router.put("/profile", authenticateToken, authorizeAdmin, async (req, res) => {
  const { userId, username, email, currentPassword, newPassword } = req.body;

  try {
    // 사용자 확인
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    // 사용자 이름 수정
    if (username) {
      // 새로운 사용자 이름이 이미 존재하는지 확인
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser && existingUser.id !== userId) {
        return res
          .status(400)
          .json({ error: "이미 존재하는 사용자 이름입니다." });
      }
      user.username = username;
    }

    // 이메일 수정
    if (email) {
      user.email = email;
    }

    // 비밀번호 변경
    if (currentPassword && newPassword) {
      // 현재 비밀번호 확인
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "기존 비밀번호가 일치하지 않습니다." });
      }

      // 새 비밀번호 암호화 및 저장
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }

    // 변경 사항 저장
    await user.save();

    res.json({
      message: "회원 정보 수정 성공",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "회원 정보 수정 실패", details: error.message });
  }
});

// 비밀번호 암호화 갱신 (예: JWT 갱신)
router.post("/refresh", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const newToken = jwt.sign({ userId: decoded.userId }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "토큰 갱신 성공", token: newToken });
  } catch (error) {
    res.status(401).json({ error: "토큰 갱신 실패", details: error.message });
  }
});
// 관리자 전용 API
router.get("/admin/data", authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: "관리자 전용 데이터에 접근 성공!" });
});
module.exports = router;

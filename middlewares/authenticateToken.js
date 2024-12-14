const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization; // Authorization 헤더 읽기
  console.log("Authorization Header:", authHeader); // 헤더 값 로그 출력
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer " 제거

  if (!token) {
    return res.status(401).json({ error: "Access token is required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", decoded); // 디코드된 토큰 정보 출력
    req.user = decoded; // req.user에 사용자 정보 저장
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = authenticateToken;

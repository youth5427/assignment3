function authorizeAdmin(req, res, next) {
  console.log("User in Request:", req.user); // req.user 값 출력
  // req.user가 정의되지 않은 경우 처리
  if (!req.user) {
    return res.status(403).json({ error: "Unauthorized: User not found" });
  }

  // 사용자 역할 확인
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin role required" });
  }

  next();
}

module.exports = authorizeAdmin;

const { Sequelize } = require("sequelize");
require("dotenv").config(); // .env 파일에서 환경 변수 로드

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  process.env.DB_NAME, // 데이터베이스 이름
  process.env.DB_USER, // 사용자 이름
  process.env.DB_PASSWORD, // 비밀번호
  {
    host: process.env.DB_HOST, // 데이터베이스 호스트
    port: process.env.DB_PORT, // 포트 번호
    dialect: "mysql", // MySQL 사용
    logging: console.log, // SQL 쿼리 로깅 활성화
  }
);

// 데이터베이스 연결 테스트
(async () => {
  try {
    await sequelize.authenticate();
    console.log("데이터베이스 연결 성공!");
    console.log("Database Config:", {
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });
  } catch (error) {
    console.error("데이터베이스 연결 실패:", error);
  }
})();

module.exports = sequelize;

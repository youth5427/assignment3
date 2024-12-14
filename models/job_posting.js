const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const job_posting = sequelize.define(
  "job_posting",
  {
    id: {
      type: DataTypes.INTEGER, // 정수형 데이터
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    link: {
      type: DataTypes.TEXT, // TEXT
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    education: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    employment_type: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    deadline: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    sector: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    salary: {
      type: DataTypes.STRING(255), // VARCHAR(255)
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER, // 정수형 데이터
      allowNull: true,
      defaultValue: 0, // 기본값 0
    },
  },
  {
    tableName: "job_posting", // 테이블 이름 설정
    timestamps: false, // createdAt, updatedAt 비활성화
  }
);

(async () => {
  await sequelize.sync({});
  console.log("테이블 동기화 완료");
})();

module.exports = job_posting;

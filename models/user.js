const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // 수정된 경로

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // 기본 역할은 일반 사용자
    validate: {
      isIn: [["admin", "user"]], // 역할 제한
    },
  },
});

(async () => {
  await sequelize.sync(); // 테이블 생성
})();

module.exports = User;

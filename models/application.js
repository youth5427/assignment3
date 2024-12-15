const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const JobPosting = require("./job_posting");
const User = require("./user");

const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobPostingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "applied",
    },
    appliedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "applications",
    timestamps: false,
  }
);

// 외래키 설정
Application.belongsTo(JobPosting, {
  foreignKey: "jobPostingId",
  as: "jobPosting", // alias 명시적으로 설정
});
Application.belongsTo(User, { foreignKey: "userId" });

module.exports = Application;

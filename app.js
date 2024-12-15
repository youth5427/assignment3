var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// 라우터 불러오기
var authRouter = require("./routes/auth");
var jobsRouter = require("./routes/jobs_api");
const applicationsApi = require("./routes/applications_api");

// Swagger 설정 불러오기
var swaggerSetup = require("./config/swagger");

var app = express();

// CORS 설정 추가
app.use(cors());

// Swagger UI 설정
swaggerSetup(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 라우터 연결
app.use("/auth", authRouter);
app.use("/jobs", jobsRouter);
app.use("/applications", applicationsApi); // 지원 관리 API 경로 추가

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

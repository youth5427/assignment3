// config/swagger.js
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "Express 앱용 Swagger 문서",
    },
    servers: [
      {
        url: "http://113.198.66.75:13192",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "Jobs",
        description: "채용 공고 관련 API",
      },
      {
        name: "Users",
        description: "사용자 관리 API",
      },
      {
        name: "Applications",
        description: "지원 관리 API",
      },
      {
        name: "etc",
        description: "기타 API",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "../swagger-docs/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// // swagger.js
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "My API Documentation",
//             version: "1.0.0",
//             description: "API 문서를 자동 생성하는 Swagger",
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000",
//             },
//         ],
//     },
//     apis: ["./routes/*.js"], // API 경로 설정
// };

// const swaggerSpec = swaggerJsdoc(options);

// const swaggerDocs = (app) => {
//     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//     console.log("Swagger 문서: http://localhost:3000/api-docs");
// };

// module.exports = swaggerDocs;

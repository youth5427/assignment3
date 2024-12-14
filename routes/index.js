var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Hello API
 *     description: 간단한 Hello 메시지를 반환
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, World!"
 */
router.get('/hello', function(req, res, next) {
  res.json({ message: "Hello, World!" });
});

module.exports = router;

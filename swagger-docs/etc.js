/**
 * @swagger
 * /etc:
 *   get:
 *     summary: 총 데이터 갯수 조회
 *     tags: [etc]
 *     responses:
 *       200:
 *         description: 총 데이터 갯수 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: 총 데이터 갯수
 *       500:
 *         description: 서버 오류
 */

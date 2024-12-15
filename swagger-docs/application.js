// swagger-docs/application.js
/**
 * @swagger
 * /applications:
 *   post:
 *     summary: 지원하기
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobPostingId:
 *                 type: integer
 *                 description: 지원할 공고 ID
 *     responses:
 *       201:
 *         description: 지원 완료
 *       400:
 *         description: 중복 지원
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /applications/view:
 *   get:
 *     summary: 사용자의 지원 내역 조회
 *     description: 인증된 사용자의 지원 내역을 조회합니다.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 지원 내역 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 사용자 지원 내역 조회 성공
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 10
 *                       jobPostingId:
 *                         type: integer
 *                         example: 5
 *                       status:
 *                         type: string
 *                         example: applied
 *                       appliedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-12-15T12:34:56.000Z
 *                       jobPosting:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: Software Engineer
 *                           company:
 *                             type: string
 *                             example: OpenAI
 *                           location:
 *                             type: string
 *                             example: San Francisco, CA
 *                           deadline:
 *                             type: string
 *                             example: 2024-01-15
 *       404:
 *         description: 지원 내역 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 지원 내역이 없습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 */

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: 지원 취소
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 지원 ID
 *     responses:
 *       200:
 *         description: 지원 취소 완료
 *       404:
 *         description: 지원 내역을 찾을 수 없음
 *       400:
 *         description: 취소 불가 상태
 *       500:
 *         description: 서버 오류
 */

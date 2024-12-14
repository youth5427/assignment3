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
 * /applications:
 *   get:
 *     summary: 지원 내역 조회
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           description: 지원 상태 (예: applied, cancelled)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           description: 정렬 기준 필드 (기본값: appliedAt)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           description: 정렬 순서 (ASC 또는 DESC, 기본값: DESC)
 *     responses:
 *       200:
 *         description: 지원 내역 목록
 *       500:
 *         description: 서버 오류
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

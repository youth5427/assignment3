// swagger-docs/jobs.js
/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: 공고 목록 조회
 *     description: >
 *       채용 공고를 페이지네이션, 필터링, 검색 및 정렬 옵션으로 조회합니다.
 *     tags: [Jobs]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: >
 *           페이지 번호 (기본값: 1)
 *         required: false
 *         schema:
 *           type: integer
 *       - name: sortBy
 *         in: query
 *         description: >
 *           정렬 기준 필드 (기본값: id)
 *         required: false
 *         schema:
 *           type: string
 *       - name: order
 *         in: query
 *         description: >
 *           정렬 방식 (ASC 또는 DESC, 기본값: ASC)
 *         required: false
 *         schema:
 *           type: string
 *       - name: location
 *         in: query
 *         description: >
 *           지역 필터
 *         required: false
 *         schema:
 *           type: string
 *       - name: experience
 *         in: query
 *         description: >
 *           경력 필터
 *         required: false
 *         schema:
 *           type: string
 *       - name: salary
 *         in: query
 *         description: >
 *           최소 급여 필터
 *         required: false
 *         schema:
 *           type: integer
 *       - name: keyword
 *         in: query
 *         description: >
 *           키워드 검색 (제목, 섹터 등)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: >
 *           성공적으로 채용 공고를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: 총 공고 수
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: 공고 목록
 *                 page:
 *                   type: integer
 *                   description: 현재 페이지
 *                 pageSize:
 *                   type: integer
 *                   description: 페이지 크기
 */

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: 공고 상세 조회
 *     description: >
 *       특정 ID를 기반으로 채용 공고의 상세 정보를 조회합니다.
 *       조회할 때마다 해당 공고의 조회수(view)가 증가합니다.
 *     tags: [Jobs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: >
 *           채용 공고의 고유 ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: >
 *           성공적으로 상세 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 company:
 *                   type: string
 *                 title:
 *                   type: string
 *                 link:
 *                   type: string
 *                 location:
 *                   type: string
 *                 experience:
 *                   type: string
 *                 education:
 *                   type: string
 *                 employment_type:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                 sector:
 *                   type: string
 *                 salary:
 *                   type: string
 *                 views:
 *                   type: integer
 *       404:
 *         description: >
 *           해당 ID의 공고를 찾을 수 없음
 */

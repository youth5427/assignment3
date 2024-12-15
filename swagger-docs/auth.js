// swagger-docs/auth.js
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 사용자를 등록합니다.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               role:
 *                 type: string
 *                 example: "user"
 *                 description: "사용자 역할 (admin 또는 user)"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 role:
 *                   type: string
 *                   example: "user"
 *       400:
 *         description: 유효하지 않은 역할
 *       500:
 *         description: 회원가입 실패
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     description: 사용자 이름과 비밀번호를 사용해 로그인하고 JWT 토큰을 발급받습니다.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usertest"
 *               password:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: 비밀번호 불일치
 *       404:
 *         description: 사용자 미발견
 */

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: 회원 정보 수정
 *     description: 회원의 이메일 주소, 사용자 이름을 수정하거나 비밀번호를 변경합니다. admin 역할만 입력 가능합니다.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [] # Swagger에서 Bearer Token 사용 설정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               username:
 *                 type: string
 *                 example: "newUsername"
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *               currentPassword:
 *                 type: string
 *                 example: "currentPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: 회원 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원 정보 수정 성공"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "newUsername"
 *                     email:
 *                       type: string
 *                       example: "newemail@example.com"
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
 *       401:
 *         description: 비밀번호 변경 실패 (기존 비밀번호 불일치)
 *       500:
 *         description: 회원 정보 수정 실패
 */

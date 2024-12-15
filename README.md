# Assignment3

### 프로젝트 개요

`assignment3`은 Node.js와 Express를 기반으로 개발된 웹 애플리케이션입니다. 이 프로젝트는 RESTful API를 제공하며, 데이터베이스(MySQL)와 연동하여 지원, 공고 관리 등의 기능을 제공합니다.

---

### 주요 기능

1. **지원 관리**
   - 지원하기, 지원 취소, 지원 내역 조회.
2. **공고 관리**
   - 공고 조회 및 데이터 갯수 확인.
3. **기타 기능**
   - `/etc` 경로를 통해 총 데이터 갯수 조회.

---

### 프로젝트 구조

assignment3/
├── routes/ # 라우터 파일
│ ├── applications_api.js # 지원 관련 API
│ ├── jobs_api.js # 공고 관련 API
│ └── etc_api.js # 기타 기능 API
├── models/ # 데이터베이스 모델
│ ├── application.js # 지원 모델
│ ├── job_posting.js # 공고 모델
│ └── user.js # 사용자 모델
├── config/ # 설정 파일
│ ├── swagger.js # Swagger 설정
│ └── database.js # 데이터베이스 설정
├── app.js # Express 애플리케이션 초기화
├── package.json # npm 패키지 설정 파일
├── README.md # 프로젝트 설명서
└── .gitignore # Git 제외 파일 설정

설치 및 실행 방법

1. 필수 조건
   Node.js 14.x 이상
   MySQL 8.x 이상
2. 설치
   저장소를 클론합니다:

bash
코드 복사
git clone https://github.com/youth5427/assignment3.git
cd assignment3
의존성을 설치합니다:

bash
코드 복사
npm install 3. 환경 변수 설정
config/database.js 파일에서 MySQL 데이터베이스 설정을 입력합니다:

javascript
코드 복사
module.exports = {
development: {
username: "your_username",
password: "your_password",
database: "your_database",
host: "127.0.0.1",
dialect: "mysql",
},
}; 4. 데이터베이스 초기화
MySQL 데이터베이스를 생성한 후, Sequelize CLI로 테이블을 마이그레이션합니다:

bash
코드 복사
npx sequelize-cli db:migrate 5. 서버 실행
bash
코드 복사
npm start 6. Swagger API 문서 확인
서버 실행 후, 아래 경로에서 Swagger UI에 접속하여 API 문서를 확인할 수 있습니다:

bash
코드 복사
http://localhost:3000/api-docs

API 명세
지원 관리

POST /applications: 지원하기
GET /applications: 지원 내역 조회
DELETE /applications/:id: 지원 취소
공고 관리

GET /jobs/total-count: 총 공고 데이터 갯수 조회
기타 기능

GET /etc: 총 데이터 갯수 조회

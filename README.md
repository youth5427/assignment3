# WSD-Assignment-03

## 프로젝트 개요

WSD-Assignment-03은 Node.js를 기반으로 한 웹 애플리케이션 프로젝트입니다. 주요 목적은 **웹 크롤링** 기능을 제공하고, **API 문서화**를 통해 사용자와 개발자 모두 쉽게 활용할 수 있도록 설계되었습니다.

## 주요 기능

- **웹 크롤링**: `crawling.py` 스크립트를 통해 특정 데이터를 수집.
- **RESTful API**: 라우터(`routes/`)를 통해 다양한 기능 제공.
- **API 문서화**: Swagger를 활용한 API 문서화 (`swagger-docs/`).
- **미들웨어 지원**: 사용자 인증 및 요청 처리와 관련된 미들웨어 (`middlewares/`).

## 설치 및 실행 방법

### 사전 준비

1. Node.js 설치: [Node.js 공식 사이트](https://nodejs.org)에서 다운로드 및 설치.
2. 필요한 라이브러리 설치를 위해 `npm` 또는 `yarn` 사용.

### 설치

```bash
# 프로젝트 클론
git clone <repository-url>
cd WSD-Assignment-03

# 의존성 설치
npm install
```

### 실행

```bash
# 개발 환경 실행
npm start

# 또는 다음 명령어로 실행 가능
node app.js
```

## 파일 구조

```
WSD-Assignment-03/
├── .env                # 환경 변수 파일
├── app.js              # 애플리케이션 메인 파일
├── bin/                # 실행 스크립트
├── config/             # 설정 파일
├── crawling.py         # 웹 크롤링 스크립트
├── middlewares/        # 미들웨어 파일
├── models/             # 데이터 모델 정의
├── public/             # 정적 파일
├── routes/             # 라우터 파일
├── swagger-docs/       # Swagger 문서
├── swagger.js          # Swagger 설정 파일
├── views/              # 템플릿 파일
├── package.json        # 프로젝트 메타정보 및 의존성
└── package-lock.json   # 의존성 버전 잠금
```

## 주요 스크립트 및 파일

- **`app.js`**: 서버의 메인 엔트리 포인트.
- **`crawling.py`**: 웹 크롤링 기능 구현.
- **`swagger-docs/`**: Swagger를 활용한 API 문서화.

## 사용된 기술

- **Node.js**: 서버 런타임 환경.
- **Express**: 경량 웹 프레임워크.
- **Python**: 크롤링 스크립트.
- **Swagger**: API 문서화.

## API 문서

프로젝트 실행 후, [http://localhost:3000/api-docs](http://localhost:3000/api-docs)에서 Swagger 문서를 확인할 수 있습니다.

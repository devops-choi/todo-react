# 📚 React Remote - Todo Application System

> **Complete Full-Stack Todo Application with React Frontend and JSON Server Backend**  
> **+ 20챕터 완전 교육 과정 포함 🎓**

이 프로젝트는 Create React App과 JSON Server를 활용한 완전한 Todo 애플리케이션 시스템입니다. 자동화된 CI/CD 파이프라인과 함께 GitHub Pages와 Vercel을 통한 배포 시스템을 제공합니다.

**🚀 특별 제공: [20챕터 완전 학습 가이드](./docs/chapters/README.md)**  
웹 개발 초보자도 HTML, CSS, JavaScript, React를 완전히 마스터할 수 있는 체계적인 교육 과정을 제공합니다.

---

## 🎯 시스템 개요

### 프로젝트 구성요소

```mermaid
flowchart TB
    subgraph Frontend["🖥️ Frontend Layer"]
        React[React Application]
        Components[React Components]
        Services[Service Layer]
    end
    
    subgraph Backend["🔧 Backend Layer"]
        JSONServer[JSON Server]
        Database[Database JSON]
        API[REST API]
    end
    
    subgraph Deploy["🚀 Deployment"]
        GHPages[GitHub Pages]
        Vercel[Vercel Platform]
        Actions[GitHub Actions]
    end
    
    subgraph Testing["🧪 Testing"]
        Unit[Unit Tests]
        Integration[Integration Tests]
        Performance[Performance Tests]
    end

    React --> Services
    Services --> API
    API --> JSONServer
    JSONServer --> Database
    
    Actions --> GHPages
    Actions --> Vercel
    
    Frontend --> Testing
    Backend --> Testing
    Frontend --> Testing
    Backend --> Testing
```

---

## 🏗️ 시스템 아키텍처

### 전체 아키텍처 다이어그램

```mermaid
architecture-beta
    group frontend(cloud)[Frontend Layer]
    group backend(cloud)[Backend Layer]
    group deployment(cloud)[Deployment Layer]
    
    service react(server)[React App] in frontend
    service components(disk)[Components] in frontend
    service services(database)[Services] in frontend
    
    service jsonserver(server)[JSON Server] in backend
    service database(database)[Database] in backend
    service api(internet)[REST API] in backend
    
    service ghpages(cloud)[GitHub Pages] in deployment
    service vercel(cloud)[Vercel] in deployment
    service actions(server)[GitHub Actions] in deployment

    react:R --> L:services
    services:R --> L:api
    api:R --> L:jsonserver
    jsonserver:B --> T:database
    
    actions:L --> R:ghpages
    actions:R --> L:vercel
```

### 📂 디렉토리 구조

```
react-remote/
├── 📁 public/                 # 정적 파일
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── 📁 src/                    # 소스 코드
│   ├── 📁 components/         # React 컴포넌트
│   │   ├── TodoContainer.js   # 메인 컨테이너
│   │   ├── TodoList.js        # 목록 컴포넌트
│   │   ├── TodoItem.js        # 개별 아이템
│   │   └── TodoInput.js       # 입력 컴포넌트
│   ├── 📁 services/           # 서비스 레이어
│   │   └── todoService/       # Todo API 서비스
│   │       ├── index.js
│   │       ├── createTodoItem.js
│   │       ├── updateTodoItem.js
│   │       ├── deleteTodoItem.js
│   │       ├── selectTodoList.js
│   │       └── selectTodoItem.js
│   ├── App.js                 # 메인 앱 컴포넌트
│   └── index.js               # 엔트리 포인트
├── 📁 .github/workflows/      # CI/CD 파이프라인
│   ├── deploy-gh-pages.yml    # Frontend 배포
│   └── deploy-json-server.yml # Backend 배포
├── 📁 build/                  # 빌드 결과물
├── 📁 coverage/               # 테스트 커버리지
├── 📁 docs/                   # 문서
├── server.js                  # JSON Server 설정
├── database.json              # 데이터베이스
├── vercel.json                # Vercel 배포 설정
├── jest.config.json           # 테스트 설정
└── package.json               # 프로젝트 설정
```

---

## 🔄 데이터 플로우

### API 통신 시퀀스

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant React as ⚛️ React App
    participant Service as 🔧 Service Layer
    participant API as 🌐 JSON Server API
    participant DB as 💾 Database

    User->>React: 할일 추가 요청
    React->>Service: createTodoItem(data)
    Service->>API: POST /api/todos
    API->>DB: Insert data
    DB-->>API: Success response
    API-->>Service: 201 Created
    Service-->>React: Success result
    React-->>User: UI 업데이트

    User->>React: 할일 목록 조회
    React->>Service: selectTodoList()
    Service->>API: GET /api/todos
    API->>DB: Select all
    DB-->>API: Todo list
    API-->>Service: 200 OK
    Service-->>React: Todo data
    React-->>User: 렌더링 완료

    User->>React: 할일 완료 토글
    React->>Service: updateTodoItem(id, data)
    Service->>API: PUT /api/todos/:id
    API->>DB: Update record
    DB-->>API: Success
    API-->>Service: 200 OK
    Service-->>React: Updated data
    React-->>User: 상태 변경 반영

    User->>React: 할일 삭제
    React->>Service: deleteTodoItem(id)
    Service->>API: DELETE /api/todos/:id
    API->>DB: Delete record
    DB-->>API: Success
    API-->>Service: 204 No Content
    Service-->>React: Deletion confirmed
    React-->>User: 항목 제거
```

---

## 🛠️ 기술 스택

### Frontend Technologies

| 기술 | 버전 | 용도 |
|------|------|------|
| **React** | ^19.1.0 | UI 라이브러리 |
| **React DOM** | ^19.1.0 | DOM 렌더링 |
| **React Scripts** | 5.0.1 | 빌드 도구 |
| **PropTypes** | ^15.8.1 | 타입 검증 |
| **Web Vitals** | ^2.1.4 | 성능 측정 |

### Backend Technologies

| 기술 | 버전 | 용도 |
|------|------|------|
| **JSON Server** | ^1.0.0-beta.3 | REST API 서버 |
| **Node.js** | >=18.0.0 | 런타임 환경 |

### Development & Testing

| 기술 | 버전 | 용도 |
|------|------|------|
| **Jest** | - | 테스트 프레임워크 |
| **Testing Library** | ^16.3.0 | React 테스트 유틸리티 |
| **Jest DOM** | ^6.6.3 | DOM 테스트 매처 |
| **User Event** | ^14.0.0 | 사용자 이벤트 시뮬레이션 |

### Deployment & CI/CD

| 플랫폼 | 용도 | 설정 파일 |
|--------|------|-----------|
| **GitHub Pages** | Frontend 호스팅 | `.github/workflows/deploy-gh-pages.yml` |
| **Vercel** | Backend 호스팅 | `vercel.json` |
| **GitHub Actions** | CI/CD 파이프라인 | `.github/workflows/` |

---

## 🚀 배포 시스템

### CI/CD 파이프라인

```mermaid
flowchart TD
    subgraph Trigger["🎯 Trigger Events"]
        Push[Git Push to main/master]
        Manual[Manual Workflow Dispatch]
    end
    
    subgraph Frontend["🖥️ Frontend Pipeline"]
        FCheckout[📥 Checkout Code]
        FNode[⚙️ Setup Node.js 18]
        FInstall[📦 Install Dependencies]
        FTest[🧪 Run Tests]
        FBuild[🔨 Build React App]
        FDeploy[🚀 Deploy to GitHub Pages]
    end
    
    subgraph Backend["🔧 Backend Pipeline"]
        BCheckout[📥 Checkout Code]
        BNode[⚙️ Setup Node.js 18]
        BPrepare[📁 Prepare Server Files]
        BInstall[📦 Install Dependencies]
        BTest[🧪 Test Server Startup]
        BDeploy[🚀 Deploy to Vercel]
    end

    Push --> Frontend
    Push --> Backend
    Manual --> Frontend
    Manual --> Backend
    
    FCheckout --> FNode
    FNode --> FInstall
    FInstall --> FTest
    FTest --> FBuild
    FBuild --> FDeploy
    
    BCheckout --> BNode
    BNode --> BPrepare
    BPrepare --> BInstall
    BInstall --> BTest
    BTest --> BDeploy
```

### 배포 환경 설정

#### 1. GitHub Pages (Frontend)

**설정 단계:**
1. GitHub 저장소 → Settings → Pages
2. Source: "GitHub Actions" 선택
3. `package.json`에서 homepage URL 수정:
   ```json
   {
     "homepage": "https://[YOUR_USERNAME].github.io/react-remote"
   }
   ```

**워크플로우 트리거:**
- `main` 또는 `master` 브랜치 push
- 수동 워크플로우 실행

#### 2. Vercel (Backend)

**설정 단계:**
1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결
3. 자동 배포 설정 (vercel.json 포함)

**API 엔드포인트:**
- Base URL: `https://your-app.vercel.app`
- Todos API: `/api/todos`

---

## 🧪 테스트 시스템

### 3단계 테스트 전략

```mermaid
flowchart LR
    subgraph Stage1["🔬 Stage 1: Unit Tests"]
        Components[컴포넌트 테스트]
        Services[서비스 테스트]
        Utils[유틸리티 테스트]
    end
    
    subgraph Stage2["🔄 Stage 2: Integration Tests"]
        API[API 통합 테스트]
        A11y[접근성 테스트]
        Flow[사용자 플로우 테스트]
    end
    
    subgraph Stage3["⚡ Stage 3: Performance Tests"]
        Render[렌더링 성능]
        Memory[메모리 사용량]
        Bundle[번들 크기]
    end

    Stage1 --> Stage2
    Stage2 --> Stage3
```

### 테스트 스크립트

| 명령어 | 설명 | 실행 범위 |
|--------|------|-----------|
| `npm test` | 기본 테스트 실행 | 모든 테스트 |
| `npm run test:sync` | 순차적 테스트 실행 | 전체 테스트 스위트 |
| `npm run test:unit` | 단위 테스트 | Stage 1 |
| `npm run test:integration` | 통합 테스트 | Stage 2 |
| `npm run test:performance` | 성능 테스트 | Stage 3 |
| `npm run test:coverage` | 커버리지 테스트 | 코드 커버리지 포함 |

### 테스트 설정 (jest.config.json)

```json
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
  "testTimeout": 30000,
  "maxWorkers": 1,
  "runInBand": true,
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  }
}
```

---

## 💻 개발 환경 설정

### 필수 요구사항

| 도구 | 최소 버전 | 권장 버전 |
|------|-----------|-----------|
| **Node.js** | 16.0.0 | 18.0.0+ |
| **npm** | 7.0.0 | 8.0.0+ |
| **Git** | 2.20.0 | Latest |

### 로컬 개발 실행

#### 1. 프로젝트 클론 및 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/react-remote.git
cd react-remote

# 의존성 설치
npm install
```

#### 2. 개발 서버 실행

```bash
# Frontend 개발 서버 (포트 3000)
npm start

# Backend JSON Server (포트 5000)
npm run database
```

#### 3. 접근 URL

| 서비스 | URL | 설명 |
|--------|-----|------|
| **Frontend** | http://localhost:3000 | React 개발 서버 |
| **Backend API** | http://localhost:5000 | JSON Server API |
| **API Docs** | http://localhost:5000/todos | Todos 엔드포인트 |

---

## 📋 주요 기능

### Todo 관리 기능

```mermaid
flowchart TD
    subgraph TodoApp["📝 Todo Application"]
        Create[➕ 할일 생성]
        Read[📖 할일 조회]
        Update[✏️ 할일 수정]
        Delete[🗑️ 할일 삭제]
        Filter[🔍 필터링]
        Stats[📊 통계]
    end
    
    subgraph Features["🌟 주요 기능"]
        RealTime[실시간 업데이트]
        Responsive[반응형 디자인]
        Validation[입력 검증]
        Error[에러 처리]
    end

    Create --> RealTime
    Update --> RealTime
    Delete --> RealTime
    Filter --> Responsive
    Stats --> Responsive
```

### 기능 상세

#### ✅ CRUD 연산

| 기능 | HTTP 메서드 | 엔드포인트 | 설명 |
|------|-------------|-----------|------|
| **생성** | POST | `/api/todos` | 새 할일 추가 |
| **조회** | GET | `/api/todos` | 전체 할일 목록 |
| **수정** | PUT | `/api/todos/:id` | 할일 상태 변경 |
| **삭제** | DELETE | `/api/todos/:id` | 할일 삭제 |

#### 🎛️ 필터링 시스템

| 필터 | 설명 | 표시 항목 |
|------|------|-----------|
| **전체** | 모든 할일 표시 | 완료/미완료 모두 |
| **활성** | 미완료 할일만 표시 | completed: false |
| **완료** | 완료된 할일만 표시 | completed: true |

#### 📊 통계 정보

- **전체 개수**: 총 할일 항목 수
- **완료 개수**: 완료된 항목 수  
- **미완료 개수**: 남은 항목 수
- **완료율**: 완료 비율 (%)

---

## ⚙️ 프로젝트 스크립트

### 개발 스크립트

| 스크립트 | 명령어 | 설명 |
|----------|--------|------|
| **start** | `npm start` | 개발 서버 시작 |
| **build** | `npm run build` | 프로덕션 빌드 |
| **test** | `npm test` | 테스트 실행 |
| **eject** | `npm run eject` | CRA 설정 추출 (비가역) |
| **database** | `npm run database` | JSON Server 시작 |

### 배포 스크립트

| 스크립트 | 명령어 | 설명 |
|----------|--------|------|
| **predeploy** | `npm run predeploy` | 배포 전 빌드 |
| **deploy** | `npm run deploy` | GitHub Pages 배포 |

### 테스트 스크립트

| 스크립트 | 명령어 | 설명 |
|----------|--------|------|
| **test:sync** | `npm run test:sync` | 순차적 테스트 실행 |
| **test:unit** | `npm run test:unit` | 단위 테스트만 실행 |
| **test:integration** | `npm run test:integration` | 통합 테스트만 실행 |
| **test:performance** | `npm run test:performance` | 성능 테스트만 실행 |
| **test:coverage** | `npm run test:coverage` | 커버리지 포함 테스트 |

---

## 🔧 설정 파일

### 주요 설정 파일 목록

| 파일명 | 용도 | 설명 |
|--------|------|------|
| `package.json` | 프로젝트 설정 | 의존성, 스크립트, 메타데이터 |
| `jest.config.json` | 테스트 설정 | Jest 테스트 프레임워크 설정 |
| `vercel.json` | Vercel 배포 | 백엔드 배포 설정 |
| `server.js` | JSON Server | API 서버 설정 |
| `database.json` | 데이터베이스 | 초기 데이터 및 스키마 |

### API 서버 설정 (server.js)

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();

// CORS 설정
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

server.use(middlewares);
server.use('/api', router);
```

### 데이터베이스 스키마 (database.json)

```json
{
  "todos": [
    {
      "id": "unique-id",
      "title": "할일 제목",
      "completed": false
    }
  ]
}
```

---

## 🔒 보안 및 모범 사례

### 보안 설정

- **CORS 정책**: 모든 도메인 허용 (개발용)
- **입력 검증**: PropTypes를 통한 타입 검증
- **에러 처리**: try-catch 블록으로 안전한 API 호출

### 성능 최적화

- **코드 분할**: React.lazy() 사용 권장
- **메모이제이션**: React.memo() 적용
- **번들 최적화**: Webpack 자동 최적화

### 접근성 (A11y)

- **시맨틱 HTML**: 의미있는 HTML 요소 사용
- **키보드 네비게이션**: Tab 키 순서 고려
- **스크린 리더**: aria-label 속성 적용

---

## 📞 문제 해결

### 자주 발생하는 문제

#### 1. 포트 충돌 문제

**증상**: `Error: listen EADDRINUSE: address already in use`

**해결방법**:
```bash
# 포트 사용 프로세스 확인
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# 프로세스 종료
taskkill /PID [PID번호] /F
```

#### 2. 의존성 충돌

**증상**: `npm install` 실행 시 에러

**해결방법**:
```bash
# 캐시 정리
npm cache clean --force

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 3. 빌드 실패

**증상**: `npm run build` 실패

**해결방법**:
```bash
# 환경 변수 확인
set CI=false
npm run build
```

### 개발 팁

#### Hot Reload 활성화
```bash
# .env 파일에 추가
FAST_REFRESH=true
```

#### 디버깅 모드
```bash
# React DevTools 사용
npm install -g react-devtools
```

---

## 📚 교육 자료 - 20챕터 완전 학습 가이드

> **HTML, CSS, JavaScript, React 초보자를 위한 완전한 학습 과정**

이 프로젝트는 단순한 Todo 앱이 아닙니다. **체계적인 20챕터 교육 과정**을 통해 웹 개발 초보자도 완전히 이해할 수 있도록 설계되었습니다.

### 🎯 **교육 과정 특징**

- **단계별 학습**: HTML → CSS → JavaScript → React 순차 진행
- **실전 중심**: 이론과 실습을 결합한 프로젝트 기반 학습
- **한국어 지원**: 모든 내용이 한국어로 작성된 친화적 교육 자료
- **완전 무료**: 오픈소스 기반의 무료 교육 컨텐츠

### 📖 **학습 과정 구성**

```mermaid
flowchart LR
    subgraph Part1["🌟 Part 1: 기초"]
        A[HTML 기초] --> B[CSS 스타일링]
        B --> C[JavaScript ES6+]
        C --> D[React 입문]
    end
    
    subgraph Part2["🏗️ Part 2: 구조"]
        E[프로젝트 설정] --> F[진입점 분석]
        F --> G[앱 구조] --> H[컴포넌트 설계]
    end
    
    subgraph Part3["🧩 Part 3: 구현"]
        I[컨테이너] --> J[입력 컴포넌트]
        J --> K[목록 컴포넌트] --> L[아이템 컴포넌트]
    end
    
    subgraph Part4["🔧 Part 4: API"]
        M[서비스 레이어] --> N[CRUD 생성/읽기]
        N --> O[CRUD 수정/삭제] --> P[백엔드 서버]
    end
    
    subgraph Part5["🧪 Part 5: 고급"]
        Q[테스팅] --> R[GitHub 배포]
        R --> S[Vercel 배포] --> T[성능 최적화]
    end

    Part1 --> Part2
    Part2 --> Part3
    Part3 --> Part4
    Part4 --> Part5
```

### 📋 **20챕터 목차**

| 파트 | 챕터 | 주제 | 난이도 |
|------|------|------|--------|
| **Part 1** | 1-4 | 웹 개발 기초 (HTML, CSS, JS, React) | ⭐ 기초 |
| **Part 2** | 5-8 | 프로젝트 설정과 구조 분석 | ⭐⭐ 초급 |
| **Part 3** | 9-12 | 핵심 컴포넌트 구현 | ⭐⭐⭐ 중급 |
| **Part 4** | 13-16 | 서비스 레이어와 API 통신 | ⭐⭐⭐⭐ 고급 |
| **Part 5** | 17-20 | 테스팅, 배포, 최적화 | ⭐⭐⭐⭐⭐ 전문가 |

### 🚀 **학습 시작하기**

#### 📖 **완전한 학습 가이드**
**➡️ [20챕터 완전 학습 가이드](./docs/chapters/README.md)**

#### 📝 **종합 평가 시험**
**➡️ [5개 시험 문제 모음](./docs/exams/README.md)** 
- 학습 완료 후 성취도 평가
- 난이도별 단계적 시험 제공
- 실무 중심 문제 구성

#### 🎯 **빠른 시작 (경험 수준별)**

```bash
# 1. 완전 초보자 (추천 학습 기간: 8-12주)
# 챕터 1부터 순서대로 학습
docs/chapters/chapter-01-html-basics.md

# 2. JavaScript 경험자 (추천 학습 기간: 4-6주)  
# React부터 시작
docs/chapters/chapter-04-react-intro.md

# 3. React 경험자 (추천 학습 기간: 2-3주)
# 프로젝트 구조부터 시작
docs/chapters/chapter-05-package-json.md

# 4. 배포만 관심 있는 경우 (1주)
# 배포 관련 챕터만 학습
docs/chapters/chapter-18-build-deployment.md
```

### 💡 **학습 성과**

이 과정을 완료하면 다음을 할 수 있게 됩니다:

- ✅ **프론트엔드 개발**: HTML, CSS, JavaScript, React 완전 이해
- ✅ **풀스택 개발**: API 서버 구축과 프론트엔드 연동
- ✅ **DevOps**: GitHub Actions를 통한 자동 배포 시스템
- ✅ **최적화**: 성능 튜닝과 사용자 경험 개선
- ✅ **실무 준비**: 취업에 필요한 포트폴리오 프로젝트

---

## ☁️ 클라우드 운영 전문가 취업 가이드

이 프로젝트를 바탕으로 클라우드 운영 전문가로 성장하기 위한 실무 중심 가이드를 제공합니다.

### 🎯 **[📋 클라우드 전문가 가이드 모음](docs/CLOUD_EXPERT_GUIDE.md)**

**제공되는 전문 가이드**:
- **🌐 [기술 스택 분석](docs/CLOUD_TECH_STACK.md)**: 현재 프로젝트 → 클라우드 전문가 기술 로드맵
- **🚀 [진화 인사이트](docs/CLOUD_INSIGHTS.md)**: 소규모 프로젝트 → 엔터프라이즈급 아키텍처
- **🌟 [클라우드 전문가 가이드](docs/CLOUD_EXPERT_GUIDE.md)**: 최고 수준 전문가 역할과 커리어 패스

**핵심 가치**:
- 현재 Todo 프로젝트를 클라우드 운영 관점에서 분석
- 단계별 기술 확장 로드맵 제시
- 실무 프로젝트 예시와 취업 전략
- 글로벌 시장 분석과 연봉 정보

**대상 독자**:
- 클라우드 운영 전문가 지망생
- DevOps 엔지니어 지향 개발자
- 시스템 관리자에서 클라우드 전문가로 전환 희망자
- 기술 리더십을 목표로 하는 시니어 엔지니어

---

## 📖 추가 학습 자료

### 공식 문서

| 기술 | 문서 링크 | 설명 |
|------|-----------|------|
| **React** | [React 공식 문서](https://react.dev/) | React 공식 가이드 |
| **Create React App** | [CRA 문서](https://create-react-app.dev/) | CRA 설정 및 사용법 |
| **JSON Server** | [JSON Server GitHub](https://github.com/typicode/json-server) | JSON Server 사용법 |
| **Jest** | [Jest 공식 문서](https://jestjs.io/) | 테스트 프레임워크 |
| **GitHub Actions** | [Actions 문서](https://docs.github.com/en/actions) | CI/CD 파이프라인 |

### 권장 학습 경로

```mermaid
flowchart TD
    A[📚 20챕터 교육과정] --> B[JavaScript 기초]
    B --> C[React 기초]
    C --> D[React Hooks]
    D --> E[State Management]
    E --> F[API 통신]
    F --> G[테스팅]
    G --> H[배포 자동화]
    H --> I[성능 최적화]
    I --> J[🎉 취업 준비 완료]
```

---

## 🤝 기여 가이드

### 개발 플로우

1. **Fork** 저장소
2. **Feature 브랜치** 생성
3. **커밋** 메시지 규칙 준수
4. **Pull Request** 생성
5. **코드 리뷰** 및 머지

### 커밋 메시지 규칙

```
type(scope): subject

body

footer
```

**예시**:
```
feat(todo): 할일 필터링 기능 추가

- 전체, 활성, 완료 필터 구현
- 상태별 할일 목록 표시
- 필터 상태 유지

Closes #123
```

---

## 📝 시험 문제 모음

교육 과정을 완료한 후 학습 성취도를 확인할 수 있는 종합 평가 시험을 제공합니다.

### 🎯 **[📋 시험 문제 모음 보기](docs/exams/README.md)**

**제공되는 시험 목록**:
- **시험 1**: 웹 개발 기초 (HTML, CSS, JavaScript, React 기초)
- **시험 2**: 프로젝트 구조와 설정 (package.json, 진입점)
- **시험 3**: React 컴포넌트와 상태 관리 (Hook, 이벤트 처리)
- **시험 4**: 서비스 레이어와 CRUD 연산 (API, 백엔드)
- **시험 5**: 테스팅, 배포, 성능 최적화 (Jest, CI/CD)

**시험 특징**:
- 다양한 문제 유형: 객관식, 주관식, 빈칸 채우기, 서술형, 코딩 문제
- 실무 중심의 문제 구성
- 난이도별 단계적 학습 평가
- 상세한 정답 및 해설 제공

---

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

---

## 📞 지원 및 연락처

- **이슈 보고**: [GitHub Issues](https://github.com/your-username/react-remote/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/your-username/react-remote/discussions)
- **이메일**: your-email@example.com

---

**🎉 Happy Coding! 즐거운 개발 되세요!**

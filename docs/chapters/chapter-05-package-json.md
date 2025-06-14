# Chapter 5: package.json - 프로젝트 설정과 의존성 관리

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 4: React 소개와 개발 환경 설정](./chapter-04-react-intro.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 6: public/index.html - React 앱의 진입점](./chapter-06-index-html.md)

---

## 📚 학습 목표
- package.json 파일의 구조와 역할 이해
- npm scripts와 의존성 관리 방법 학습
- 프로젝트 메타데이터와 설정 파악
- 실제 Todo 프로젝트의 package.json 분석
- 버전 관리와 보안 이슈 이해

## 🔗 필요한 사전 지식
- Chapter 4: React 기초
- Node.js와 npm의 기본 개념
- JavaScript 모듈 시스템

---

## 1. package.json이란 무엇인가?

**package.json**은 Node.js 프로젝트의 핵심 설정 파일로, 프로젝트의 메타데이터와 의존성을 관리합니다.

### 1.1 package.json의 역할
- **프로젝트 정보**: 이름, 버전, 설명, 작성자 등
- **의존성 관리**: 필요한 패키지들과 버전 정보
- **스크립트 정의**: 빌드, 테스트, 실행 명령어
- **프로젝트 설정**: 다양한 도구들의 설정 정보

### 1.2 package.json 생성
```bash
# 새로운 프로젝트 초기화
npm init

# 기본값으로 빠르게 생성
npm init -y

# Create React App으로 생성 (자동으로 포함)
npx create-react-app my-app
```

---

## 2. 우리 Todo 프로젝트의 package.json 분석

```json
{
  "name": "react-remote",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "json-server": "^1.0.0-beta.3",
    "prop-types": "^15.8.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@testing-library/user-event": "^14.0.0",
    "gh-pages": "^6.3.0"
  },
  "homepage": "https://devops-chio.github.io/todo-react",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "database": "json-server --watch database.json --port 5000",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## 3. 기본 메타데이터

### 3.1 프로젝트 식별 정보
```json
{
  "name": "react-remote",          // 프로젝트 이름 (소문자, 하이픈 사용)
  "version": "0.1.0",              // 시맨틱 버저닝 (major.minor.patch)
  "private": true,                 // npm 저장소 공개 방지
  "description": "React Todo App", // 프로젝트 설명
  "author": "Your Name",           // 작성자 정보
  "license": "MIT",                // 라이센스
  "keywords": ["react", "todo", "javascript"], // 검색 키워드
  "homepage": "https://devops-chio.github.io/todo-react" // 홈페이지 URL
}
```

### 3.2 시맨틱 버저닝 (Semantic Versioning)
```json
// MAJOR.MINOR.PATCH 형식
{
  "version": "1.2.3"
}
```

**버전 규칙:**
- **MAJOR**: 호환되지 않는 API 변경 (1.0.0 → 2.0.0)
- **MINOR**: 하위 호환되는 기능 추가 (1.0.0 → 1.1.0)
- **PATCH**: 하위 호환되는 버그 수정 (1.0.0 → 1.0.1)

---

## 4. 의존성 관리 (Dependencies)

### 4.1 dependencies vs devDependencies
```json
{
  "dependencies": {
    // 프로덕션에서 필요한 패키지
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "prop-types": "^15.8.1"
  },
  "devDependencies": {
    // 개발 시에만 필요한 패키지
    "@testing-library/user-event": "^14.0.0",
    "gh-pages": "^6.3.0"
  }
}
```

### 4.2 버전 범위 지정자
```json
{
  "dependencies": {
    "react": "19.1.0",      // 정확한 버전
    "react": "^19.1.0",     // 호환 버전 (19.x.x, 20.0.0 미만)
    "react": "~19.1.0",     // 패치 버전 (19.1.x)
    "react": ">=19.0.0",    // 최소 버전
    "react": "*",           // 최신 버전 (권장하지 않음)
    "react": "latest"       // 최신 안정 버전
  }
}
```

### 4.3 주요 의존성 패키지 분석

#### React 관련 패키지
```json
{
  "react": "^19.1.0",           // React 라이브러리
  "react-dom": "^19.1.0",       // React DOM 렌더링
  "react-scripts": "5.0.1"      // Create React App 빌드 도구
}
```

#### 테스팅 라이브러리
```json
{
  "@testing-library/react": "^16.3.0",    // React 컴포넌트 테스트
  "@testing-library/jest-dom": "^6.6.3",  // Jest DOM 매처
  "@testing-library/user-event": "^14.0.0" // 사용자 이벤트 시뮬레이션
}
```

#### 개발 도구
```json
{
  "json-server": "^1.0.0-beta.3",  // Mock REST API 서버
  "gh-pages": "^6.3.0",            // GitHub Pages 배포
  "prop-types": "^15.8.1"          // React Props 타입 검증
}
```

---

## 5. NPM Scripts

### 5.1 기본 스크립트
```json
{
  "scripts": {
    "start": "react-scripts start",    // 개발 서버 실행
    "build": "react-scripts build",    // 프로덕션 빌드
    "test": "react-scripts test",      // 테스트 실행
    "eject": "react-scripts eject"     // CRA 설정 추출 (비가역)
  }
}
```

### 5.2 커스텀 스크립트
```json
{
  "scripts": {
    // 백엔드 서버 실행
    "database": "json-server --watch database.json --port 5000",
    
    // 배포 관련
    "predeploy": "npm run build",      // deploy 실행 전 자동 실행
    "deploy": "gh-pages -d build",     // GitHub Pages 배포
    
    // 개발 편의 스크립트
    "dev": "npm start",                // 축약 명령어
    "server": "npm run database",      // 서버 실행 별칭
    "full": "npm run database & npm start", // 병렬 실행 (Windows에서는 &대신 &&)
    
    // 테스트 관련
    "test:coverage": "npm test -- --coverage --no-watch",
    "test:watch": "npm test",
    
    // 린팅과 포맷팅
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/"
  }
}
```

### 5.3 스크립트 실행 방법
```bash
# 기본 명령어
npm start          # npm run start와 동일
npm test           # npm run test와 동일
npm run build      # build 스크립트 실행

# 커스텀 스크립트
npm run database   # JSON Server 실행
npm run deploy     # GitHub Pages 배포

# 병렬 실행 (cross-platform)
npm install -g concurrently
# package.json에서
"dev:all": "concurrently \"npm start\" \"npm run database\""
```

### 5.4 Pre/Post Hooks
```json
{
  "scripts": {
    "prebuild": "echo 빌드 시작",      // build 전에 실행
    "build": "react-scripts build",    // 메인 스크립트
    "postbuild": "echo 빌드 완료",     // build 후에 실행
    
    "predeploy": "npm run build",      // 자동으로 빌드 후 배포
    "deploy": "gh-pages -d build"
  }
}
```

---

## 6. 프로젝트 설정

### 6.1 ESLint 설정
```json
{
  "eslintConfig": {
    "extends": [
      "react-app",          // Create React App 기본 규칙
      "react-app/jest"      // Jest 테스트 환경 규칙
    ],
    "rules": {
      "no-console": "warn",                    // console.log 경고
      "react/prop-types": "error",             // PropTypes 필수
      "react-hooks/exhaustive-deps": "warn"    // useEffect 의존성 검사
    }
  }
}
```

### 6.2 Browserslist 설정
```json
{
  "browserslist": {
    "production": [
      ">0.2%",           // 시장 점유율 0.2% 이상
      "not dead",        // 업데이트가 중단되지 않은 브라우저
      "not op_mini all"  // Opera Mini 제외
    ],
    "development": [
      "last 1 chrome version",   // Chrome 최신 1버전
      "last 1 firefox version",  // Firefox 최신 1버전
      "last 1 safari version"    // Safari 최신 1버전
    ]
  }
}
```

### 6.3 Create React App 설정
```json
{
  // 환경 변수 파일들
  ".env": "REACT_APP_API_URL=http://localhost:5000",
  ".env.local": "REACT_APP_SECRET_KEY=your-secret",
  ".env.production": "REACT_APP_API_URL=https://api.production.com"
}
```

---

## 7. 의존성 설치와 관리

### 7.1 패키지 설치
```bash
# 프로덕션 의존성 설치
npm install axios                    # 기본 dependencies
npm install --save axios             # 명시적으로 dependencies에 추가

# 개발 의존성 설치
npm install --save-dev eslint        # devDependencies에 추가
npm install -D prettier              # 축약형

# 전역 설치
npm install -g create-react-app      # 전역 설치

# 특정 버전 설치
npm install react@18.2.0             # 특정 버전
npm install react@latest             # 최신 버전
```

### 7.2 패키지 업데이트
```bash
# 업데이트 가능한 패키지 확인
npm outdated

# 패키지 업데이트
npm update                    # 모든 패키지 업데이트
npm update react             # 특정 패키지 업데이트

# 최신 버전으로 강제 업데이트
npm install react@latest     # 최신 버전 설치
```

### 7.3 패키지 제거
```bash
# 패키지 제거
npm uninstall axios
npm uninstall --save-dev eslint     # devDependencies에서 제거
npm remove axios                    # uninstall 별칭
```

---

## 8. package-lock.json의 역할

### 8.1 package-lock.json vs package.json
```json
// package.json - 의존성 범위 정의
{
  "dependencies": {
    "react": "^19.1.0"    // 19.1.0 이상 20.0.0 미만
  }
}

// package-lock.json - 정확한 버전 고정
{
  "dependencies": {
    "react": {
      "version": "19.1.0",           // 정확한 설치된 버전
      "resolved": "https://...",     // 다운로드 URL
      "integrity": "sha512-..."      // 무결성 해시
    }
  }
}
```

### 8.2 lock 파일의 중요성
- **버전 일관성**: 모든 환경에서 동일한 버전 보장
- **보안**: 패키지 무결성 검증
- **성능**: 의존성 해결 시간 단축
- **재현성**: 빌드 결과의 일관성

```bash
# lock 파일 기반 설치 (권장)
npm ci                  # package-lock.json 기반 정확한 설치

# 일반 설치
npm install             # package.json 기반 설치, lock 파일 업데이트
```

---

## 9. 환경별 설정 관리

### 9.1 환경 변수 설정
```bash
# .env 파일 생성
REACT_APP_API_URL=http://localhost:5000
REACT_APP_VERSION=$npm_package_version
REACT_APP_DEBUG=true

# .env.local (Git에 포함하지 않음)
REACT_APP_SECRET_KEY=your-secret-key

# .env.production
REACT_APP_API_URL=https://api.yoursite.com
REACT_APP_DEBUG=false
```

### 9.2 환경 변수 사용
```javascript
// React 컴포넌트에서 사용
function App() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const version = process.env.REACT_APP_VERSION;
    const isDebug = process.env.REACT_APP_DEBUG === 'true';
    
    return (
        <div>
            <h1>API URL: {apiUrl}</h1>
            <p>Version: {version}</p>
            {isDebug && <div>Debug Mode</div>}
        </div>
    );
}
```

---

## 10. 보안과 모범 사례

### 10.1 보안 취약점 검사
```bash
# 취약점 검사
npm audit

# 자동 수정 (안전한 업데이트)
npm audit fix

# 강제 수정 (주의 필요)
npm audit fix --force

# 취약점 무시 (임시)
npm audit fix --audit-level moderate
```

### 10.2 의존성 관리 모범 사례
```json
{
  "dependencies": {
    // 정확한 버전 명시 (중요한 패키지)
    "react": "19.1.0",
    
    // 호환 범위 사용 (일반적)
    "axios": "^1.6.0",
    
    // 너무 넓은 범위 피하기
    "lodash": "^4.17.21"  // Good
    // "lodash": "*"       // Bad
  }
}
```

### 10.3 불필요한 패키지 정리
```bash
# 사용하지 않는 패키지 찾기
npm ls --depth=0

# 패키지 의존성 트리 확인
npm ls

# 중복 패키지 정리
npm dedupe
```

---

## 11. 실습: package.json 최적화

### 11.1 스크립트 개선
```json
{
  "scripts": {
    // 개발 환경
    "dev": "concurrently \"npm start\" \"npm run server\"",
    "server": "json-server --watch database.json --port 5000",
    
    // 테스트
    "test:unit": "react-scripts test --coverage --no-watch",
    "test:e2e": "cypress run",
    "test:all": "npm run test:unit && npm run test:e2e",
    
    // 빌드 및 배포
    "build:dev": "REACT_APP_ENV=development npm run build",
    "build:prod": "REACT_APP_ENV=production npm run build",
    "deploy:dev": "npm run build:dev && gh-pages -d build",
    "deploy:prod": "npm run build:prod && gh-pages -d build",
    
    // 코드 품질
    "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "npm run lint -- --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "analyze": "npm run build && npx bundle-analyzer build/static/js/*.js"
  }
}
```

### 11.2 추가 유용한 패키지
```json
{
  "devDependencies": {
    "concurrently": "^7.6.0",      // 병렬 스크립트 실행
    "cross-env": "^7.0.3",         // 크로스 플랫폼 환경 변수
    "husky": "^8.0.3",             // Git hooks
    "lint-staged": "^13.2.0",      // staged 파일에만 lint 적용
    "prettier": "^2.8.8",          // 코드 포맷터
    "bundle-analyzer": "^1.0.0"    // 번들 크기 분석
  }
}
```

---

## 12. 확인 문제

### 문제 1: 의존성 분류
다음 패키지들을 dependencies와 devDependencies로 올바르게 분류하세요:
- react
- eslint
- axios
- jest
- react-router-dom
- prettier

### 문제 2: 스크립트 작성
다음 기능을 하는 npm script를 작성하세요:
- 개발 서버와 JSON 서버를 동시에 실행
- 테스트 실행 후 커버리지 리포트 생성
- 빌드 후 자동으로 GitHub Pages에 배포

### 문제 3: 버전 관리
`"react": "^18.2.0"`에서 설치 가능한 버전 범위를 설명하세요.

---

## 13. 다음 챕터 예고

**Chapter 6: public/index.html - React 앱의 진입점**에서는:
- HTML 파일의 구조와 React 앱 연결점
- 메타 태그와 SEO 최적화
- PWA 설정과 매니페스트 파일
- 파비콘과 아이콘 설정

package.json으로 프로젝트 설정을 마스터했다면, 이제 React 앱이 실제로 시작되는 HTML 파일을 살펴보겠습니다!

---

## 📝 핵심 요약

1. **package.json은 프로젝트의 설정 파일**
2. **dependencies vs devDependencies 구분**
3. **npm scripts로 작업 자동화**
4. **시맨틱 버저닝으로 버전 관리**
5. **보안 감사와 의존성 정리 필요**

다음 챕터에서 React 앱의 HTML 진입점을 학습하겠습니다!

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 4: React 소개와 개발 환경 설정](./chapter-04-react-intro.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 6: public/index.html - React 앱의 진입점](./chapter-06-index-html.md)

---

**🎉 Chapter 5 완료! 수고하셨습니다! 🚀**

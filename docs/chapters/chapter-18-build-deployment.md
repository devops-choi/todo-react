# Chapter 18: 빌드와 배포 - GitHub Pages

## 학습 목표
- React 애플리케이션 빌드 과정 이해
- GitHub Pages를 통한 정적 사이트 배포
- 빌드 최적화와 성능 개선
- 환경 변수와 배포 설정
- 자동화된 배포 파이프라인 구축

## 사전 준비사항
- Git과 GitHub 사용법
- React 빌드 시스템 이해
- 웹팩과 번들링 개념

---

## 1. React 빌드 과정 이해

### 1.1 개발 모드 vs 프로덕션 모드

```javascript
// 개발 모드 (npm start)
- 소스맵 포함
- 디버깅 정보 유지
- 핫 리로딩 지원
- 파일 크기 최적화 없음

// 프로덕션 모드 (npm run build)
- 코드 최소화 (minification)
- 트리 쉐이킹 (tree shaking)
- 소스맵 제거 또는 분리
- 정적 자산 최적화
```

### 1.2 빌드 명령어 실행

```bash
# 프로덕션 빌드 생성
npm run build

# 빌드 결과 확인
ls -la build/

# 로컬에서 빌드 결과 테스트
npm install -g serve
serve -s build
```

### 1.3 빌드 결과물 분석

```
build/
├── static/
│   ├── css/
│   │   ├── main.[hash].css
│   │   └── main.[hash].css.map
│   ├── js/
│   │   ├── main.[hash].js
│   │   ├── main.[hash].js.map
│   │   └── [chunk].[hash].chunk.js
│   └── media/
│       └── logo.[hash].svg
├── asset-manifest.json
├── index.html
├── manifest.json
└── robots.txt
```

**파일별 역할:**
- `index.html`: 메인 HTML 파일
- `static/js/main.[hash].js`: 번들된 JavaScript 코드
- `static/css/main.[hash].css`: 번들된 CSS 스타일
- `asset-manifest.json`: 자산 매핑 정보
- `manifest.json`: PWA 매니페스트

## 2. GitHub Pages 배포 설정

### 2.1 GitHub Pages 기본 설정

```json
// package.json에 homepage 추가
{
  "name": "react-todo-app",
  "homepage": "https://username.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 2.2 gh-pages 패키지 설치

```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages

# 배포 실행
npm run deploy
```

### 2.3 자동 배포 스크립트

```javascript
// scripts/deploy.js
const { execSync } = require('child_process');
const fs = require('fs');

function deploy() {
  try {
    // 1. 빌드 실행
    console.log('🔨 빌드 시작...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // 2. 빌드 결과 확인
    if (!fs.existsSync('./build')) {
      throw new Error('빌드 폴더가 생성되지 않았습니다.');
    }
    
    // 3. GitHub Pages 배포
    console.log('🚀 배포 시작...');
    execSync('gh-pages -d build', { stdio: 'inherit' });
    
    console.log('✅ 배포 완료!');
    console.log('🌐 사이트 주소: https://username.github.io/repository-name');
    
  } catch (error) {
    console.error('❌ 배포 실패:', error.message);
    process.exit(1);
  }
}

deploy();
```

## 3. GitHub Actions를 통한 자동 배포

### 3.1 GitHub Actions 워크플로우 생성

```yaml
# .github/workflows/deploy.yml
name: Deploy React App to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

### 3.2 환경별 배포 설정

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [ develop ]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build with staging config
      run: npm run build
      env:
        REACT_APP_API_URL: ${{ secrets.STAGING_API_URL }}
        REACT_APP_ENVIRONMENT: staging
        
    - name: Deploy to staging
      run: npm run deploy:staging
```

## 4. 환경 변수 관리

### 4.1 환경별 설정 파일

```javascript
// .env (기본값)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true

// .env.production (프로덕션)
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENVIRONMENT=production
REACT_APP_DEBUG=false

// .env.local (로컬 개발용, Git에서 제외)
REACT_APP_API_URL=http://localhost:3001
REACT_APP_DEBUG_MODE=advanced
```

### 4.2 환경 변수 사용

```javascript
// src/config/environment.js
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  debug: process.env.REACT_APP_DEBUG === 'true',
  version: process.env.REACT_APP_VERSION || '1.0.0'
};

export default config;

// 컴포넌트에서 사용
import config from '../config/environment';

function TodoContainer() {
  useEffect(() => {
    if (config.debug) {
      console.log('API URL:', config.apiUrl);
      console.log('Environment:', config.environment);
    }
  }, []);

  // API 호출
  const fetchTodos = async () => {
    const response = await fetch(`${config.apiUrl}/todos`);
    return response.json();
  };
}
```

### 4.3 GitHub Secrets 설정

```bash
# GitHub 저장소 > Settings > Secrets and variables > Actions

# 시크릿 추가
REACT_APP_API_URL=https://api.production.com
REACT_APP_ANALYTICS_ID=GA-XXXXXXX
DEPLOY_TOKEN=ghp_xxxxxxxxxxxx
```

## 5. 빌드 최적화

### 5.1 번들 크기 분석

```bash
# 번들 분석기 설치
npm install --save-dev webpack-bundle-analyzer

# 분석 스크립트 추가 (package.json)
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}

# 분석 실행
npm run analyze
```

### 5.2 코드 스플리팅

```javascript
// 라우트 기반 코드 스플리팅
import { lazy, Suspense } from 'react';

const TodoContainer = lazy(() => import('./components/TodoContainer'));
const Settings = lazy(() => import('./components/Settings'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<TodoContainer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </div>
  );
}

// 컴포넌트 기반 코드 스플리팅
const HeavyComponent = lazy(() => 
  import('./HeavyComponent').then(module => ({
    default: module.HeavyComponent
  }))
);
```

### 5.3 이미지 최적화

```javascript
// 이미지 최적화 설정
// public/manifest.json
{
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png", 
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}

// WebP 이미지 사용
function OptimizedImage({ src, alt, ...props }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={`${src}.jpg`} type="image/jpeg" />
      <img src={`${src}.jpg`} alt={alt} {...props} />
    </picture>
  );
}
```

## 6. 성능 모니터링

### 6.1 웹 바이탈 측정

```javascript
// src/reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Google Analytics로 전송
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
  
  // 개발 환경에서 콘솔 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
}

function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

export default reportWebVitals;

// src/index.js에서 사용
import reportWebVitals from './reportWebVitals';

// 성능 측정 시작
reportWebVitals(sendToAnalytics);
```

### 6.2 Lighthouse CI 설정

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npx serve -s build',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

// GitHub Actions에 추가
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
```

## 7. 도메인 연결과 HTTPS 설정

### 7.1 커스텀 도메인 설정

```bash
# CNAME 파일 생성 (public/CNAME)
echo "yourdomain.com" > public/CNAME

# DNS 설정
# A 레코드: yourdomain.com -> 185.199.108.153
# CNAME 레코드: www.yourdomain.com -> username.github.io
```

### 7.2 HTTPS 강제 리디렉션

```javascript
// public/index.html에 추가
<script>
  // HTTP에서 HTTPS로 리디렉션
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
  }
</script>
```

## 8. 실습 과제

### 과제 1: 다단계 배포 파이프라인

```yaml
# .github/workflows/multi-stage-deploy.yml
name: Multi-stage Deployment

on:
  push:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm test -- --coverage
    - name: Upload coverage
      uses: codecov/codecov-action@v1

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: build/

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: build/
    - name: Deploy to staging
      run: echo "Deploy to staging environment"

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: build/
    - name: Deploy to production
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

### 과제 2: 배포 알림 시스템

```javascript
// scripts/deploy-notification.js
const axios = require('axios');

async function sendSlackNotification(success, error = null) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const message = success
    ? {
        text: "✅ 배포 성공!",
        attachments: [{
          color: "good",
          fields: [
            { title: "환경", value: process.env.ENVIRONMENT || "production", short: true },
            { title: "브랜치", value: process.env.GITHUB_REF_NAME || "main", short: true },
            { title: "커밋", value: process.env.GITHUB_SHA?.substring(0, 7) || "unknown", short: true },
            { title: "배포 시간", value: new Date().toLocaleString('ko-KR'), short: true }
          ]
        }]
      }
    : {
        text: "❌ 배포 실패!",
        attachments: [{
          color: "danger",
          fields: [
            { title: "에러", value: error || "알 수 없는 오류", short: false }
          ]
        }]
      };

  try {
    await axios.post(webhookUrl, message);
  } catch (err) {
    console.error('Slack 알림 전송 실패:', err.message);
  }
}

module.exports = { sendSlackNotification };
```

### 과제 3: 롤백 시스템

```bash
#!/bin/bash
# scripts/rollback.sh

echo "🔄 롤백 시작..."

# 이전 배포 태그 찾기
PREVIOUS_TAG=$(git tag --sort=-version:refname | head -2 | tail -1)

if [ -z "$PREVIOUS_TAG" ]; then
  echo "❌ 이전 버전을 찾을 수 없습니다."
  exit 1
fi

echo "📋 이전 버전: $PREVIOUS_TAG"
read -p "이 버전으로 롤백하시겠습니까? (y/N): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
  # 이전 버전으로 체크아웃
  git checkout $PREVIOUS_TAG
  
  # 빌드 및 배포
  npm ci
  npm run build
  npm run deploy
  
  echo "✅ 롤백 완료: $PREVIOUS_TAG"
else
  echo "❌ 롤백 취소됨"
fi
```

## 9. 배포 체크리스트

### 배포 전 확인사항
```markdown
## 배포 전 체크리스트

### 코드 품질
- [ ] 모든 테스트 통과
- [ ] ESLint 경고 없음
- [ ] 타입 에러 없음
- [ ] 코드 리뷰 완료

### 성능
- [ ] 번들 크기 확인
- [ ] 이미지 최적화
- [ ] 불필요한 의존성 제거
- [ ] Lighthouse 점수 확인

### 보안
- [ ] 민감한 정보 하드코딩 없음
- [ ] 환경 변수 설정 확인
- [ ] HTTPS 설정
- [ ] CORS 설정 확인

### 기능
- [ ] 모든 주요 기능 테스트
- [ ] 다양한 브라우저에서 확인
- [ ] 모바일 반응형 확인
- [ ] 에러 처리 확인

### 배포
- [ ] 배포 스크립트 테스트
- [ ] 롤백 계획 수립
- [ ] 모니터링 설정
- [ ] 알림 시스템 확인
```

## 요약

이번 장에서는 빌드와 배포 과정을 통해 다음 개념들을 학습했습니다:

1. **React 빌드**: 개발에서 프로덕션으로의 변환 과정
2. **GitHub Pages**: 무료 정적 호스팅 서비스 활용
3. **자동화**: GitHub Actions를 통한 CI/CD 파이프라인
4. **최적화**: 성능 개선과 번들 크기 최적화
5. **모니터링**: 실시간 성능 측정과 알림 시스템

## 다음 장 미리보기

다음 장에서는 Vercel 배포와 vercel.json 설정을 학습하며 다음 내용을 다룹니다:
- Vercel 플랫폼의 특징과 장점
- vercel.json 설정 파일 구성
- 서버리스 함수 배포
- 도메인 연결과 환경 변수 관리
- 배포 최적화와 성능 튜닝

---

💡 **추가 학습 자료**
- [GitHub Pages 공식 문서](https://docs.github.com/ko/pages)
- [GitHub Actions 워크플로우 문법](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions)
- [웹 성능 최적화 가이드](https://web.dev/fast/)

# CI/CD Environment Configuration

# GitHub Actions 환경 변수 설정 가이드

## 🔐 Repository Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 secrets를 설정하세요:

### 📦 백엔드 배포용 Secrets

#### Vercel 배포
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here  
VERCEL_PROJECT_ID=your_project_id_here
```

#### Railway 배포
```
RAILWAY_TOKEN=your_railway_token_here
RAILWAY_SERVICE_ID=your_service_id_here
```

#### Heroku 배포 (선택사항)
```
HEROKU_API_KEY=your_heroku_api_key
HEROKU_APP_NAME=your_app_name
HEROKU_EMAIL=your_email@example.com
```

## 🌍 Environment Variables

### 개발 환경
로컬 개발시 `.env.local` 파일에 설정:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

### 프로덕션 환경
GitHub Pages 배포시 자동 설정:
```
REACT_APP_API_URL=https://your-api-domain.vercel.app
REACT_APP_ENV=production
```

## 🔧 환경별 설정

### GitHub Pages (Frontend)
- 자동 배포: main 브랜치 푸시시
- URL: https://[username].github.io/[repository-name]
- 설정 필요: Repository Settings > Pages > Source: GitHub Actions

### Vercel (Backend API)
1. vercel.com에서 계정 생성
2. GitHub 저장소 연결
3. 프로젝트 설정에서 Root Directory를 `deploy`로 설정
4. Environment Variables 추가

### Railway (Backend API 대안)
1. railway.app에서 계정 생성
2. GitHub 저장소 연결
3. 서비스 생성 후 환경 변수 설정

## 📋 설정 체크리스트

- [ ] GitHub Repository 생성
- [ ] GitHub Pages 활성화
- [ ] Secrets 설정 (선택한 플랫폼에 따라)
- [ ] package.json의 homepage 필드 업데이트
- [ ] 첫 번째 코드 푸시
- [ ] 워크플로우 실행 확인
- [ ] 배포된 사이트 확인

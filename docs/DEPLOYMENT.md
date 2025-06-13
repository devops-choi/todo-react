# GitHub Actions Secrets 설정 가이드

이 프로젝트의 GitHub Actions 워크플로우가 정상적으로 작동하려면 다음 환경 변수들을 GitHub 저장소 설정에 추가해야 합니다.

## GitHub Pages 배포 설정

GitHub Pages 배포는 추가 설정이 필요하지 않습니다. GitHub Actions가 자동으로 처리합니다.

### 설정 방법:
1. GitHub 저장소 → Settings → Pages
2. Source를 "GitHub Actions"로 선택
3. `package.json`의 `homepage` 필드를 본인의 GitHub 사용자명으로 수정

## JSON Server 배포 설정 (선택사항)

JSON Server를 자동 배포하려면 다음 중 하나의 플랫폼을 선택하여 설정하세요:

### Option 1: Vercel (추천)
1. [Vercel](https://vercel.com)에 계정 생성
2. GitHub 저장소와 연결
3. 자동으로 `vercel.json` 설정을 감지하여 배포

### Option 2: Railway
GitHub Secrets에 다음을 추가:
- `RAILWAY_TOKEN`: Railway API 토큰
- `RAILWAY_SERVICE_ID`: Railway 서비스 ID

### Option 3: Heroku
GitHub Secrets에 다음을 추가:
- `HEROKU_API_KEY`: Heroku API 키
- `HEROKU_APP_NAME`: Heroku 앱 이름
- `HEROKU_EMAIL`: Heroku 계정 이메일

### Option 4: Render
GitHub Secrets에 다음을 추가:
- `RENDER_API_KEY`: Render API 키
- `RENDER_SERVICE_ID`: Render 서비스 ID

## GitHub Secrets 설정 방법

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 위의 환경 변수들을 하나씩 추가

## 로컬 테스트

배포 전에 로컬에서 테스트하려면:

```bash
# Frontend 빌드 테스트
npm run build

# JSON Server 테스트
npm run database
```

## 배포 트리거

두 워크플로우 모두 다음 상황에서 자동 실행됩니다:
- `main` 또는 `master` 브랜치에 push
- GitHub Actions 탭에서 수동 실행 (workflow_dispatch)

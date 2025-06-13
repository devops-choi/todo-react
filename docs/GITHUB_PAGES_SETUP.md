# GitHub Pages 설정 가이드

GitHub Pages 배포를 성공적으로 실행하려면 다음 단계를 따라야 합니다.

## 🔧 필수 설정 단계

### 1. GitHub Pages 활성화
1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 사이드바에서 **Pages** 클릭
4. **Source** 섹션에서 **"GitHub Actions"** 선택
5. **Save** 버튼 클릭

### 2. package.json 수정
현재 `package.json`의 `homepage` 설정을 본인의 GitHub 사용자명으로 수정해야 합니다:

```json
{
  "homepage": "https://[YOUR_GITHUB_USERNAME].github.io/react-remote"
}
```

**[YOUR_GITHUB_USERNAME]**을 실제 GitHub 사용자명으로 변경하세요.

### 3. 변경사항 커밋 및 푸시
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

## 🚀 배포 과정

1. 코드를 GitHub에 푸시하면 GitHub Actions가 자동으로 트리거됩니다
2. React 앱이 빌드됩니다
3. GitHub Pages에 자동 배포됩니다
4. `https://[YOUR_GITHUB_USERNAME].github.io/react-remote`에서 확인 가능합니다

## ❗ 문제 해결

### "Get Pages site failed" 오류가 계속 발생하는 경우:

1. **GitHub Pages 설정 재확인**
   - Settings → Pages에서 Source가 "GitHub Actions"로 설정되었는지 확인

2. **환경 생성**
   - GitHub 저장소 → Settings → Environments
   - "New environment" 클릭
   - 이름을 "github-pages"로 설정
   - "Configure environment" 클릭 후 저장

3. **수동 배포 실행**
   - GitHub 저장소 → Actions 탭
   - "Deploy to GitHub Pages" 워크플로우 선택
   - "Run workflow" 버튼 클릭

## 📋 체크리스트

- [ ] GitHub Pages가 "GitHub Actions" 소스로 설정됨
- [ ] package.json의 homepage가 올바른 URL로 설정됨
- [ ] 코드가 main 브랜치에 푸시됨
- [ ] GitHub Actions 워크플로우가 성공적으로 실행됨

## 🔗 배포 완료 후

성공적으로 배포되면:
- GitHub Pages URL에서 앱에 접근할 수 있습니다
- 코드를 푸시할 때마다 자동으로 업데이트됩니다
- GitHub Actions 탭에서 배포 상태를 확인할 수 있습니다

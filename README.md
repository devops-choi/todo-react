# React Remote - Todo App with JSON Server

이 프로젝트는 Create React App으로 생성된 Todo 애플리케이션입니다. JSON Server를 백엔드로 사용하며, GitHub Actions를 통해 자동 배포됩니다.

## 🚀 GitHub Actions 배포

이 프로젝트는 두 가지 자동 배포 워크플로우를 제공합니다:

### 1. GitHub Pages 배포 (Frontend)
- **워크플로우**: `.github/workflows/deploy-gh-pages.yml`
- **트리거**: `main` 또는 `master` 브랜치에 push
- **배포 대상**: React 앱을 GitHub Pages에 정적 사이트로 배포
- **URL**: `https://[YOUR_GITHUB_USERNAME].github.io/react-remote`

### 2. JSON Server 배포 (Backend)
- **워크플로우**: `.github/workflows/deploy-json-server.yml`
- **트리거**: `main` 또는 `master` 브랜치에 push
- **배포 대상**: JSON Server API를 Vercel에 배포
- **API Endpoint**: `https://your-vercel-app.vercel.app/api/todos`

## 📋 설정 방법

### GitHub Pages 설정
1. GitHub 저장소의 Settings → Pages로 이동
2. Source를 "GitHub Actions"로 설정
3. `package.json`에서 `homepage` URL을 본인의 GitHub 사용자명으로 수정:
   ```json
   "homepage": "https://[YOUR_GITHUB_USERNAME].github.io/react-remote"
   ```

### JSON Server 배포 설정 (Vercel)
1. [Vercel](https://vercel.com)에 계정 생성
2. GitHub 저장소와 연결
3. `vercel.json` 설정 파일이 이미 포함되어 있음
4. Vercel에서 자동으로 `server.js`를 감지하여 배포

## 🛠 로컬 개발

### Frontend 실행
```bash
npm start
```
- React 앱이 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### Backend (JSON Server) 실행
```bash
npm run database
```
- JSON Server가 [http://localhost:5000](http://localhost:5000)에서 실행됩니다.
- API 엔드포인트: `http://localhost:5000/todos`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

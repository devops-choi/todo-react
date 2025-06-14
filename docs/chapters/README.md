# React Todo App 완전 학습 가이드 - 전체 목차

> **HTML, CSS, JavaScript, React 초보자를 위한 20챕터 완전 정복**

---

## 📖 학습 가이드 소개

이 교육 과정은 웹 개발 초보자가 React Todo 애플리케이션을 완전히 이해할 수 있도록 설계된 20챕터의 체계적인 학습 자료입니다. HTML, CSS, JavaScript의 기초부터 React의 고급 개념까지 단계별로 학습할 수 있습니다.

---

## 🎯 학습 목표

- **웹 개발 기초**: HTML, CSS, JavaScript 완전 정복
- **React 마스터**: 컴포넌트, 상태, 이벤트 처리 등
- **실전 프로젝트**: Todo 앱을 통한 실무 경험
- **배포와 최적화**: 실제 서비스로 런칭하는 방법
- **모범 사례**: 업계 표준과 베스트 프랙티스

---

## 📚 전체 챕터 목차

### 🌟 **파트 1: 웹 개발 기초 (챕터 1-4)**

#### [Chapter 1: HTML 기초와 웹 페이지 구조 이해](./chapter-01-html-basics.md)
- HTML의 기본 개념과 역할
- 주요 HTML 태그와 속성
- 시맨틱 마크업과 접근성
- React 프로젝트에서의 HTML 역할

#### [Chapter 2: CSS 기초와 스타일링](./chapter-02-css-basics.md)
- CSS 선택자와 속성
- 박스 모델과 레이아웃 시스템
- Flexbox와 Grid 레이아웃
- CSS 모듈과 React 스타일링

#### [Chapter 3: JavaScript 기초와 ES6+ 문법](./chapter-03-javascript-basics.md)
- 변수, 데이터 타입, 연산자
- 함수와 스코프, 클로저
- 배열 고차 함수와 비동기 처리
- ES6+ 최신 문법과 모듈 시스템

#### [Chapter 4: React 소개와 개발 환경 설정](./chapter-04-react-intro.md)
- React의 기본 개념과 특징
- JSX 문법과 컴포넌트
- State와 Props, React Hooks
- 첫 번째 Todo 앱 만들기

---

### 🏗️ **파트 2: 프로젝트 설정과 구조 (챕터 5-8)**

#### [Chapter 5: package.json - 프로젝트 설정과 의존성 관리](./chapter-05-package-json.md)
- package.json 구조와 역할
- npm scripts와 의존성 관리
- 버전 관리와 보안 이슈
- 개발 도구와 빌드 설정

#### [Chapter 6: public/index.html - React 앱의 진입점](./chapter-06-index-html.md)
- HTML 파일의 역할과 구조
- SEO 최적화와 메타 태그
- PWA 설정과 매니페스트
- 파비콘과 정적 파일 관리

#### [Chapter 7: src/index.js - React 애플리케이션 시작점](./chapter-07-index-js.md)
- React 앱의 진입점 역할
- createRoot API와 React 18 기능
- StrictMode와 성능 측정
- 전역 설정과 에러 처리

#### [Chapter 8: src/App.js - 메인 애플리케이션 컴포넌트](./chapter-08-app-js.md)
- App 컴포넌트의 설계 원칙
- 컴포넌트 구성과 데이터 흐름
- 라우팅과 전역 상태 관리
- 에러 처리와 로딩 상태

---

### 🧩 **파트 3: 핵심 컴포넌트 구현 (챕터 9-12)**

#### [Chapter 9: TodoContainer.js - 컨테이너 컴포넌트](./chapter-09-todo-container.md)
- 컨테이너 컴포넌트 패턴
- 상태 관리와 비즈니스 로직
- 필터링과 통계 기능 구현
- 하위 컴포넌트와의 통신

#### [Chapter 10: TodoInput.js - 입력 컴포넌트](./chapter-10-todo-input.md)
- 폼 처리와 입력 검증
- 제어 컴포넌트 vs 비제어 컴포넌트
- 이벤트 핸들링과 키보드 단축키
- 접근성과 사용자 경험

#### [Chapter 11: TodoList.js - 목록 컴포넌트](./chapter-11-todo-list.md)
- 리스트 렌더링과 key prop
- 가상화와 성능 최적화
- 조건부 렌더링과 빈 상태
- 애니메이션과 전환 효과

#### [Chapter 12: TodoItem.js - 개별 아이템 컴포넌트](./chapter-12-todo-item.md)
- 아이템 상태 관리와 업데이트
- 인라인 편집과 삭제 기능
- 체크박스와 토글 기능
- 컴포넌트 최적화 기법

---

### 🔧 **파트 4: 서비스 레이어와 API (챕터 13-16)**

#### [Chapter 13: todoService/index.js - 서비스 레이어 구조](./chapter-13-todo-service.md)
- 서비스 레이어 패턴과 설계
- API 통신과 에러 처리
- 모듈화와 재사용성
- 타입 안전성과 검증

#### [Chapter 14: CRUD 연산 - Create와 Read](./chapter-14-crud-create-read.md)
- createTodoItem.js 구현
- selectTodoList.js와 selectTodoItem.js
- HTTP 요청과 응답 처리
- 데이터 변환과 정규화

#### [Chapter 15: CRUD 연산 - Update와 Delete](./chapter-15-crud-update-delete.md)
- updateTodoItem.js 구현
- deleteTodoItem.js 구현
- 낙관적 업데이트와 롤백
- 배치 처리와 성능 최적화

#### [Chapter 16: server.js와 database.json - 백엔드 서버](./chapter-16-server-database.md)
- JSON Server 설정과 사용법
- RESTful API 설계 원칙
- 데이터베이스 스키마와 관계
- CORS와 보안 설정

---

### 🧪 **파트 5: 고급 주제와 배포 (챕터 17-20)**

#### [Chapter 17: 테스팅 - jest.config.json과 테스트 작성](./chapter-17-jest-config.md)
- Jest 설정과 테스트 환경
- 단위 테스트와 통합 테스트
- React Testing Library 활용
- 테스트 커버리지와 CI/CD

#### [Chapter 18: 빌드와 배포 - GitHub Pages](./chapter-18-build-deployment.md)
- Create React App 빌드 과정
- GitHub Actions CI/CD 파이프라인
- 정적 사이트 배포 전략
- 환경 변수와 배포 최적화

#### [Chapter 19: Vercel 배포와 vercel.json 설정](./chapter-19-vercel-deployment.md)
- Vercel 플랫폼과 서버리스
- vercel.json 설정과 라우팅
- 환경별 배포 전략
- 모니터링과 성능 분석

#### [Chapter 20: 성능 최적화와 모범 사례](./chapter-20-performance-optimization.md)
- 번들 크기 최적화
- 코드 분할과 지연 로딩
- 메모이제이션과 리렌더링 최적화
- 접근성과 SEO 최적화

---

## 🎓 학습 방법 가이드

### 📖 **순차 학습 (권장)**
1. **기초부터 차근차근**: 챕터 1부터 순서대로 학습
2. **실습 중심**: 각 챕터의 예제를 직접 구현
3. **문제 해결**: 확인 문제를 통한 이해도 점검
4. **반복 학습**: 어려운 개념은 여러 번 복습

### 🎯 **선택적 학습**
- **React 경험자**: 챕터 5부터 시작
- **JavaScript 경험자**: 챕터 4부터 시작
- **배포만 관심**: 챕터 18-19 집중
- **테스팅 중심**: 챕터 17 집중

### 💡 **학습 팁**
- **실습 환경**: VS Code + Chrome DevTools
- **개발 도구**: React DevTools 설치 필수
- **코드 관리**: Git으로 버전 관리 연습
- **커뮤니티**: 막힐 때는 공식 문서와 커뮤니티 활용

---

## 🛠️ **필수 개발 환경**

### 소프트웨어 요구사항
- **Node.js**: 18.0.0 이상
- **npm**: 8.0.0 이상
- **VS Code**: 최신 버전
- **Chrome**: 최신 버전

### VS Code 확장 프로그램
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

---

## 📋 **프로젝트 완성 체크리스트**

### ✅ **기본 기능**
- [ ] 할 일 추가
- [ ] 할 일 완료 토글
- [ ] 할 일 삭제
- [ ] 필터링 (전체/활성/완료)
- [ ] 통계 표시

### ✅ **고급 기능**
- [ ] 로컬 스토리지 연동
- [ ] API 서버 연동
- [ ] 반응형 디자인
- [ ] 접근성 최적화
- [ ] 성능 최적화

### ✅ **배포**
- [ ] GitHub Pages 배포
- [ ] Vercel 배포
- [ ] 도메인 연결
- [ ] 모니터링 설정

---

## 🎉 **학습 완료 후 다음 단계**

### 🚀 **심화 학습**
- **TypeScript**: 타입 안전성 추가
- **상태 관리**: Redux, Zustand 학습
- **라우팅**: React Router 마스터
- **UI 라이브러리**: Material-UI, Chakra UI 등

### 🌟 **포트폴리오 확장**
- **개인 블로그**: Gatsby, Next.js
- **전자상거래**: 쇼핑몰 프로젝트
- **실시간 채팅**: WebSocket 활용
- **모바일 앱**: React Native

### 💼 **취업 준비**
- **포트폴리오 사이트**: 프로젝트 전시
- **GitHub 관리**: 코드 품질과 문서화
- **기술 블로그**: 학습 과정 공유
- **오픈소스 기여**: 실무 경험 쌓기

---

## 📞 **도움이 필요할 때**

### 공식 문서
- [React 공식 문서](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Create React App](https://create-react-app.dev/)

### 커뮤니티
- [React 한국 커뮤니티](https://react-korea.vercel.app/)
- [JavaScript 한국 커뮤니티](https://jsdev.kr/)
- [Stack Overflow](https://stackoverflow.com/)

---

## 🏆 **성공적인 학습을 위한 마음가짐**

> **"천리길도 한 걸음부터"**
> 
> 프로그래밍은 마라톤과 같습니다. 꾸준히, 차근차근 학습하면 반드시 목표에 도달할 수 있습니다.

**💪 학습 동기 유지법:**
1. **작은 성취감**: 각 챕터 완료 시 자신을 칭찬하기
2. **꾸준한 연습**: 매일 조금씩이라도 코딩하기
3. **실제 프로젝트**: 배운 내용을 직접 적용해보기
4. **커뮤니티 참여**: 다른 학습자들과 경험 공유

---

**🎉 즐거운 학습 되세요! Happy Coding! 🚀**

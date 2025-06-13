# Chapter 1: HTML 기초와 웹 페이지 구조 이해

## 📚 학습 목표
- HTML의 기본 개념과 역할 이해
- 웹 페이지의 구조와 HTML 태그 학습
- React 프로젝트에서 HTML이 어떻게 사용되는지 파악
- `public/index.html` 파일의 역할과 구조 분석

## 🔗 필요한 사전 지식
- 컴퓨터 기본 조작법
- 텍스트 에디터 사용법
- 웹 브라우저의 개념

---

## 1. HTML이란 무엇인가?

**HTML(HyperText Markup Language)**은 웹 페이지의 구조를 정의하는 마크업 언어입니다.

### 1.1 HTML의 특징
- **구조화된 문서**: 제목, 단락, 목록 등의 구조 정의
- **태그 기반**: `<태그>내용</태그>` 형태로 작성
- **브라우저 해석**: 웹 브라우저가 HTML을 읽어 화면에 표시

### 1.2 기본 HTML 구조
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>페이지 제목</title>
  </head>
  <body>
    <h1>안녕하세요!</h1>
    <p>이것은 첫 번째 단락입니다.</p>
  </body>
</html>
```

---

## 2. 주요 HTML 태그들

### 2.1 문서 구조 태그
| 태그 | 설명 | 예시 |
|------|------|------|
| `<!DOCTYPE html>` | HTML5 문서 선언 | `<!DOCTYPE html>` |
| `<html>` | HTML 문서의 루트 요소 | `<html lang="ko">` |
| `<head>` | 문서의 메타데이터 영역 | `<head>...</head>` |
| `<body>` | 화면에 표시될 내용 영역 | `<body>...</body>` |

### 2.2 메타데이터 태그
```html
<head>
  <meta charset="UTF-8">               <!-- 문자 인코딩 -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>페이지 제목</title>           <!-- 브라우저 탭 제목 -->
  <meta name="description" content="페이지 설명">
</head>
```

### 2.3 콘텐츠 태그
```html
<!-- 제목 태그 -->
<h1>가장 큰 제목</h1>
<h2>두 번째 제목</h2>
<h3>세 번째 제목</h3>

<!-- 텍스트 태그 -->
<p>단락</p>
<span>인라인 텍스트</span>

<!-- 컨테이너 태그 -->
<div>블록 레벨 컨테이너</div>
<section>섹션</section>
<article>독립적인 내용</article>
```

---

## 3. React 프로젝트의 HTML 구조

우리 Todo 프로젝트의 `public/index.html` 파일을 분석해보겠습니다:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### 3.1 각 부분의 역할

#### `<head>` 섹션 분석
```html
<meta charset="utf-8" />
```
- **역할**: 문자 인코딩을 UTF-8로 설정
- **중요성**: 한글 등 다양한 언어 지원

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```
- **역할**: 모바일 반응형 설정
- **효과**: 다양한 기기에서 올바른 화면 표시

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```
- **역할**: 브라우저 탭의 작은 아이콘 설정
- **`%PUBLIC_URL%`**: Create React App의 특수 변수

#### `<body>` 섹션 분석
```html
<div id="root"></div>
```
- **핵심 요소**: React 앱이 렌더링될 컨테이너
- **id="root"**: JavaScript에서 이 요소를 찾아 React 컴포넌트 삽입

---

## 4. HTML과 React의 관계

### 4.1 전통적인 HTML vs React
```html
<!-- 전통적인 HTML -->
<div>
  <h1>할 일 목록</h1>
  <ul>
    <li>HTML 학습하기</li>
    <li>CSS 학습하기</li>
    <li>JavaScript 학습하기</li>
  </ul>
</div>

<!-- React에서 생성되는 HTML (동적) -->
<div>
  <h1>할 일 목록</h1>
  <ul>
    <!-- JavaScript로 동적 생성 -->
  </ul>
</div>
```

### 4.2 React가 HTML을 생성하는 과정
1. **React 컴포넌트 작성** → JSX 문법 사용
2. **JavaScript 실행** → React가 JSX를 HTML로 변환
3. **DOM 삽입** → `id="root"` 요소에 HTML 삽입
4. **브라우저 렌더링** → 사용자에게 화면 표시

---

## 5. 실습: HTML 구조 이해하기

### 5.1 기본 HTML 페이지 만들기
다음 HTML을 `test.html` 파일로 저장하고 브라우저에서 열어보세요:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>나의 첫 HTML 페이지</title>
</head>
<body>
    <header>
        <h1>📝 나의 할 일 목록</h1>
        <p>오늘 할 일을 정리해보세요</p>
    </header>
    
    <main>
        <section>
            <h2>할 일</h2>
            <ul>
                <li>HTML 기초 학습</li>
                <li>CSS 기초 학습</li>
                <li>JavaScript 기초 학습</li>
            </ul>
        </section>
        
        <section>
            <h2>완료된 일</h2>
            <ul>
                <li>개발 환경 설정</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>© 2025 나의 할 일 앱</p>
    </footer>
</body>
</html>
```

### 5.2 시맨틱 HTML 이해하기
```html
<!-- 의미있는 HTML 구조 -->
<header>    <!-- 페이지 상단 -->
<nav>       <!-- 네비게이션 -->
<main>      <!-- 주요 콘텐츠 -->
<section>   <!-- 섹션 -->
<article>   <!-- 독립적인 글 -->
<aside>     <!-- 사이드바 -->
<footer>    <!-- 페이지 하단 -->
```

---

## 6. HTML 속성(Attributes) 이해

### 6.1 전역 속성
```html
<!-- id: 고유 식별자 -->
<div id="root">React 앱 컨테이너</div>

<!-- class: CSS 스타일링을 위한 클래스 -->
<div class="container">콘텐츠</div>

<!-- style: 인라인 스타일 -->
<p style="color: blue; font-size: 16px;">파란 글씨</p>
```

### 6.2 특수 속성
```html
<!-- 링크 -->
<a href="https://reactjs.org">React 공식 사이트</a>

<!-- 이미지 -->
<img src="logo.png" alt="로고 이미지">

<!-- 입력 필드 -->
<input type="text" placeholder="할 일을 입력하세요">
```

---

## 7. 접근성(Accessibility) 고려사항

### 7.1 시맨틱 마크업의 중요성
```html
<!-- 좋은 예: 의미있는 구조 -->
<nav role="navigation">
  <ul>
    <li><a href="#home">홈</a></li>
    <li><a href="#about">소개</a></li>
  </ul>
</nav>

<!-- 나쁜 예: 의미없는 구조 -->
<div class="navigation">
  <div class="nav-item">홈</div>
  <div class="nav-item">소개</div>
</div>
```

### 7.2 ARIA 속성
```html
<!-- 스크린 리더를 위한 레이블 -->
<button aria-label="할 일 삭제">🗑️</button>

<!-- 상태 정보 제공 -->
<div role="alert" aria-live="polite">
  할 일이 추가되었습니다.
</div>
```

---

## 8. 확인 문제

### 문제 1: HTML 구조 식별
다음 HTML에서 각 태그의 역할을 설명하세요:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Quiz</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### 문제 2: 시맨틱 마크업 개선
다음 HTML을 시맨틱 태그를 사용해서 개선하세요:
```html
<div class="header">
    <div class="title">블로그 제목</div>
</div>
<div class="content">
    <div class="post">
        <div class="post-title">글 제목</div>
        <div class="post-content">글 내용</div>
    </div>
</div>
```

---

## 9. 다음 챕터 예고

**Chapter 2: CSS 기초와 스타일링**에서는:
- CSS의 기본 개념과 선택자 학습
- 박스 모델과 레이아웃 이해
- React 프로젝트에서 CSS 모듈 사용법
- `TodoContainer.module.css` 파일 분석

HTML로 구조를 만들었다면, 이제 CSS로 아름답게 꾸며보겠습니다!

---

## 📝 핵심 요약

1. **HTML은 웹 페이지의 구조를 정의**하는 마크업 언어
2. **`<head>`는 메타데이터**, **`<body>`는 실제 내용**
3. **React는 `id="root"` 요소에 동적으로 HTML 생성**
4. **시맨틱 태그**를 사용하여 의미있는 구조 작성
5. **접근성**을 고려한 마크업이 중요

다음 챕터에서 CSS로 이 구조를 아름답게 스타일링하는 방법을 학습하겠습니다!

---

# Chapter 2: CSS 기초와 스타일링

## 📚 학습 목표
- CSS의 기본 개념과 역할 이해
- CSS 선택자와 속성 학습
- 박스 모델과 레이아웃 이해
- 반응형 웹 디자인 기초 학습
- React 프로젝트에서 CSS 모듈 사용법 익히기

## 🔗 필요한 사전 지식
- HTML 기본 구조와 태그
- 웹 브라우저의 작동 원리
- 텍스트 에디터 사용법

---

## 1. CSS란 무엇인가?

**CSS(Cascading Style Sheets)**는 HTML 요소의 스타일을 정의하는 스타일 시트 언어입니다.

### 1.1 CSS의 역할
- **스타일 적용**: 색상, 폰트, 여백 등 시각적 스타일 지정
- **레이아웃 구성**: 요소의 배치 및 크기 조절
- **반응형 디자인**: 다양한 화면 크기에 맞춘 디자인 조정

### 1.2 CSS 문법
```css
선택자 {
  속성: 값;
}

/* 예시 */
h1 {
  color: blue;
  font-size: 2rem;
}
```

---

## 2. CSS 선택자

### 2.1 기본 선택자
| 선택자 | 설명 | 예시 |
|--------|------|------|
| `*`    | 모든 요소 선택 | `* { margin: 0; padding: 0; }` |
| `element` | 특정 요소 선택 | `h1 { color: red; }` |
| `.class` | 클래스가 있는 요소 선택 | `.container { max-width: 800px; }` |
| `#id`   | ID가 있는 요소 선택 | `#header { background: gray; }` |

### 2.2 그룹화 선택자
```css
h1, h2, h3 {
  margin-bottom: 1rem;
}
```

### 2.3 자식 및 후손 선택자
```css
/* 자식 선택자 */
ul > li {
  list-style-type: square;
}

/* 후손 선택자 */
div p {
  color: green;
}
```

---

## 3. CSS 박스 모델

### 3.1 박스 모델 개요
모든 HTML 요소는 박스 모델에 따라 사각형 박스로 표현됩니다.

### 3.2 박스 모델 구성 요소
- **Content**: 실제 내용 영역
- **Padding**: 내용과 테두리 사이의 내부 여백
- **Border**: 요소의 테두리
- **Margin**: 요소와 다른 요소 사이의 외부 여백

### 3.3 박스 모델 예시
```css
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

---

## 4. CSS 레이아웃 기법

### 4.1 플렉스박스(Flexbox)
- **정의**: 1차원 레이아웃 모델로, 요소를 행 또는 열 방향으로 정렬
- **주요 속성**:
  - `display: flex`: 플렉스 컨테이너로 설정
  - `justify-content`: 주 축(main axis) 방향 정렬
  - `align-items`: 교차 축(cross axis) 방향 정렬

### 4.2 그리드 레이아웃(CSS Grid)
- **정의**: 2차원 레이아웃 모델로, 행과 열로 요소 배치
- **주요 속성**:
  - `display: grid`: 그리드 컨테이너로 설정
  - `grid-template-columns`: 열 크기 정의
  - `grid-template-rows`: 행 높이 정의

---

## 5. 반응형 웹 디자인

### 5.1 반응형 웹이란?
- **정의**: 다양한 기기와 화면 크기에 따라 레이아웃과 콘텐츠가 유동적으로 변하는 웹 디자인

### 5.2 미디어 쿼리
- **정의**: 특정 조건에 따라 CSS 스타일을 적용하는 기술
- **구문**:
```css
@media (조건) {
  /* 스타일 규칙 */
}

/* 예시 */
@media (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}
```

---

## 6. React에서 CSS 사용하기

### 6.1 CSS 파일 임포트
- **기본 방법**:
```javascript
import './App.css';
```

### 6.2 CSS 모듈
- **정의**: 컴포넌트 단위로 스타일을 적용할 수 있는 방법
- **사용법**:
  1. 파일명에 `.module.css` 확장자 사용
  2. 클래스 이름을 객체 형태로 임포트
```javascript
import styles from './TodoContainer.module.css';

<div className={styles.container}>
  {/* 내용 */}
</div>
```

---

## 7. 실습: CSS로 스타일링 해보기

### 7.1 기본 스타일 적용
다음 CSS를 `styles.css` 파일에 작성하고 HTML 파일에 링크하세요:
```css
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

h1 {
  color: #333;
}

p {
  margin-bottom: 1rem;
}
```

### 7.2 반응형 디자인 구현
다음 CSS 미디어 쿼리를 사용하여 반응형 디자인을 구현하세요:
```css
@media (max-width: 768px) {
  body {
    background-color: #f4f4f4;
  }

  h1 {
    font-size: 1.5rem;
  }
}
```

---

## 8. 확인 문제

### 문제 1: CSS 선택자 식별
다음 CSS에서 선택자의 역할을 설명하세요:
```css
.container {
  max-width: 800px;
  margin: 0 auto;
}
```

### 문제 2: 반응형 디자인 미디어 쿼리 작성
다음 조건을 만족하는 미디어 쿼리를 작성하세요:
- 화면 너비가 480px 이하일 때
- 본문 배경색을 연한 회색으로 변경

---

## 9. 다음 챕터 예고

**Chapter 3: JavaScript 기초와 React 도입**에서는:
- JavaScript의 기본 개념과 문법 학습
- React의 컴포넌트 기반 구조 이해
- 상태 관리와 생명주기 메서드 소개
- 간단한 React 앱 만들어 보기

CSS로 웹 페이지를 스타일링 했다면, 이제 JavaScript로 동적인 기능을 추가해보겠습니다!

---

## 📝 핵심 요약

1. **CSS는 HTML 요소의 스타일과 레이아웃을 정의**하는 언어
2. **선택자**를 사용하여 스타일 적용할 요소 지정
3. **박스 모델**을 이해하고 적절히 활용
4. **플렉스박스와 그리드**를 사용하여 효율적인 레이아웃 구성
5. **반응형 웹 디자인**을 통해 다양한 기기에서 최적화된 화면 제공
6. **React에서는 CSS 모듈**을 사용하여 컴포넌트 단위로 스타일 적용

다음 챕터에서 JavaScript와 React의 세계로 들어가 보겠습니다!

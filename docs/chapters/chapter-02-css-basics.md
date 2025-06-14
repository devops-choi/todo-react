# Chapter 2: CSS 기초와 스타일링

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 1: HTML 기초와 웹 페이지 구조 이해](./chapter-01-html-basics.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 3: JavaScript 기초와 ES6+ 문법](./chapter-03-javascript-basics.md)

---

## 📚 학습 목표
- CSS의 기본 개념과 역할 이해
- CSS 선택자와 속성 학습
- 박스 모델과 레이아웃 시스템 파악
- CSS 모듈의 개념과 React에서의 활용법
- `TodoContainer.module.css` 파일 분석

## 🔗 필요한 사전 지식
- Chapter 1: HTML 기초와 웹 페이지 구조
- HTML 태그와 속성에 대한 기본 이해

---

## 1. CSS란 무엇인가?

**CSS(Cascading Style Sheets)**는 HTML 문서의 스타일(디자인)을 정의하는 언어입니다.

### 1.1 CSS의 역할
- **시각적 표현**: 색상, 폰트, 크기, 레이아웃
- **반응형 디자인**: 다양한 화면 크기 대응
- **애니메이션**: 동적 효과와 전환
- **사용자 경험**: 직관적이고 아름다운 인터페이스

### 1.2 CSS 기본 문법
```css
/* 선택자 { 속성: 값; } */
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}

/* 클래스 선택자 */
.title {
    background-color: lightgray;
    padding: 10px;
}

/* ID 선택자 */
#header {
    width: 100%;
    height: 60px;
}
```

---

## 2. CSS 선택자 완전 정복

### 2.1 기본 선택자
```css
/* 태그 선택자 */
h1 { color: red; }
p { margin: 10px; }

/* 클래스 선택자 */
.container { width: 100%; }
.button { padding: 8px 16px; }

/* ID 선택자 */
#root { min-height: 100vh; }
#header { position: fixed; }

/* 전체 선택자 */
* { box-sizing: border-box; }
```

### 2.2 조합 선택자
```css
/* 후손 선택자 */
.container p { color: gray; }

/* 자식 선택자 */
.list > li { margin: 5px 0; }

/* 인접 형제 선택자 */
h1 + p { margin-top: 0; }

/* 일반 형제 선택자 */
h1 ~ p { color: blue; }
```

### 2.3 가상 클래스와 가상 요소
```css
/* 가상 클래스 */
.button:hover { background-color: blue; }
.input:focus { border-color: green; }
.item:nth-child(even) { background-color: #f5f5f5; }

/* 가상 요소 */
.title::before { content: "📝 "; }
.text::after { content: " ✨"; }
```

---

## 3. 박스 모델 이해하기

### 3.1 박스 모델의 구성
```
┌─────────────────────────────────┐
│           Margin                │
│  ┌───────────────────────────┐  │
│  │        Border             │  │
│  │  ┌─────────────────────┐  │  │
│  │  │      Padding        │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │    Content    │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 3.2 박스 모델 속성
```css
.box {
    /* 내용물 크기 */
    width: 200px;
    height: 100px;
    
    /* 안쪽 여백 */
    padding: 20px;          /* 모든 방향 */
    padding: 10px 20px;     /* 상하 좌우 */
    padding: 5px 10px 15px 20px; /* 상 우 하 좌 */
    
    /* 테두리 */
    border: 1px solid #ccc;
    border-radius: 8px;
    
    /* 바깥쪽 여백 */
    margin: 10px auto;      /* 상하 10px, 좌우 중앙정렬 */
    
    /* 박스 크기 계산 방식 */
    box-sizing: border-box; /* padding, border 포함 */
}
```

### 3.3 실제 적용 예제
```css
/* Todo 아이템 박스 모델 */
.todoItem {
    width: 100%;
    padding: 16px;
    margin: 8px 0;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: white;
}
```

---

## 4. 레이아웃 시스템

### 4.1 Display 속성
```css
/* 블록 레벨 요소 */
.block {
    display: block;
    width: 100%;
    margin: 10px 0;
}

/* 인라인 요소 */
.inline {
    display: inline;
    margin: 0 5px;
}

/* 인라인 블록 */
.inline-block {
    display: inline-block;
    width: 200px;
    vertical-align: top;
}

/* 숨김 */
.hidden {
    display: none;
}
```

### 4.2 Flexbox 레이아웃
```css
/* 플렉스 컨테이너 */
.flex-container {
    display: flex;
    justify-content: space-between; /* 수평 정렬 */
    align-items: center;           /* 수직 정렬 */
    flex-direction: row;           /* 방향 */
    flex-wrap: wrap;               /* 줄바꿈 */
    gap: 16px;                     /* 간격 */
}

/* 플렉스 아이템 */
.flex-item {
    flex: 1;                       /* 동일한 비율로 확장 */
    flex-grow: 1;                  /* 확장 비율 */
    flex-shrink: 0;                /* 축소 방지 */
    flex-basis: 200px;             /* 기본 크기 */
}
```

### 4.3 Grid 레이아웃
```css
/* 그리드 컨테이너 */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr; /* 3개 열 */
    grid-template-rows: auto;           /* 자동 높이 */
    grid-gap: 20px;                     /* 간격 */
}

/* 그리드 아이템 배치 */
.grid-item {
    grid-column: 1 / 3;    /* 1~3번 열 차지 */
    grid-row: 1;           /* 1번 행 */
}
```

---

## 5. CSS 모듈 시스템

### 5.1 CSS 모듈이란?
- **지역 스코프**: 클래스명 충돌 방지
- **컴포넌트 단위**: 각 컴포넌트별로 독립적인 스타일
- **자동 클래스명**: 고유한 클래스명 자동 생성

### 5.2 일반 CSS vs CSS 모듈
```css
/* 일반 CSS (global.css) */
.button {
    background-color: blue;
    color: white;
    padding: 8px 16px;
}

/* CSS 모듈 (Button.module.css) */
.button {
    background-color: blue;
    color: white;
    padding: 8px 16px;
}
/* 실제로는 .Button_button_xyz123 같은 고유 클래스명으로 변환됨 */
```

### 5.3 React에서 CSS 모듈 사용법
```javascript
// CSS 모듈 import
import styles from './TodoContainer.module.css';

// 컴포넌트에서 사용
function TodoContainer() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Todo App</h1>
            <button className={`${styles.button} ${styles.primary}`}>
                추가
            </button>
        </div>
    );
}
```

---

## 6. TodoContainer.module.css 실전 분석

### 6.1 컨테이너 레이아웃
```css
.container {
  max-width: 800px;           /* 최대 너비 제한 */
  margin: 0 auto;             /* 중앙 정렬 */
  padding: 2rem;              /* 내부 여백 */
  min-height: 100vh;          /* 최소 높이 = 화면 전체 높이 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
```

**핵심 개념 설명:**
- `max-width: 800px`: 큰 화면에서도 너무 넓지 않게 제한
- `margin: 0 auto`: 상하 0, 좌우 auto로 중앙 정렬
- `100vh`: Viewport Height의 100% (화면 전체 높이)
- `linear-gradient`: 그라데이션 배경색

### 6.2 헤더 스타일링
```css
.title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

**고급 CSS 기법:**
- `background-clip: text`: 배경을 텍스트 모양으로 자르기
- `text-fill-color: transparent`: 텍스트를 투명하게 만들어 배경이 보이게
- `text-shadow`: 텍스트 그림자 효과

### 6.3 플렉스박스 레이아웃
```css
.stats {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}
```

**플렉스박스 속성 분석:**
- `display: flex`: 플렉스 컨테이너로 설정
- `gap: 1rem`: 아이템 간 간격
- `justify-content: center`: 수평 중앙 정렬

### 6.4 호버 효과와 애니메이션
```css
.statItem:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}
```

**인터랙티브 효과:**
- `:hover`: 마우스 호버 시 적용
- `transform: translateY(-3px)`: Y축으로 -3px 이동 (위로)
- `transition`: 부드러운 전환 효과

### 6.5 반응형 디자인
```css
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .stats {
    flex-direction: column;
  }
}
```

**미디어 쿼리:**
- `@media (max-width: 768px)`: 768px 이하 화면에서 적용
- `flex-direction: column`: 세로 방향으로 배치

---

## 7. 색상과 타이포그래피

### 7.1 색상 표현법
```css
/* 색상명 */
color: red;
color: blue;

/* HEX 코드 */
color: #ff0000;
color: #0066cc;

/* RGB */
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5); /* 투명도 포함 */

/* HSL */
color: hsl(0, 100%, 50%);
color: hsla(0, 100%, 50%, 0.5);
```

### 7.2 폰트와 텍스트
```css
.text {
    /* 폰트 패밀리 */
    font-family: 'Helvetica', Arial, sans-serif;
    
    /* 폰트 크기 */
    font-size: 16px;        /* 절대 단위 */
    font-size: 1rem;        /* 상대 단위 */
    font-size: 1.2em;       /* 부모 기준 */
    
    /* 폰트 굵기 */
    font-weight: normal;    /* 400 */
    font-weight: bold;      /* 700 */
    font-weight: 600;       /* 숫자 */
    
    /* 텍스트 정렬 */
    text-align: left;
    text-align: center;
    text-align: right;
    text-align: justify;
    
    /* 줄 간격 */
    line-height: 1.5;
    
    /* 자간 */
    letter-spacing: 1px;
}
```

---

## 8. CSS 단위 시스템

### 8.1 절대 단위
```css
.absolute-units {
    width: 300px;          /* 픽셀 */
    height: 200pt;         /* 포인트 */
    margin: 1cm;           /* 센티미터 */
    padding: 10mm;         /* 밀리미터 */
}
```

### 8.2 상대 단위
```css
.relative-units {
    width: 50%;            /* 부모 요소의 50% */
    font-size: 1.2em;      /* 부모 폰트 크기의 1.2배 */
    padding: 2rem;         /* 루트 폰트 크기의 2배 */
    height: 100vh;         /* 뷰포트 높이의 100% */
    width: 100vw;          /* 뷰포트 너비의 100% */
}
```

### 8.3 언제 어떤 단위를 사용할까?
- **px**: 고정된 크기가 필요한 경우 (테두리, 그림자)
- **rem**: 폰트 크기, 여백 (접근성 고려)
- **%**: 반응형 너비, 높이
- **vw/vh**: 전체 화면 기준 레이아웃

---

## 9. 실습: Todo 앱 스타일링

### 9.1 기본 버튼 만들기
```css
.button {
    /* 기본 스타일 */
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    /* 색상 */
    background-color: #007bff;
    color: white;
}

.button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.button:active {
    transform: translateY(0);
}
```

### 9.2 카드 레이아웃 만들기
```css
.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 16px 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

---

## 10. CSS 성능 최적화

### 10.1 선택자 성능
```css
/* 빠른 선택자 */
.my-class { }
#my-id { }

/* 느린 선택자 (피하기) */
* { }
.container .item .button { }
[attribute="value"] { }
```

### 10.2 CSS 구조화
```css
/* 좋은 예: 체계적 구조 */
/* 1. Reset/Normalize */
/* 2. Base styles */
/* 3. Layout */
/* 4. Components */
/* 5. Utilities */

/* 나쁜 예: 무작위 배치 */
.random-style { }
```

---

## 11. 확인 문제

### 문제 1: 선택자 이해
다음 CSS에서 어떤 요소가 스타일링되는지 설명하세요:
```css
.container > .item:nth-child(odd) {
    background-color: #f5f5f5;
}
```

### 문제 2: 플렉스박스 레이아웃
다음 요구사항을 만족하는 CSS를 작성하세요:
- 3개의 아이템을 가로로 배치
- 아이템 간 동일한 간격
- 세 번째 아이템만 오른쪽 끝에 배치

### 문제 3: 반응형 디자인
모바일에서는 세로로, 데스크톱에서는 가로로 배치되는 레이아웃을 만드세요.

---

## 12. 다음 챕터 예고

**Chapter 3: JavaScript 기초와 ES6+ 문법**에서는:
- JavaScript의 기본 문법과 데이터 타입
- 함수와 스코프의 이해
- ES6+ 의 최신 문법 (let/const, 화살표 함수, 템플릿 리터럴)
- React에서 사용되는 JavaScript 패턴들

CSS로 아름다운 디자인을 완성했다면, 이제 JavaScript로 동적인 기능을 구현해보겠습니다!

---

## 📝 핵심 요약

1. **CSS는 HTML의 시각적 표현을 담당**
2. **박스 모델을 이해하면 레이아웃 설계가 쉬워짐**
3. **Flexbox는 1차원 레이아웃**, **Grid는 2차원 레이아웃**
4. **CSS 모듈로 스타일 충돌 방지**
5. **반응형 디자인으로 모든 기기에서 최적화**

다음 챕터에서 JavaScript의 핵심 개념들을 학습하겠습니다!

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 1: HTML 기초와 웹 페이지 구조 이해](./chapter-01-html-basics.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 3: JavaScript 기초와 ES6+ 문법](./chapter-03-javascript-basics.md)

---

**🎉 Chapter 2 완료! 수고하셨습니다! 🚀**

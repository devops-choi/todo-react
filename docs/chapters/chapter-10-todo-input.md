# Chapter 10: TodoInput.js - 입력 컴포넌트

## 학습 목표
- React에서 폼(form) 처리 방법 이해
- 제어 컴포넌트(Controlled Component) 개념 학습
- 사용자 입력 처리와 상태 관리
- 폼 유효성 검사 구현
- PropTypes를 활용한 타입 검증

## 사전 준비사항
- useState 훅 사용법
- 이벤트 핸들링 기초
- CSS modules 사용법

---

## 1. TodoInput 컴포넌트 개요

TodoInput 컴포넌트는 사용자가 새로운 할 일을 입력할 수 있는 인터페이스를 제공합니다.

### 핵심 기능
- 텍스트 입력 받기
- 폼 제출 처리
- 입력값 유효성 검사
- 부모 컴포넌트와 데이터 통신

## 2. 코드 분석

### 전체 코드 구조
```javascript
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoInput.module.css';

function TodoInput({ onSubmit }) {
  const [title, setTitle] = useState('');
  
  function handleChange(event) {
    setTitle(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }
    const data = { title, completed: false };
    onSubmit(data);
    setTitle('');
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="할 일을 입력하세요"
        />
        <button className={styles.button} type="submit">
          추가
        </button>
      </form>
    </div>
  );
}

TodoInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoInput;
```

## 3. 주요 개념 설명

### 3.1 제어 컴포넌트 (Controlled Component)

```javascript
const [title, setTitle] = useState('');

function handleChange(event) {
  setTitle(event.target.value);
}

// JSX에서 사용
<input value={title} onChange={handleChange} />
```

**왜 제어 컴포넌트를 사용할까요?**
- React 상태와 UI가 항상 동기화됨
- 입력값을 실시간으로 검증할 수 있음
- 프로그래밍 방식으로 입력값 제어 가능

### 3.2 비제어 컴포넌트와의 차이점

```javascript
// 제어 컴포넌트 (추천)
<input value={title} onChange={handleChange} />

// 비제어 컴포넌트
<input ref={inputRef} defaultValue="" />
```

### 3.3 폼 제출 처리

```javascript
function handleSubmit(event) {
  // 기본 폼 제출 동작 방지
  event.preventDefault();
  
  // 유효성 검사
  if (!title.trim()) {
    alert('할 일을 입력해주세요!');
    return;
  }
  
  // 데이터 생성
  const data = { title, completed: false };
  
  // 부모 컴포넌트에 데이터 전달
  onSubmit(data);
  
  // 입력 필드 초기화
  setTitle('');
}
```

### 3.4 Props를 통한 부모-자식 통신

```javascript
// 부모 컴포넌트에서
<TodoInput onSubmit={handleAddTodo} />

// 자식 컴포넌트에서
function TodoInput({ onSubmit }) {
  // onSubmit은 부모로부터 받은 함수
  onSubmit(data);
}
```

## 4. CSS 모듈 스타일링

### 컨테이너 스타일
```css
.container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}
```

### 폼 레이아웃
```css
.form {
  display: flex;
  gap: 1rem;
  align-items: center;
}
```

### 입력 필드 스타일
```css
.input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}
```

## 5. 접근성 (Accessibility) 개선

```javascript
<form onSubmit={handleSubmit} aria-label="새 할 일 추가">
  <input
    value={title}
    onChange={handleChange}
    type="text"
    placeholder="할 일을 입력하세요"
    aria-label="할 일 제목 입력"
    aria-required="true"
  />
  <button type="submit" aria-label="할 일 추가">
    추가
  </button>
</form>
```

**접근성 속성 설명:**
- `aria-label`: 스크린 리더를 위한 설명
- `aria-required`: 필수 입력 필드 표시
- `aria-label`을 통한 명확한 기능 설명

## 6. PropTypes를 활용한 타입 검증

```javascript
import PropTypes from 'prop-types';

TodoInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
```

**PropTypes의 장점:**
- 컴포넌트 사용법 명시
- 개발 시 타입 에러 조기 발견
- 코드 문서화 효과

## 7. 실습 과제

### 과제 1: 기본 입력 컴포넌트 만들기
```javascript
// SimpleInput.js 파일을 생성하고 다음 기능 구현
function SimpleInput() {
  // useState를 사용해서 입력값 관리
  // 제출 시 콘솔에 값 출력
  // 제출 후 입력 필드 초기화
}
```

### 과제 2: 유효성 검사 추가
```javascript
function TodoInputWithValidation({ onSubmit }) {
  // 최소 3글자 이상 입력 검증
  // 공백만 입력된 경우 처리
  // 중복 할 일 체크 (선택사항)
}
```

### 과제 3: 엔터키 처리
```javascript
function handleKeyPress(event) {
  // 엔터키 눌렀을 때 폼 제출
  // Shift + Enter는 줄바꿈 (textarea 사용 시)
}
```

## 8. 일반적인 에러와 해결법

### 에러 1: 무한 리렌더링
```javascript
// 잘못된 예
<input onChange={setTitle} />

// 올바른 예
<input onChange={(e) => setTitle(e.target.value)} />
```

### 에러 2: 제출 후 페이지 새로고침
```javascript
function handleSubmit(event) {
  // 반드시 preventDefault() 호출
  event.preventDefault();
  // ...
}
```

### 에러 3: 빈 값 제출
```javascript
function handleSubmit(event) {
  event.preventDefault();
  
  // trim()을 사용해서 공백 제거
  if (!title.trim()) {
    return;
  }
  // ...
}
```

## 9. 성능 최적화 팁

### useCallback 활용
```javascript
import { useState, useCallback } from 'react';

function TodoInput({ onSubmit }) {
  const [title, setTitle] = useState('');
  
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({ title, completed: false });
    setTitle('');
  }, [title, onSubmit]);
  
  // ...
}
```

## 10. 테스트 고려사항

```javascript
// 테스트해야 할 시나리오
// 1. 텍스트 입력 시 상태 업데이트
// 2. 폼 제출 시 onSubmit 호출
// 3. 빈 값 제출 시 에러 처리
// 4. 제출 후 입력 필드 초기화
```

## 요약

이번 장에서는 TodoInput 컴포넌트를 통해 다음 개념들을 학습했습니다:

1. **제어 컴포넌트**: React 상태로 폼 입력 관리
2. **이벤트 처리**: onChange, onSubmit 핸들러
3. **유효성 검사**: 입력값 검증과 에러 처리
4. **Props 통신**: 부모-자식 컴포넌트 간 데이터 전달
5. **접근성**: aria 속성을 통한 사용성 개선

## 다음 장 미리보기

다음 장에서는 TodoList 컴포넌트를 분석하며 다음 내용을 학습합니다:
- 배열 데이터 렌더링
- map() 함수를 활용한 리스트 표시
- key prop의 중요성
- 조건부 렌더링
- 빈 리스트 처리

---

💡 **추가 학습 자료**
- [React 공식 문서 - 폼](https://react.dev/reference/react-dom/components/form)
- [React 공식 문서 - 제어 컴포넌트](https://react.dev/reference/react-dom/components/input)
- [MDN - 폼 유효성 검사](https://developer.mozilla.org/ko/docs/Web/Guide/HTML/Constraint_validation)

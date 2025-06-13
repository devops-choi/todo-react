# 시험 3: React 컴포넌트와 상태 관리 (챕터 9-12)

**시험 시간**: 75분  
**만점**: 100점  
**총 문항**: 25문항

---

## 📝 문제 유형별 배점
- 객관식 (5지선다): 각 3점 × 10문항 = 30점
- 주관식 (단답형): 각 4점 × 7문항 = 28점
- 빈칸 채우기: 각 3점 × 4문항 = 12점
- 코딩 문제: 각 15점 × 2문항 = 30점

---

## 📋 객관식 문제 (3점 × 10문항 = 30점)

### 1. React에서 useState Hook의 반환값은?
① 상태값만 반환
② 상태 업데이트 함수만 반환
③ [상태값, 상태 업데이트 함수] 배열 반환
④ {value, setValue} 객체 반환
⑤ 아무것도 반환하지 않음

### 2. 제어 컴포넌트(Controlled Component)의 특징으로 올바른 것은?
① DOM에서 직접 값을 읽어온다
② React 상태로 입력값을 관리한다
③ ref를 사용해서 값에 접근한다
④ defaultValue를 사용한다
⑤ 상태 관리가 필요하지 않다

### 3. React에서 배열을 렌더링할 때 key prop이 필요한 이유는?
① 스타일링을 위해서
② Virtual DOM 최적화를 위해서
③ 이벤트 처리를 위해서
④ 타입 검증을 위해서
⑤ 코드 가독성을 위해서

### 4. 다음 중 올바른 이벤트 핸들러 작성 방법은?
① `<button onClick="handleClick()">`
② `<button onClick={handleClick()}>`
③ `<button onClick={handleClick}>`
④ `<button on-click={handleClick}>`
⑤ `<button click={handleClick}>`

### 5. PropTypes를 사용하는 주된 목적은?
① 런타임 성능 향상
② 컴포넌트 props 타입 검증
③ 스타일 적용
④ 상태 관리
⑤ 라우팅 설정

### 6. React.memo의 역할은?
① 상태를 기억하는 Hook
② 컴포넌트 리렌더링 최적화
③ 메모리 관리
④ 이벤트 처리
⑤ 라이프사이클 관리

### 7. CSS 모듈을 사용할 때의 장점은?
① 전역 스타일 적용
② 클래스명 충돌 방지
③ 파일 크기 감소
④ 런타임 성능 향상
⑤ 브라우저 호환성 개선

### 8. 조건부 렌더링에서 논리 AND 연산자(&&)를 사용할 때 주의사항은?
① 항상 true를 반환해야 함
② falsy 값이 렌더링될 수 있음
③ 문자열만 사용할 수 있음
④ 숫자를 사용할 수 없음
⑤ 함수 호출이 불가능함

### 9. useCallback Hook을 사용하는 목적은?
① 상태 관리
② 함수 메모이제이션
③ DOM 조작
④ 라이프사이클 관리
⑤ 에러 처리

### 10. React에서 접근성(Accessibility)을 위해 사용하는 속성은?
① class와 id
② aria-label과 role
③ data-*와 key
④ ref와 props
⑤ style과 className

---

## ✏️ 주관식 문제 (4점 × 7문항 = 28점)

### 11. useState Hook을 사용하여 초기값이 0인 count 상태를 선언하는 코드를 작성하세요.
**답안**: _________________

### 12. 배열을 map() 함수로 렌더링할 때 key prop을 설정하는 이유를 설명하세요.
**답안**: _________________

### 13. 제어 컴포넌트와 비제어 컴포넌트의 차이점을 간단히 설명하세요.
**답안**: _________________

### 14. React에서 이벤트 객체의 preventDefault() 메서드를 사용하는 목적을 작성하세요.
**답안**: _________________

### 15. CSS 모듈에서 조건부 클래스명을 적용하는 방법을 코드로 작성하세요.
**답안**: _________________

### 16. PropTypes에서 필수 prop을 지정하는 방법을 작성하세요.
**답안**: _________________

### 17. React에서 컴포넌트 간 데이터를 전달하는 주요 방법 두 가지를 작성하세요.
**답안**: _________________

---

## 📝 빈칸 채우기 (3점 × 4문항 = 12점)

### 18. React에서 폼 제출을 방지하려면 이벤트 객체의 `______()` 메서드를 호출합니다.

### 19. 배열을 렌더링할 때 각 요소는 고유한 `______` prop을 가져야 합니다.

### 20. 컴포넌트의 props가 변경되지 않으면 리렌더링을 방지하는 React 함수는 `______` 입니다.

### 21. CSS 모듈을 import할 때 일반적으로 사용하는 변수명은 `______` 입니다.

---

## 💻 코딩 문제 (15점 × 2문항 = 30점)

### 22. 다음 요구사항에 맞는 TodoInput 컴포넌트를 작성하세요. (15점)

**요구사항**:
- useState를 사용하여 입력값 관리
- 폼 제출 시 빈 값 검증
- 제출 후 입력 필드 초기화
- onSubmit prop으로 부모에게 데이터 전달

**답안 작성란**:
```javascript
import React, { useState } from 'react';

function TodoInput({ onSubmit }) {
  // 여기에 코드를 작성하세요







}

export default TodoInput;
```

**평가 기준**:
- useState 올바른 사용 (3점)
- 이벤트 핸들러 구현 (4점)
- 폼 검증 로직 (3점)
- 컴포넌트 구조 (3점)
- PropTypes 정의 (2점)

### 23. 다음 TodoList 컴포넌트에서 발생할 수 있는 문제점을 찾고 수정된 코드를 작성하세요. (15점)

**문제가 있는 코드**:
```javascript
function TodoList({ items, onToggle, onDelete }) {
  return (
    <ul>
      {items.map((item, index) => (
        <TodoItem
          todo={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
```

**문제점**: _________________

**수정된 코드**:
```javascript
function TodoList({ items, onToggle, onDelete }) {
  // 여기에 수정된 코드를 작성하세요







}
```

**평가 기준**:
- 문제점 정확한 식별 (5점)
- key prop 추가 (4점)
- 빈 배열 처리 (3점)
- PropTypes 정의 (3점)

---

## 🔧 디버깅 문제 (보너스 5점)

### 다음 코드에서 문제점을 찾아 수정하세요.

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+2</button>
    </div>
  );
}
```

**문제점**: _________________  
**수정 방법**: _________________

---

## 🔍 정답 및 해설

### 객관식 정답
1. ③ 2. ② 3. ② 4. ③ 5. ② 6. ② 7. ② 8. ② 9. ② 10. ②

### 주관식 정답
11. `const [count, setCount] = useState(0);`
12. React가 Virtual DOM을 효율적으로 비교하고 업데이트하기 위해
13. 제어 컴포넌트는 React 상태로 값을 관리하고, 비제어 컴포넌트는 DOM에서 직접 값을 읽음
14. 기본 브라우저 동작(페이지 새로고침 등)을 방지하기 위해
15. `className={\`\${styles.base} \${condition ? styles.active : ''}\`}`
16. `PropTypes.string.isRequired`
17. props, context (또는 상태 끌어올리기, callback)

### 빈칸 채우기 정답
18. preventDefault
19. key
20. React.memo
21. styles

### 코딩 문제 모범답안
22. 
```javascript
function TodoInput({ onSubmit }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }
    onSubmit({ title, completed: false });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
}
```

23. 
**문제점**: key prop 누락, 빈 배열 처리 없음
**수정된 코드**:
```javascript
function TodoList({ items = [], onToggle, onDelete }) {
  if (items.length === 0) {
    return <p>할 일이 없습니다.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          todo={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
```

### 디버깅 문제 정답
**문제점**: 상태 업데이트가 비동기적이어서 같은 값으로 두 번 설정됨
**수정 방법**: `setCount(prev => prev + 1);` 함수형 업데이트 사용

---

**시험 종료 후 체크리스트**:
- [ ] 모든 코드의 문법 확인
- [ ] import 문과 export 문 확인
- [ ] 함수명과 변수명 확인
- [ ] 중괄호와 괄호 짝 맞추기 확인

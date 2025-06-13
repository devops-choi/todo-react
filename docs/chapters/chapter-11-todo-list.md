# Chapter 11: TodoList.js - 리스트 컴포넌트

## 학습 목표
- React에서 배열 데이터 렌더링 방법 학습
- map() 함수를 활용한 리스트 생성
- key prop의 중요성과 사용법
- 조건부 렌더링 구현
- 빈 상태(Empty State) 처리
- 컴포넌트 합성(Composition) 패턴

## 사전 준비사항
- JavaScript 배열 메서드 (map, filter)
- React 컴포넌트 기초
- Props 전달 방법

---

## 1. TodoList 컴포넌트 개요

TodoList 컴포넌트는 할 일 목록을 표시하는 역할을 담당합니다. 개별 할 일 항목들을 렌더링하고, 빈 목록 상태도 처리합니다.

### 핵심 기능
- 할 일 배열을 리스트로 렌더링
- 빈 목록일 때 안내 메시지 표시
- 각 할 일 항목에 이벤트 핸들러 전달
- 접근성을 고려한 마크업

## 2. 코드 분석

### 전체 코드 구조
```javascript
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList({ items, onToggle, onDelete }) {
  // 빈 목록 처리
  if (!items || items.length === 0) {
    return (
      <div className={styles.todoList} role="region" aria-label="할 일 목록">
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">📝</div>
          <p aria-live="polite">
            아직 할 일이 없습니다.
            <br />
            새로운 할 일을 추가해보세요!
          </p>
        </div>
      </div>
    );
  }

  // 할 일 목록 렌더링
  return (
    <ul className={styles.todoList} aria-label="할 일 목록">
      {items.map((todo, index) => (
        <TodoItem
          key={todo.id || index}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
```

## 3. 주요 개념 설명

### 3.1 배열 렌더링과 map() 함수

```javascript
// JavaScript map() 함수 기본 개념
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number * 2);
// 결과: [2, 4, 6, 8, 10]

// React에서 배열 렌더링
const items = [
  { id: 1, title: '공부하기', completed: false },
  { id: 2, title: '운동하기', completed: true }
];

return (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.title}</li>
    ))}
  </ul>
);
```

### 3.2 key prop의 중요성

```javascript
// 잘못된 예 - key 없음
{items.map(item => (
  <TodoItem todo={item} /> // Warning: key prop 누락
))}

// 올바른 예 - 고유한 key 사용
{items.map((item, index) => (
  <TodoItem
    key={item.id || index} // 고유한 값을 key로 사용
    todo={item}
  />
))}
```

**key가 중요한 이유:**
- React의 Virtual DOM 비교 알고리즘 최적화
- 컴포넌트 상태 보존
- 리스트 항목의 올바른 업데이트

### 3.3 key 선택 가이드라인

```javascript
// 1순위: 고유한 ID 사용 (추천)
key={item.id}

// 2순위: 고유한 속성 조합
key={`${item.title}-${item.createdAt}`}

// 3순위: 배열 인덱스 (비추천 - 순서 변경 시 문제)
key={index}
```

### 3.4 조건부 렌더링

```javascript
function TodoList({ items }) {
  // 조건부 렌더링 - 빈 목록 체크
  if (!items || items.length === 0) {
    return <EmptyState />;
  }
  
  return <TodoItems items={items} />;
}

// 삼항 연산자를 사용한 조건부 렌더링
function TodoList({ items }) {
  return (
    <div>
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <TodoItems items={items} />
      )}
    </div>
  );
}

// && 연산자를 사용한 조건부 렌더링
function TodoList({ items }) {
  return (
    <div>
      {items.length === 0 && <EmptyState />}
      {items.length > 0 && <TodoItems items={items} />}
    </div>
  );
}
```

### 3.5 컴포넌트 합성 (Composition)

```javascript
// TodoList는 개별 TodoItem들을 조합
function TodoList({ items, onToggle, onDelete }) {
  return (
    <ul>
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}  // 이벤트 핸들러 전달
          onDelete={onDelete}  // 이벤트 핸들러 전달
        />
      ))}
    </ul>
  );
}
```

## 4. 빈 상태(Empty State) 처리

### 사용자 경험을 고려한 빈 상태
```javascript
function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon} aria-hidden="true">📝</div>
      <p aria-live="polite">
        아직 할 일이 없습니다.
        <br />
        새로운 할 일을 추가해보세요!
      </p>
    </div>
  );
}
```

**빈 상태 디자인 고려사항:**
- 명확한 안내 메시지
- 시각적 아이콘 또는 일러스트
- 다음 행동 유도 (Call-to-Action)
- 긍정적인 톤앤매너

## 5. 접근성 (Accessibility) 개선

### 시맨틱 마크업
```javascript
// 의미론적 HTML 요소 사용
<ul className={styles.todoList} aria-label="할 일 목록">
  {/* 리스트 항목들 */}
</ul>

// role과 aria 속성 활용
<div className={styles.todoList} role="region" aria-label="할 일 목록">
  <div className={styles.emptyState}>
    <p aria-live="polite">아직 할 일이 없습니다.</p>
  </div>
</div>
```

**접근성 속성 설명:**
- `aria-label`: 스크린 리더를 위한 영역 설명
- `aria-live="polite"`: 내용 변경 시 스크린 리더에 알림
- `aria-hidden="true"`: 장식용 요소를 스크린 리더에서 숨김

## 6. CSS 스타일링 분석

### 리스트 기본 스타일
```css
.todoList {
  list-style: none;        /* 기본 점 제거 */
  padding: 0;              /* 기본 패딩 제거 */
  margin: 0;               /* 기본 마진 제거 */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;        /* 자식 요소 경계 정리 */
  backdrop-filter: blur(10px); /* 배경 블러 효과 */
}
```

### 빈 상태 스타일
```css
.emptyState {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

.emptyIcon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
```

### 반응형 디자인
```css
@media (max-width: 768px) {
  .todoList {
    margin: 0 1rem;
  }
}
```

## 7. PropTypes 정의

```javascript
TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
```

**PropTypes 분석:**
- `PropTypes.arrayOf()`: 배열 타입 검증
- `PropTypes.shape()`: 객체 구조 검증
- `PropTypes.oneOfType()`: 여러 타입 허용
- `.isRequired`: 필수 prop 지정

## 8. 실습 과제

### 과제 1: 기본 리스트 컴포넌트
```javascript
// SimpleList.js 만들기
function SimpleList({ items }) {
  // 문자열 배열을 받아서 리스트로 렌더링
  // 예: ['사과', '바나나', '오렌지']
}
```

### 과제 2: 필터링 기능 추가
```javascript
function FilterableList({ items, filter }) {
  // filter 값에 따라 항목 필터링
  // 'all', 'completed', 'active' 상태 지원
  
  const filteredItems = items.filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'active') return !item.completed;
    return true; // 'all'
  });
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

### 과제 3: 가상화된 리스트 (고급)
```javascript
// 많은 데이터를 효율적으로 렌더링
function VirtualizedList({ items, itemHeight = 50 }) {
  // react-window나 react-virtualized 사용
  // 화면에 보이는 항목만 렌더링
}
```

## 9. 성능 최적화

### React.memo 사용
```javascript
import React from 'react';

const TodoList = React.memo(function TodoList({ items, onToggle, onDelete }) {
  // props가 변경되지 않으면 리렌더링 방지
  return (
    <ul>
      {items.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </ul>
  );
});
```

### useMemo로 필터링 최적화
```javascript
import { useMemo } from 'react';

function TodoList({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // 복잡한 필터링 로직
    });
  }, [items, filter]);
  
  return <ul>{/* 렌더링 */}</ul>;
}
```

## 10. 일반적인 에러와 해결법

### 에러 1: key prop 경고
```javascript
// 에러 원인
{items.map(item => <TodoItem todo={item} />)}

// 해결책
{items.map(item => <TodoItem key={item.id} todo={item} />)}
```

### 에러 2: undefined 배열 접근
```javascript
// 에러 방지
function TodoList({ items = [] }) {
  // items가 undefined일 때 기본값 사용
}

// 또는 조건부 렌더링
if (!items) return null;
```

### 에러 3: 중복 key 값
```javascript
// 문제: 동일한 key 값
items.map((item, index) => <li key={item.title}>...</li>)

// 해결: 고유한 key 생성
items.map((item, index) => <li key={`${item.title}-${index}`}>...</li>)
```

## 요약

이번 장에서는 TodoList 컴포넌트를 통해 다음 개념들을 학습했습니다:

1. **배열 렌더링**: map() 함수를 활용한 리스트 생성
2. **key prop**: React의 효율적인 리렌더링을 위한 고유 식별자
3. **조건부 렌더링**: 빈 목록 상태 처리
4. **컴포넌트 합성**: 개별 컴포넌트들을 조합하여 복합 UI 구성
5. **접근성**: 스크린 리더와 키보드 사용자를 위한 마크업

## 다음 장 미리보기

다음 장에서는 TodoItem 컴포넌트를 분석하며 다음 내용을 학습합니다:
- 개별 할 일 항목 렌더링
- 체크박스와 삭제 버튼 구현
- 이벤트 핸들링과 상태 변경
- 조건부 스타일링
- 사용자 인터랙션 처리

---

💡 **추가 학습 자료**
- [React 공식 문서 - 리스트와 key](https://react.dev/learn/rendering-lists)
- [React 공식 문서 - 조건부 렌더링](https://react.dev/learn/conditional-rendering)
- [MDN - Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

# Chapter 12: TodoItem.js - 개별 할 일 항목 컴포넌트

## 학습 목표
- 개별 데이터 항목을 렌더링하는 컴포넌트 설계
- 체크박스와 버튼 이벤트 처리
- 조건부 스타일링 구현
- 콜백 함수를 통한 부모-자식 통신
- 사용자 인터랙션 최적화

## 사전 준비사항
- React 이벤트 핸들링
- 조건부 클래스명 적용
- CSS 모듈 사용법

---

## 1. TodoItem 컴포넌트 개요

TodoItem 컴포넌트는 개별 할 일 항목을 표시하고 사용자가 상호작용할 수 있는 UI를 제공합니다.

### 핵심 기능
- 할 일 제목 표시
- 완료 상태 체크박스
- 삭제 버튼 제공
- 완료된 항목의 시각적 구분
- 접근성을 고려한 마크업

## 2. 코드 분석

### 전체 코드 구조
```javascript
import PropTypes from 'prop-types';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={styles.todoItem}>
      {/* 완료 상태 체크박스 */}
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} 완료 상태 토글`}
      />
      
      {/* 할 일 제목 */}
      <span
        className={`${styles.title} ${todo.completed ? styles.completed : ''}`}
        aria-label={`할 일: ${todo.title}`}
      >
        {todo.title}
      </span>
      
      {/* 삭제 버튼 */}
      <button 
        className={styles.deleteButton} 
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.title} 삭제`}
      >
        삭제
      </button>
    </li>
  );
}
```

## 3. 주요 개념 설명

### 3.1 체크박스 상태 관리

```javascript
// 제어 컴포넌트로 체크박스 구현
<input
  type="checkbox"
  checked={todo.completed}        // 현재 상태 반영
  onChange={() => onToggle(todo.id)} // 상태 변경 함수 호출
/>
```

**체크박스 동작 원리:**
1. `checked` 속성으로 현재 상태 표시
2. `onChange` 이벤트로 상태 변경 감지
3. 부모 컴포넌트의 `onToggle` 함수 호출
4. todo.id를 전달하여 어떤 항목인지 식별

### 3.2 조건부 클래스명 적용

```javascript
// 조건부 클래스명 결합
className={`${styles.title} ${todo.completed ? styles.completed : ''}`}

// 더 깔끔한 방법 (classnames 라이브러리 사용)
import classNames from 'classnames';

className={classNames(styles.title, {
  [styles.completed]: todo.completed
})}

// 직접 구현한 헬퍼 함수
function combineClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

className={combineClasses(
  styles.title,
  todo.completed && styles.completed
)}
```

### 3.3 이벤트 핸들러와 콜백 패턴

```javascript
// 부모 컴포넌트에서 정의된 함수들
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      {/* 체크박스 토글 */}
      <input onChange={() => onToggle(todo.id)} />
      
      {/* 삭제 버튼 */}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

// 부모 컴포넌트에서 사용
function TodoContainer() {
  const handleToggle = (id) => {
    // todo 상태 업데이트 로직
  };
  
  const handleDelete = (id) => {
    // todo 삭제 로직
  };
  
  return (
    <TodoItem
      todo={todo}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  );
}
```

### 3.4 화살표 함수 vs 일반 함수 패턴

```javascript
// 화살표 함수 (현재 사용)
onChange={() => onToggle(todo.id)}
onClick={() => onDelete(todo.id)}

// 바인딩된 함수 (대안)
onChange={onToggle.bind(null, todo.id)}
onClick={onDelete.bind(null, todo.id)}

// useCallback을 사용한 최적화
const handleToggle = useCallback(() => {
  onToggle(todo.id);
}, [onToggle, todo.id]);

const handleDelete = useCallback(() => {
  onDelete(todo.id);
}, [onDelete, todo.id]);
```

## 4. 접근성 (Accessibility) 구현

### ARIA 레이블 사용
```javascript
// 체크박스 접근성
<input
  type="checkbox"
  checked={todo.completed}
  onChange={() => onToggle(todo.id)}
  aria-label={`${todo.title} 완료 상태 토글`}
/>

// 할 일 제목 접근성
<span aria-label={`할 일: ${todo.title}`}>
  {todo.title}
</span>

// 삭제 버튼 접근성
<button 
  onClick={() => onDelete(todo.id)}
  aria-label={`${todo.title} 삭제`}
>
  삭제
</button>
```

### 키보드 내비게이션
```javascript
function TodoItem({ todo, onToggle, onDelete }) {
  const handleKeyPress = (event) => {
    // 스페이스바로 토글
    if (event.key === ' ') {
      event.preventDefault();
      onToggle(todo.id);
    }
    // Delete 키로 삭제
    if (event.key === 'Delete') {
      onDelete(todo.id);
    }
  };

  return (
    <li 
      className={styles.todoItem}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      {/* 컴포넌트 내용 */}
    </li>
  );
}
```

## 5. CSS 스타일링 분석

### 기본 레이아웃
```css
.todoItem {
  display: flex;           /* 가로 배치 */
  align-items: center;     /* 세로 중앙 정렬 */
  padding: 1.5rem 2rem;    /* 내부 여백 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); /* 구분선 */
  transition: all 0.3s ease; /* 부드러운 전환 */
  background: rgba(255, 255, 255, 0.8); /* 반투명 배경 */
}
```

### 호버 효과
```css
.todoItem:hover {
  background: rgba(255, 255, 255, 1); /* 불투명 배경 */
  transform: translateX(5px);          /* 오른쪽으로 이동 */
}
```

### 체크박스 스타일링
```css
.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  accent-color: #667eea;  /* 브라우저 기본 체크박스 색상 */
  cursor: pointer;
  transform: scale(1.2);  /* 크기 확대 */
}
```

### 완료된 항목 스타일
```css
.title {
  flex: 1;                /* 남은 공간 차지 */
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  transition: all 0.3s ease;
}

.title.completed {
  text-decoration: line-through; /* 취소선 */
  color: #999;                   /* 회색 글자 */
  opacity: 0.7;                  /* 투명도 조절 */
}
```

### 삭제 버튼 스타일
```css
.deleteButton {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.deleteButton:hover {
  transform: translateY(-2px);   /* 위로 이동 */
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4); /* 그림자 확대 */
}
```

## 6. 반응형 디자인

```css
@media (max-width: 768px) {
  .todoItem {
    padding: 1rem;         /* 모바일에서 패딩 줄임 */
    flex-wrap: wrap;       /* 필요시 줄바꿈 */
    gap: 0.5rem;          /* 요소 간 간격 */
  }

  .title {
    font-size: 1rem;       /* 글자 크기 축소 */
  }

  .deleteButton {
    font-size: 0.8rem;     /* 버튼 글자 크기 축소 */
    min-width: 70px;       /* 최소 너비 설정 */
  }
}
```

## 7. 실습 과제

### 과제 1: 편집 기능 추가
```javascript
function TodoItemWithEdit({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEdit = () => {
    // 편집 모드 구현
  };

  const handleSave = () => {
    // 저장 로직 구현
  };

  return (
    <li className={styles.todoItem}>
      {isEditing ? (
        <input 
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {todo.title}
        </span>
      )}
    </li>
  );
}
```

### 과제 2: 우선순위 기능
```javascript
function TodoItemWithPriority({ todo, onToggle, onDelete, onPriorityChange }) {
  const priorities = ['low', 'medium', 'high'];
  
  return (
    <li className={styles.todoItem}>
      <select 
        value={todo.priority}
        onChange={(e) => onPriorityChange(todo.id, e.target.value)}
      >
        {priorities.map(priority => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      {/* 기존 요소들 */}
    </li>
  );
}
```

### 과제 3: 애니메이션 효과
```javascript
import { motion } from 'framer-motion';

function AnimatedTodoItem({ todo, onToggle, onDelete }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={styles.todoItem}
    >
      {/* 컴포넌트 내용 */}
    </motion.li>
  );
}
```

## 8. 성능 최적화

### React.memo 사용
```javascript
import React from 'react';

const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={styles.todoItem}>
      {/* 컴포넌트 내용 */}
    </li>
  );
});

// 커스텀 비교 함수
const TodoItem = React.memo(function TodoItem(props) {
  // ...
}, (prevProps, nextProps) => {
  return prevProps.todo.id === nextProps.todo.id &&
         prevProps.todo.title === nextProps.todo.title &&
         prevProps.todo.completed === nextProps.todo.completed;
});
```

### useCallback으로 함수 최적화
```javascript
// 부모 컴포넌트에서
const handleToggle = useCallback((id) => {
  setTodos(todos => 
    todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
}, []);

const handleDelete = useCallback((id) => {
  setTodos(todos => todos.filter(todo => todo.id !== id));
}, []);
```

## 9. 일반적인 에러와 해결법

### 에러 1: 이벤트 핸들러 무한 호출
```javascript
// 잘못된 예
<button onClick={onDelete(todo.id)}>삭제</button>

// 올바른 예
<button onClick={() => onDelete(todo.id)}>삭제</button>
```

### 에러 2: 클래스명 결합 오류
```javascript
// 잘못된 예
className={styles.title + todo.completed ? styles.completed : ''}

// 올바른 예
className={`${styles.title} ${todo.completed ? styles.completed : ''}`}
```

### 에러 3: PropTypes 타입 불일치
```javascript
// PropTypes 정의와 실제 props가 일치해야 함
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
```

## 10. 테스트 시나리오

```javascript
// Jest + React Testing Library 예시
describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    completed: false
  };

  test('renders todo title', () => {
    render(<TodoItem todo={mockTodo} onToggle={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('calls onToggle when checkbox is clicked', () => {
    const mockToggle = jest.fn();
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={jest.fn()} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', () => {
    const mockDelete = jest.fn();
    render(<TodoItem todo={mockTodo} onToggle={jest.fn()} onDelete={mockDelete} />);
    
    fireEvent.click(screen.getByText('삭제'));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
```

## 요약

이번 장에서는 TodoItem 컴포넌트를 통해 다음 개념들을 학습했습니다:

1. **개별 항목 렌더링**: 데이터를 UI로 변환하는 방법
2. **이벤트 처리**: 체크박스와 버튼 클릭 처리
3. **조건부 스타일링**: 상태에 따른 시각적 변화
4. **콜백 패턴**: 부모-자식 컴포넌트 간 통신
5. **접근성**: 모든 사용자를 위한 인터페이스 설계

## 다음 장 미리보기

다음 장에서는 todoService/index.js를 분석하며 다음 내용을 학습합니다:
- 서비스 레이어 아키텍처
- 비즈니스 로직 분리
- API 통신 추상화
- 에러 처리 패턴
- 모듈 설계 원칙

---

💡 **추가 학습 자료**
- [React 공식 문서 - 이벤트 처리](https://react.dev/learn/responding-to-events)
- [MDN - ARIA 레이블](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [CSS 공식 문서 - Flexbox](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout)

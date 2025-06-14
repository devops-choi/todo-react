# Chapter 9: TodoContainer.js - 컨테이너 컴포넌트

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 8: src/App.js - 메인 애플리케이션 컴포넌트](./chapter-08-app-js.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 10: TodoInput.js - 입력 컴포넌트](./chapter-10-todo-input.md)

---

## 📚 학습 목표
- 컨테이너 컴포넌트 패턴의 이해와 적용
- Todo 앱의 핵심 비즈니스 로직 구현
- 상태 관리와 데이터 흐름 설계
- 하위 컴포넌트들과의 효과적인 통신 방법

## 🔗 필요한 사전 지식
- Chapter 4: React Hooks (useState, useEffect)
- Chapter 8: App 컴포넌트 구조
- JavaScript 배열 메서드와 비동기 처리

---

## 1. 컨테이너 컴포넌트 패턴

**컨테이너 컴포넌트(Container Component)**는 비즈니스 로직과 상태 관리를 담당하는 컴포넌트입니다.

### 1.1 컨테이너 vs 프레젠테이션 컴포넌트
```javascript
// 컨테이너 컴포넌트 - 로직 담당
function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  const addTodo = (text) => {
    // 비즈니스 로직
  };
  
  return (
    <div>
      <TodoInput onSubmit={addTodo} />
      <TodoList todos={filteredTodos} />
    </div>
  );
}

// 프레젠테이션 컴포넌트 - UI 담당
function TodoInput({ onSubmit }) {
  const [text, setText] = useState('');
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(text); }}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </form>
  );
}
```

---

## 2. 우리 프로젝트의 TodoContainer 분석

```javascript
import { useState, useEffect } from 'react';
import TodoAPI from '../services/todoService';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import styles from './TodoContainer.module.css';

function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  async function handleCreateTodo(data) {
    await TodoAPI.createTodoItem(data);
    await handleReloadTodos();
  }

  async function handleReloadTodos() {
    const data = await TodoAPI.selectTodoList();
    setTodos(data);
  }

  async function handleToggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await TodoAPI.updateTodoItem(id, updatedTodo);
      await handleReloadTodos();
    }
  }

  async function handleDeleteTodo(id) {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      await TodoAPI.deleteTodoItem(id);
      await handleReloadTodos();
    }
  }

  // 필터링된 할 일 목록
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 통계 계산
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = totalCount - completedCount;

  useEffect(() => {
    handleReloadTodos().catch(error => {
      console.error('Failed to load todos:', error);
    });
  }, []);

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <h1 className={styles.title}>📝 Todo App</h1>
        <p className={styles.subtitle}>오늘 할 일을 정리해보세요</p>
      </header>

      {/* 통계 */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{totalCount}</span>
          <span className={styles.statLabel}>전체</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{activeCount}</span>
          <span className={styles.statLabel}>진행중</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{completedCount}</span>
          <span className={styles.statLabel}>완료</span>
        </div>
      </div>

      {/* 필터 */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          전체
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => setFilter('active')}
        >
          진행중
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
        >
          완료
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <main className={styles.main}>
        <TodoInput onSubmit={handleCreateTodo} />
        <TodoList
          items={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </main>
    </div>
  );
}

export default TodoContainer;
```

---

## 3. 상태 관리 전략

### 3.1 상태 구조 설계
```javascript
// 단순한 상태 구조
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState('all');

// 복잡한 상태 구조 (useReducer 사용 시)
const initialState = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TODOS_START':
      return { ...state, loading: true, error: null };
    case 'LOAD_TODOS_SUCCESS':
      return { ...state, loading: false, todos: action.payload };
    case 'LOAD_TODOS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

### 3.2 비동기 상태 관리
```javascript
function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsyncOperation = async (operation) => {
    try {
      setLoading(true);
      setError(null);
      await operation();
    } catch (err) {
      setError(err.message);
      console.error('Operation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (data) => {
    await handleAsyncOperation(async () => {
      await TodoAPI.createTodoItem(data);
      await loadTodos();
    });
  };

  const loadTodos = async () => {
    const data = await TodoAPI.selectTodoList();
    setTodos(data);
  };

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>처리 중...</div>}
      {error && <div className={styles.error}>오류: {error}</div>}
      {/* ... 나머지 JSX */}
    </div>
  );
}
```

---

## 4. 비즈니스 로직 구현

### 4.1 CRUD 연산 핸들러
```javascript
// Create - 할 일 추가
const handleCreateTodo = async (text) => {
  if (!text.trim()) {
    alert('할 일을 입력해주세요.');
    return;
  }

  const newTodo = {
    text: text.trim(),
    completed: false
  };

  try {
    await TodoAPI.createTodoItem(newTodo);
    await loadTodos();
  } catch (error) {
    alert('할 일 추가에 실패했습니다.');
  }
};

// Read - 할 일 목록 조회
const loadTodos = async () => {
  try {
    const data = await TodoAPI.selectTodoList();
    setTodos(data);
  } catch (error) {
    console.error('할 일 목록 로드 실패:', error);
    setTodos([]);
  }
};

// Update - 할 일 수정
const handleToggleTodo = async (id) => {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const updatedTodo = {
    ...todo,
    completed: !todo.completed
  };

  try {
    await TodoAPI.updateTodoItem(id, updatedTodo);
    
    // 낙관적 업데이트
    setTodos(prev => prev.map(t => 
      t.id === id ? updatedTodo : t
    ));
  } catch (error) {
    console.error('할 일 업데이트 실패:', error);
    // 롤백
    await loadTodos();
  }
};

// Delete - 할 일 삭제
const handleDeleteTodo = async (id) => {
  if (!window.confirm('정말로 삭제하시겠습니까?')) {
    return;
  }

  try {
    await TodoAPI.deleteTodoItem(id);
    
    // 낙관적 업데이트
    setTodos(prev => prev.filter(t => t.id !== id));
  } catch (error) {
    console.error('할 일 삭제 실패:', error);
    // 롤백
    await loadTodos();
  }
};
```

### 4.2 필터링과 정렬
```javascript
// 필터링 로직
const getFilteredTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

// 정렬 로직
const getSortedTodos = (todos, sortBy = 'created') => {
  return [...todos].sort((a, b) => {
    switch (sortBy) {
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'alphabetical':
        return a.text.localeCompare(b.text);
      case 'completed':
        return a.completed - b.completed;
      default:
        return 0;
    }
  });
};

// 사용 예시
const filteredAndSortedTodos = useMemo(() => {
  const filtered = getFilteredTodos(todos, filter);
  return getSortedTodos(filtered, sortBy);
}, [todos, filter, sortBy]);
```

---

## 5. 성능 최적화

### 5.1 useMemo와 useCallback 사용
```javascript
import React, { useState, useEffect, useMemo, useCallback } from 'react';

function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // 계산이 복잡한 값은 useMemo로 메모이제이션
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [todos]);

  // 콜백 함수는 useCallback으로 메모이제이션
  const handleCreateTodo = useCallback(async (data) => {
    await TodoAPI.createTodoItem(data);
    const newTodos = await TodoAPI.selectTodoList();
    setTodos(newTodos);
  }, []);

  const handleToggleTodo = useCallback(async (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await TodoAPI.updateTodoItem(id, updatedTodo);
      
      setTodos(prev => prev.map(t => 
        t.id === id ? updatedTodo : t
      ));
    }
  }, [todos]);

  const handleDeleteTodo = useCallback(async (id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      await TodoAPI.deleteTodoItem(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    }
  }, []);

  return (
    <div className={styles.container}>
      <StatsDisplay stats={stats} />
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      <TodoInput onSubmit={handleCreateTodo} />
      <TodoList
        items={filteredTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}
```

### 5.2 컴포넌트 분리와 React.memo
```javascript
// 통계 컴포넌트 분리
const StatsDisplay = React.memo(({ stats }) => {
  return (
    <div className={styles.stats}>
      <StatItem label="전체" count={stats.total} />
      <StatItem label="진행중" count={stats.active} />
      <StatItem label="완료" count={stats.completed} />
    </div>
  );
});

// 개별 통계 항목
const StatItem = React.memo(({ label, count }) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statNumber}>{count}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
});

// 필터 버튼 컴포넌트
const FilterButtons = React.memo(({ filter, onFilterChange }) => {
  const filterOptions = [
    { key: 'all', label: '전체' },
    { key: 'active', label: '진행중' },
    { key: 'completed', label: '완료' }
  ];

  return (
    <div className={styles.filters}>
      {filterOptions.map(option => (
        <button
          key={option.key}
          className={`${styles.filterButton} ${
            filter === option.key ? styles.active : ''
          }`}
          onClick={() => onFilterChange(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});
```

---

## 6. 에러 처리와 사용자 경험

### 6.1 에러 바운더리와 에러 상태
```javascript
function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const withErrorHandling = (asyncFn) => {
    return async (...args) => {
      try {
        setLoading(true);
        setError(null);
        await asyncFn(...args);
      } catch (err) {
        setError({
          message: err.message,
          action: 'retry', // 'retry', 'ignore', 'reload'
          timestamp: Date.now()
        });
      } finally {
        setLoading(false);
      }
    };
  };

  const handleCreateTodo = withErrorHandling(async (data) => {
    await TodoAPI.createTodoItem(data);
    await loadTodos();
  });

  const retryAction = () => {
    setError(null);
    loadTodos();
  };

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorDisplay 
          error={error} 
          onRetry={retryAction}
          onDismiss={() => setError(null)}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {loading && <LoadingSpinner />}
      {/* ... 나머지 컴포넌트 */}
    </div>
  );
}
```

### 6.2 사용자 피드백
```javascript
// 토스트 알림 시스템
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    const toast = { id, message, type };
    
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return { toasts, addToast };
};

function TodoContainer() {
  const { toasts, addToast } = useToast();

  const handleCreateTodo = async (data) => {
    try {
      await TodoAPI.createTodoItem(data);
      await loadTodos();
      addToast('할 일이 추가되었습니다.', 'success');
    } catch (error) {
      addToast('할 일 추가에 실패했습니다.', 'error');
    }
  };

  return (
    <div className={styles.container}>
      {/* ... 기존 컴포넌트들 */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
```

---

## 7. 실습: 고급 기능 추가

### 7.1 다중 선택과 일괄 작업
```javascript
function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectionMode, setSelectionMode] = useState(false);

  const handleSelectTodo = (id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === todos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(todos.map(t => t.id)));
    }
  };

  const handleBulkComplete = async () => {
    const selectedTodos = todos.filter(t => selectedIds.has(t.id));
    const updates = selectedTodos.map(todo => 
      TodoAPI.updateTodoItem(todo.id, { ...todo, completed: true })
    );
    
    await Promise.all(updates);
    await loadTodos();
    setSelectedIds(new Set());
    addToast(`${selectedTodos.length}개 항목이 완료 처리되었습니다.`);
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`${selectedIds.size}개 항목을 삭제하시겠습니까?`)) {
      return;
    }

    const deletes = Array.from(selectedIds).map(id => 
      TodoAPI.deleteTodoItem(id)
    );
    
    await Promise.all(deletes);
    await loadTodos();
    setSelectedIds(new Set());
    addToast(`${selectedIds.size}개 항목이 삭제되었습니다.`);
  };

  return (
    <div className={styles.container}>
      {selectionMode && (
        <div className={styles.selectionControls}>
          <button onClick={handleSelectAll}>
            {selectedIds.size === todos.length ? '전체 해제' : '전체 선택'}
          </button>
          <button onClick={handleBulkComplete} disabled={selectedIds.size === 0}>
            일괄 완료
          </button>
          <button onClick={handleBulkDelete} disabled={selectedIds.size === 0}>
            일괄 삭제
          </button>
          <button onClick={() => {
            setSelectionMode(false);
            setSelectedIds(new Set());
          }}>
            취소
          </button>
        </div>
      )}
      
      <TodoList
        items={filteredTodos}
        selectedIds={selectedIds}
        selectionMode={selectionMode}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onSelect={handleSelectTodo}
      />
    </div>
  );
}
```

---

## 8. 확인 문제

### 문제 1: 상태 관리
Todo 앱에서 관리해야 할 상태들을 나열하고, 각각을 어느 컴포넌트에서 관리해야 하는지 설명하세요.

### 문제 2: 성능 최적화
TodoContainer에서 적용할 수 있는 성능 최적화 기법들을 설명하고 코드로 구현해보세요.

### 문제 3: 에러 처리
API 호출 실패 시 사용자에게 어떤 피드백을 제공해야 하는지 설명하고 구현해보세요.

---

## 9. 다음 챕터 예고

**Chapter 10: TodoInput.js - 입력 컴포넌트**에서는:
- 폼 처리와 입력 검증 구현
- 제어 컴포넌트 vs 비제어 컴포넌트
- 키보드 단축키와 접근성
- 사용자 경험 최적화

컨테이너 컴포넌트의 전체 구조를 이해했다면, 이제 사용자 입력을 담당하는 컴포넌트를 살펴보겠습니다!

---

## 📝 핵심 요약

1. **컨테이너 컴포넌트는 비즈니스 로직과 상태 관리 담당**
2. **useMemo와 useCallback으로 성능 최적화**
3. **에러 처리와 사용자 피드백 중요**
4. **낙관적 업데이트로 사용자 경험 개선**
5. **컴포넌트 분리로 재사용성과 유지보수성 향상**

다음 챕터에서 사용자 입력을 처리하는 컴포넌트를 학습하겠습니다!

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 8: src/App.js - 메인 애플리케이션 컴포넌트](./chapter-08-app-js.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 10: TodoInput.js - 입력 컴포넌트](./chapter-10-todo-input.md)

---

**🎉 Chapter 9 완료! 수고하셨습니다! 🚀**

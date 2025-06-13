# Chapter 20: 성능 최적화와 모범 사례

## 학습 목표
- React 애플리케이션 성능 최적화 기법 습득
- 메모이제이션과 지연 로딩 구현
- 번들 크기 최적화와 코드 스플리팅
- 사용자 경험(UX) 개선 방법
- 코드 품질과 유지보수성 향상
- 프로덕션 환경 모범 사례

## 사전 준비사항
- React 고급 개념 (Hooks, Context)
- 웹 성능 측정 도구 사용법
- 브라우저 개발자 도구 활용

---

## 1. React 성능 최적화 기법

### 1.1 React.memo를 활용한 불필요한 리렌더링 방지

```javascript
// 최적화 전
function TodoItem({ todo, onToggle, onDelete }) {
  console.log('TodoItem 렌더링:', todo.id);
  
  return (
    <li>
      <span>{todo.title}</span>
      <button onClick={() => onToggle(todo.id)}>토글</button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

// 최적화 후
const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log('TodoItem 렌더링:', todo.id);
  
  return (
    <li>
      <span>{todo.title}</span>
      <button onClick={() => onToggle(todo.id)}>토글</button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
});

// 커스텀 비교 함수 사용
const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    // 컴포넌트 내용
  );
}, (prevProps, nextProps) => {
  // true를 반환하면 리렌더링 건너뛰기
  return prevProps.todo.id === nextProps.todo.id &&
         prevProps.todo.title === nextProps.todo.title &&
         prevProps.todo.completed === nextProps.todo.completed;
});
```

### 1.2 useCallback과 useMemo 활용

```javascript
function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // useCallback: 함수 메모이제이션
  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const handleAdd = useCallback((newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, []);

  // useMemo: 계산 결과 메모이제이션
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilter = 
        filter === 'all' ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'active' && !todo.completed);
      
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, searchTerm]);

  const todoStats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [todos]);

  return (
    <div>
      <TodoInput onAdd={handleAdd} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <TodoSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TodoStats stats={todoStats} />
      <TodoList 
        todos={filteredTodos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

### 1.3 Context API 최적화

```javascript
// 문제: 하나의 큰 Context
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');
  
  // 모든 상태가 하나의 Context에 있으면
  // 어떤 상태가 변경되어도 모든 컴포넌트가 리렌더링됨
  
  return (
    <AppContext.Provider value={{ user, todos, theme, setUser, setTodos, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

// 해결: Context 분리
const UserContext = createContext();
const TodoContext = createContext();
const ThemeContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  
  const addTodo = useCallback((todo) => {
    setTodos(prev => [...prev, todo]);
  }, []);
  
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);
  
  const value = useMemo(() => ({
    todos,
    addTodo,
    deleteTodo
  }), [todos, addTodo, deleteTodo]);
  
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}
```

## 2. 코드 스플리팅과 지연 로딩

### 2.1 라우트 기반 코드 스플리팅

```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 지연 로딩으로 컴포넌트 import
const TodoPage = lazy(() => import('./pages/TodoPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<TodoPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

// 로딩 컴포넌트
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>페이지를 불러오는 중...</p>
    </div>
  );
}
```

### 2.2 컴포넌트 기반 지연 로딩

```javascript
// 무거운 컴포넌트를 지연 로딩
const HeavyChart = lazy(() => 
  import('./components/HeavyChart').then(module => ({
    default: module.HeavyChart
  }))
);

const HeavyDataTable = lazy(() => import('./components/HeavyDataTable'));

function AnalyticsPage() {
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <div>
      <h1>분석 페이지</h1>
      
      <button onClick={() => setShowChart(true)}>
        차트 보기
      </button>
      
      <button onClick={() => setShowTable(true)}>
        데이터 테이블 보기
      </button>
      
      {showChart && (
        <Suspense fallback={<div>차트 로딩 중...</div>}>
          <HeavyChart />
        </Suspense>
      )}
      
      {showTable && (
        <Suspense fallback={<div>테이블 로딩 중...</div>}>
          <HeavyDataTable />
        </Suspense>
      )}
    </div>
  );
}
```

### 2.3 라이브러리 동적 import

```javascript
// 무거운 라이브러리를 필요할 때만 로드
async function loadDatePicker() {
  const { default: DatePicker } = await import('react-datepicker');
  return DatePicker;
}

function TodoForm() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [DatePicker, setDatePicker] = useState(null);

  const handleShowDatePicker = async () => {
    if (!DatePicker) {
      const DatePickerComponent = await loadDatePicker();
      setDatePicker(() => DatePickerComponent);
    }
    setShowDatePicker(true);
  };

  return (
    <form>
      <input type="text" placeholder="할 일 제목" />
      
      <button type="button" onClick={handleShowDatePicker}>
        마감일 설정
      </button>
      
      {showDatePicker && DatePicker && (
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
        />
      )}
    </form>
  );
}
```

## 3. 이미지와 자산 최적화

### 3.1 이미지 지연 로딩

```javascript
function LazyImage({ src, alt, className, ...props }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, src]);

  return (
    <div ref={setImageRef} className={className}>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} {...props} />
      ) : (
        <div className="image-placeholder">
          <div className="skeleton-loader"></div>
        </div>
      )}
    </div>
  );
}

// CSS
.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  height: 200px;
  border-radius: 8px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 3.2 Progressive Web App (PWA) 최적화

```javascript
// src/serviceWorker.js
const CACHE_NAME = 'todo-app-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시된 파일이 있으면 반환, 없으면 네트워크 요청
        return response || fetch(event.request);
      })
  );
});

// 백그라운드 동기화
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncTodos());
  }
});

async function syncTodos() {
  // 오프라인 중에 저장된 할 일들을 서버에 동기화
  const pendingTodos = await getStoredTodos();
  
  for (const todo of pendingTodos) {
    try {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
      });
      await removeSoredTodo(todo.id);
    } catch (error) {
      console.error('동기화 실패:', error);
    }
  }
}
```

## 4. 번들 크기 최적화

### 4.1 Tree Shaking 최적화

```javascript
// 잘못된 방법 - 전체 라이브러리 import
import _ from 'lodash';
import moment from 'moment';

// 올바른 방법 - 필요한 함수만 import
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { format } from 'date-fns';

// 또는 ES6 모듈 지원 라이브러리 사용
import { debounce, throttle } from 'lodash-es';

// 번들 분석기로 확인
npm run build
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer build/static/js/*.js
```

### 4.2 외부 의존성 최적화

```javascript
// package.json - 의존성 최적화
{
  "dependencies": {
    // 대신 더 가벼운 대안 사용
    "date-fns": "^2.29.3",     // moment.js 대신
    "axios": "^1.4.0",         // 필요한 경우만
    "lodash-es": "^4.17.21"    // lodash 대신
  },
  "devDependencies": {
    // 개발 시에만 필요한 패키지들
    "webpack-bundle-analyzer": "^4.9.0"
  }
}

// 동적 import로 필요할 때만 로드
const loadUtils = async () => {
  const { default: utils } = await import('./utils/heavyUtils');
  return utils;
};

// Polyfill 최적화
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',  // 사용된 기능만 polyfill
      corejs: 3
    }]
  ]
};
```

## 5. 사용자 경험(UX) 최적화

### 5.1 로딩 상태 관리

```javascript
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('데이터 로딩 실패');
      
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(async (newTodo) => {
    // 낙관적 업데이트
    const tempId = Date.now().toString();
    const optimisticTodo = { ...newTodo, id: tempId, pending: true };
    setTodos(prev => [...prev, optimisticTodo]);

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
      
      const createdTodo = await response.json();
      
      // 실제 데이터로 교체
      setTodos(prev => 
        prev.map(todo => 
          todo.id === tempId ? createdTodo : todo
        )
      );
    } catch (err) {
      // 실패 시 롤백
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
      setError('할 일 추가 실패');
    }
  }, []);

  return { todos, loading, error, fetchTodos, addTodo };
}

// 로딩 UI 컴포넌트
function TodoContainer() {
  const { todos, loading, error, fetchTodos, addTodo } = useTodos();

  if (loading && todos.length === 0) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={fetchTodos}
      />
    );
  }

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      {loading && <ProgressBar />}
      <TodoList todos={todos} />
    </div>
  );
}
```

### 5.2 스켈레톤 로더

```javascript
function SkeletonLoader() {
  return (
    <div className="skeleton-container">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="skeleton-checkbox"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </div>
  );
}

// CSS
.skeleton-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.skeleton-checkbox,
.skeleton-text,
.skeleton-button {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 1rem;
}

.skeleton-text {
  flex: 1;
  height: 20px;
  margin-right: 1rem;
}

.skeleton-button {
  width: 60px;
  height: 32px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 5.3 에러 경계와 폴백 UI

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // 에러 리포팅 서비스로 전송
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error, errorInfo) {
    // Sentry, LogRocket 등으로 에러 전송
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>앗! 문제가 발생했습니다.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>에러 세부사항</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="retry-button"
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 함수형 컴포넌트용 에러 경계
function withErrorBoundary(Component) {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// 사용
const SafeTodoContainer = withErrorBoundary(TodoContainer);
```

## 6. 성능 모니터링과 측정

### 6.1 커스텀 성능 훅

```javascript
function usePerformance() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        setMetrics(prev => ({
          ...prev,
          [entry.name]: {
            duration: entry.duration,
            startTime: entry.startTime,
            type: entry.entryType
          }
        }));
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    return () => observer.disconnect();
  }, []);

  const markStart = useCallback((name) => {
    performance.mark(`${name}-start`);
  }, []);

  const markEnd = useCallback((name) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }, []);

  return { metrics, markStart, markEnd };
}

// 사용 예시
function TodoContainer() {
  const { markStart, markEnd, metrics } = usePerformance();

  useEffect(() => {
    markStart('todo-fetch');
    
    fetchTodos().then(() => {
      markEnd('todo-fetch');
    });
  }, []);

  useEffect(() => {
    if (metrics['todo-fetch']) {
      console.log('할 일 로딩 시간:', metrics['todo-fetch'].duration);
    }
  }, [metrics]);

  // 컴포넌트 렌더링
}
```

### 6.2 메모리 사용량 모니터링

```javascript
function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        setMemoryInfo({
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        });
      }
    };

    checkMemory();
    const interval = setInterval(checkMemory, 5000); // 5초마다 체크

    return () => clearInterval(interval);
  }, []);

  const getMemoryUsagePercent = () => {
    if (!memoryInfo) return 0;
    return (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100;
  };

  return { memoryInfo, getMemoryUsagePercent };
}
```

## 7. 코드 품질과 유지보수성

### 7.1 타입 안전성 (TypeScript 도입)

```typescript
// types/todo.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// hooks/useTodos.ts
import { useState, useCallback } from 'react';
import { Todo, TodoContextType } from '../types/todo';

export function useTodos(): TodoContextType {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addTodo = useCallback(async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
      });
      
      if (!response.ok) {
        throw new Error('할 일 추가 실패');
      }
      
      const newTodo: Todo = await response.json();
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, []);

  return { todos, addTodo, updateTodo, deleteTodo, loading, error };
}
```

### 7.2 커스텀 훅을 통한 로직 재사용

```javascript
// hooks/useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('LocalStorage 읽기 오류:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('LocalStorage 저장 오류:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// hooks/useDebounce.js
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// hooks/useOnlineStatus.js
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

## 8. 배포 전 최종 체크리스트

### 8.1 성능 체크리스트

```markdown
## 성능 최적화 체크리스트

### 번들 최적화
- [ ] 번들 크기 분석 완료
- [ ] 불필요한 의존성 제거
- [ ] Tree shaking 최적화
- [ ] 코드 스플리팅 적용

### 이미지 최적화
- [ ] 이미지 압축 및 포맷 최적화
- [ ] 지연 로딩 구현
- [ ] WebP 포맷 지원

### 렌더링 최적화
- [ ] React.memo 적용
- [ ] useCallback/useMemo 적용
- [ ] 불필요한 리렌더링 제거

### 네트워크 최적화
- [ ] API 요청 최적화
- [ ] 캐싱 전략 구현
- [ ] 압축 설정 (gzip/brotli)

### 로딩 경험
- [ ] 스켈레톤 로더 구현
- [ ] 프로그레시브 로딩
- [ ] 에러 상태 처리
```

### 8.2 접근성 체크리스트

```markdown
## 접근성 체크리스트

### 키보드 내비게이션
- [ ] 모든 인터랙티브 요소에 포커스 가능
- [ ] 논리적인 탭 순서
- [ ] 포커스 인디케이터 표시

### 스크린 리더 지원
- [ ] 적절한 ARIA 레이블
- [ ] 의미론적 HTML 구조
- [ ] alt 텍스트 제공

### 색상과 대비
- [ ] 충분한 색상 대비율 (4.5:1 이상)
- [ ] 색상에만 의존하지 않는 정보 전달
- [ ] 다크 모드 지원
```

## 9. 실습 과제

### 과제 1: 가상화된 리스트 구현

```javascript
// components/VirtualizedTodoList.js
import { FixedSizeList as List } from 'react-window';

function VirtualizedTodoList({ todos, onToggle, onDelete }) {
  const Row = ({ index, style }) => {
    const todo = todos[index];
    
    return (
      <div style={style}>
        <TodoItem
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </div>
    );
  };

  return (
    <List
      height={400}
      itemCount={todos.length}
      itemSize={60}
      itemData={todos}
    >
      {Row}
    </List>
  );
}
```

### 과제 2: 무한 스크롤 구현

```javascript
function useInfiniteScroll(fetchMore) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    
    fetchMoreData();
  }, [isFetching]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  };

  const fetchMoreData = async () => {
    await fetchMore();
    setIsFetching(false);
  };

  return [isFetching, setIsFetching];
}
```

### 과제 3: 성능 대시보드 구현

```javascript
function PerformanceDashboard() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      setPerformanceData({
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
        memoryUsage: performance.memory?.usedJSHeapSize
      });
    };

    collectMetrics();
    const interval = setInterval(collectMetrics, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="performance-dashboard">
      <h3>성능 메트릭</h3>
      <div className="metrics">
        <div>DOM 로딩: {performanceData.domContentLoaded?.toFixed(2)}ms</div>
        <div>페이지 로딩: {performanceData.loadComplete?.toFixed(2)}ms</div>
        <div>첫 렌더링: {performanceData.firstPaint?.toFixed(2)}ms</div>
        <div>메모리 사용량: {(performanceData.memoryUsage / 1024 / 1024)?.toFixed(2)}MB</div>
      </div>
    </div>
  );
}
```

## 요약

이번 장에서는 React 애플리케이션의 성능 최적화와 모범 사례를 학습했습니다:

1. **React 최적화**: memo, useCallback, useMemo를 활용한 리렌더링 최적화
2. **코드 스플리팅**: 번들 크기 줄이기와 지연 로딩
3. **사용자 경험**: 로딩 상태, 에러 처리, 스켈레톤 UI
4. **성능 모니터링**: 실시간 성능 측정과 메트릭 수집
5. **코드 품질**: TypeScript, 커스텀 훅, 접근성 고려

## 마무리

이 20장의 교육 시리즈를 통해 다음과 같은 여정을 완주했습니다:

### 🎯 학습 성과
- **기초부터 고급까지**: HTML/CSS/JavaScript → React → 배포
- **실무 중심**: 실제 프로젝트를 통한 체계적 학습
- **모던 개발**: 최신 도구와 패턴 활용
- **품질 관리**: 테스트, 성능, 접근성 고려

### 🚀 다음 단계 제안
1. **포트폴리오 구축**: 학습한 내용을 바탕으로 개인 프로젝트 진행
2. **오픈소스 기여**: GitHub 프로젝트 참여로 실무 경험 쌓기
3. **심화 학습**: TypeScript, Next.js, 상태 관리 라이브러리 학습
4. **백엔드 확장**: Node.js, 데이터베이스, 클라우드 서비스 학습

### 💡 지속적 학습 자료
- [React 공식 문서](https://react.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [GitHub 트렌딩](https://github.com/trending)

**수고하셨습니다! 여러분은 이제 현대적인 웹 개발자로서 첫 걸음을 내딛을 준비가 되었습니다.** 🎉

---

💡 **계속 성장하는 개발자가 되기 위한 조언**
- 꾸준한 코딩 연습
- 새로운 기술 트렌드 관심
- 커뮤니티 참여와 지식 공유
- 문제 해결 능력 향상

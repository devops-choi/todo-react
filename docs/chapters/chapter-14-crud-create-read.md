# Chapter 14: CRUD 작업 - Create와 Read 기능

## 학습 목표
- HTTP POST 요청을 통한 데이터 생성 (Create)
- HTTP GET 요청을 통한 데이터 조회 (Read)
- JSON 데이터 형식과 직렬화/역직렬화
- 비동기 처리와 Promise 활용
- API 요청/응답 구조 이해

## 사전 준비사항
- HTTP 프로토콜 기초
- JavaScript Promise와 async/await
- JSON 데이터 형식

---

## 1. CRUD 작업 개요

CRUD는 데이터베이스나 API에서 수행하는 4가지 기본 작업입니다:
- **C**reate: 데이터 생성
- **R**ead: 데이터 조회
- **U**pdate: 데이터 수정
- **D**elete: 데이터 삭제

이번 장에서는 Create와 Read 작업에 집중합니다.

## 2. Create 작업 - 할 일 생성

### 2.1 createTodoItem 함수 분석

```javascript
export function createTodoItem(item) {
  return fetch('http://localhost:5000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}
```

### 2.2 HTTP POST 요청 구조

```javascript
// 기본 POST 요청 구조
fetch(url, {
  method: 'POST',           // HTTP 메서드
  headers: {                // 요청 헤더
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data) // 요청 본문
})
```

### 2.3 Content-Type 헤더의 중요성

```javascript
// JSON 데이터 전송
headers: {
  'Content-Type': 'application/json',
}
body: JSON.stringify({ title: '할 일', completed: false })

// 폼 데이터 전송
headers: {
  'Content-Type': 'application/x-www-form-urlencoded',
}
body: 'title=할일&completed=false'

// 파일 업로드
headers: {
  'Content-Type': 'multipart/form-data',
}
body: formData
```

### 2.4 JSON.stringify() 이해

```javascript
// 객체를 JSON 문자열로 변환
const todoItem = {
  title: '공부하기',
  completed: false,
  priority: 'high'
};

const jsonString = JSON.stringify(todoItem);
console.log(jsonString);
// 출력: '{"title":"공부하기","completed":false,"priority":"high"}'

// 날짜 객체 처리
const todoWithDate = {
  title: '회의 참석',
  dueDate: new Date(),
  completed: false
};

console.log(JSON.stringify(todoWithDate));
// 날짜는 ISO 문자열로 변환됨
```

### 2.5 실제 사용 예시

```javascript
// 컴포넌트에서 새 할 일 생성
async function handleAddTodo(newTodoData) {
  try {
    // 1. 사용자 입력 데이터 준비
    const todoItem = {
      title: newTodoData.title,
      completed: false,
      createdAt: new Date().toISOString(),
      id: Date.now() // 임시 ID (서버에서 실제 ID 생성)
    };

    // 2. API 호출
    const createdTodo = await createTodoItem(todoItem);
    
    // 3. 성공 시 UI 업데이트
    setTodos(prevTodos => [...prevTodos, createdTodo]);
    
    // 4. 사용자 피드백
    showSuccessMessage('할 일이 추가되었습니다.');
    
  } catch (error) {
    // 5. 에러 처리
    console.error('할 일 추가 실패:', error);
    showErrorMessage('할 일 추가에 실패했습니다.');
  }
}
```

## 3. Read 작업 - 할 일 조회

### 3.1 selectTodoList 함수 분석

```javascript
export function selectTodoList() {
  return fetch('http://localhost:5000/todos', { 
    method: 'GET' 
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}
```

### 3.2 HTTP GET 요청 특징

```javascript
// GET 요청은 매우 간단
fetch('http://localhost:5000/todos')
  .then(response => response.json())
  .then(data => console.log(data));

// 쿼리 파라미터 추가
const params = new URLSearchParams({
  completed: 'false',
  limit: '10',
  page: '1'
});

fetch(`http://localhost:5000/todos?${params}`)
  .then(response => response.json());
```

### 3.3 response.json() 이해

```javascript
// response.json()은 Promise를 반환
fetch('http://localhost:5000/todos')
  .then(response => {
    console.log(response.status);    // 200
    console.log(response.ok);        // true
    console.log(response.headers);   // Headers 객체
    
    // JSON 파싱 (비동기)
    return response.json();
  })
  .then(data => {
    console.log(data); // 파싱된 JavaScript 객체
  });

// async/await 버전
async function fetchTodos() {
  const response = await fetch('http://localhost:5000/todos');
  const data = await response.json();
  return data;
}
```

### 3.4 실제 사용 예시

```javascript
// 컴포넌트에서 할 일 목록 로드
async function loadTodos() {
  try {
    // 1. 로딩 상태 시작
    setLoading(true);
    setError(null);

    // 2. API 호출
    const todos = await selectTodoList();
    
    // 3. 데이터 검증
    if (!Array.isArray(todos)) {
      throw new Error('잘못된 데이터 형식입니다.');
    }

    // 4. 상태 업데이트
    setTodos(todos);
    
  } catch (error) {
    // 5. 에러 처리
    console.error('할 일 목록 로드 실패:', error);
    setError(error.message);
  } finally {
    // 6. 로딩 상태 종료
    setLoading(false);
  }
}

// 컴포넌트 마운트 시 실행
useEffect(() => {
  loadTodos();
}, []);
```

## 4. 요청/응답 데이터 구조

### 4.1 할 일 생성 요청/응답

```javascript
// 요청 데이터 (Request Body)
{
  "title": "리액트 공부하기",
  "completed": false,
  "priority": "high",
  "dueDate": "2025-06-15T09:00:00.000Z"
}

// 응답 데이터 (Response Body)
{
  "id": 123,
  "title": "리액트 공부하기", 
  "completed": false,
  "priority": "high",
  "dueDate": "2025-06-15T09:00:00.000Z",
  "createdAt": "2025-06-14T10:30:00.000Z",
  "updatedAt": "2025-06-14T10:30:00.000Z"
}
```

### 4.2 할 일 목록 조회 응답

```javascript
// GET /todos 응답
[
  {
    "id": 1,
    "title": "아침 운동하기",
    "completed": true,
    "createdAt": "2025-06-14T06:00:00.000Z"
  },
  {
    "id": 2,
    "title": "프로젝트 회의",
    "completed": false,
    "createdAt": "2025-06-14T08:00:00.000Z"
  }
]
```

### 4.3 에러 응답 구조

```javascript
// 에러 응답 예시
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "제목은 필수입니다.",
    "details": {
      "field": "title",
      "value": ""
    }
  }
}
```

## 5. 비동기 처리 패턴

### 5.1 Promise 체이닝

```javascript
// Promise 체이닝
function createAndReloadTodos(newTodo) {
  return createTodoItem(newTodo)
    .then(createdTodo => {
      console.log('할 일 생성 완료:', createdTodo);
      return selectTodoList();
    })
    .then(allTodos => {
      console.log('전체 목록 조회 완료:', allTodos);
      return allTodos;
    })
    .catch(error => {
      console.error('작업 실패:', error);
      throw error;
    });
}
```

### 5.2 async/await 패턴

```javascript
// async/await 버전
async function createAndReloadTodos(newTodo) {
  try {
    const createdTodo = await createTodoItem(newTodo);
    console.log('할 일 생성 완료:', createdTodo);
    
    const allTodos = await selectTodoList();
    console.log('전체 목록 조회 완료:', allTodos);
    
    return allTodos;
  } catch (error) {
    console.error('작업 실패:', error);
    throw error;
  }
}
```

### 5.3 병렬 처리

```javascript
// 여러 작업을 동시에 실행
async function loadMultipleData() {
  try {
    // 병렬 실행
    const [todos, categories, user] = await Promise.all([
      selectTodoList(),
      fetchCategories(),
      fetchUserProfile()
    ]);

    return { todos, categories, user };
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    throw error;
  }
}

// 순차 처리가 필요한 경우
async function createTodoWithCategory() {
  const category = await createCategory('업무');
  const todo = await createTodoItem({ 
    title: '회의 준비', 
    categoryId: category.id 
  });
  return todo;
}
```

## 6. 에러 처리 고급 기법

### 6.1 상태 코드별 처리

```javascript
async function handleApiResponse(response) {
  if (response.ok) {
    return await response.json();
  }

  // 상태 코드별 세분화된 처리
  switch (response.status) {
    case 400:
      const errorData = await response.json();
      throw new Error(`잘못된 요청: ${errorData.message}`);
    
    case 401:
      // 인증 토큰 갱신 시도
      await refreshAuthToken();
      throw new Error('인증이 만료되었습니다. 다시 시도해주세요.');
    
    case 403:
      throw new Error('권한이 없습니다.');
    
    case 404:
      throw new Error('요청한 리소스를 찾을 수 없습니다.');
    
    case 429:
      throw new Error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
    
    case 500:
      throw new Error('서버 오류가 발생했습니다.');
    
    default:
      throw new Error(`알 수 없는 오류: ${response.status}`);
  }
}
```

### 6.2 재시도 로직

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      return await handleApiResponse(response);
    } catch (error) {
      lastError = error;
      
      // 마지막 시도가 아니면 대기 후 재시도
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(`재시도 ${attempt}/${maxRetries - 1} (${delay}ms 후)`);
      }
    }
  }
  
  throw lastError;
}

// 사용 예시
export function selectTodoList() {
  return fetchWithRetry('http://localhost:5000/todos', { method: 'GET' });
}
```

## 7. 실습 과제

### 과제 1: 필터링과 정렬 추가

```javascript
// 필터링된 할 일 목록 조회
export function selectTodoList(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.completed !== undefined) {
    params.append('completed', filters.completed);
  }
  
  if (filters.search) {
    params.append('search', filters.search);
  }
  
  if (filters.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  
  const url = `http://localhost:5000/todos?${params}`;
  return fetch(url).then(handleApiResponse);
}

// 사용 예시
const completedTodos = await selectTodoList({ completed: true });
const searchResults = await selectTodoList({ search: '공부' });
```

### 과제 2: 배치 작업 구현

```javascript
// 여러 할 일을 한 번에 생성
export function createMultipleTodos(todoItems) {
  return fetch('http://localhost:5000/todos/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items: todoItems }),
  }).then(handleApiResponse);
}

// 사용 예시
const newTodos = [
  { title: '할 일 1', completed: false },
  { title: '할 일 2', completed: false },
  { title: '할 일 3', completed: false }
];

const createdTodos = await createMultipleTodos(newTodos);
```

### 과제 3: 캐시와 백그라운드 갱신

```javascript
// 캐시된 데이터와 백그라운드 갱신
let cachedTodos = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

export function selectTodoListWithCache(forceRefresh = false) {
  const now = Date.now();
  
  // 캐시가 유효하고 강제 갱신이 아닌 경우
  if (!forceRefresh && cachedTodos && 
      lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
    
    // 캐시된 데이터 즉시 반환
    setTimeout(() => {
      // 백그라운드에서 데이터 갱신
      selectTodoListFromServer().then(freshData => {
        cachedTodos = freshData;
        lastFetchTime = Date.now();
      });
    }, 0);
    
    return Promise.resolve(cachedTodos);
  }
  
  // 서버에서 새 데이터 조회
  return selectTodoListFromServer().then(data => {
    cachedTodos = data;
    lastFetchTime = Date.now();
    return data;
  });
}

function selectTodoListFromServer() {
  return fetch('http://localhost:5000/todos').then(handleApiResponse);
}
```

## 8. 실시간 업데이트 고려사항

### 8.1 Optimistic Updates

```javascript
// 낙관적 업데이트 - UI를 먼저 업데이트하고 서버 요청
async function createTodoOptimistically(newTodo) {
  // 임시 ID로 UI 먼저 업데이트
  const tempTodo = { ...newTodo, id: `temp-${Date.now()}`, pending: true };
  setTodos(prev => [...prev, tempTodo]);
  
  try {
    // 서버에 실제 요청
    const createdTodo = await createTodoItem(newTodo);
    
    // 성공 시 임시 데이터를 실제 데이터로 교체
    setTodos(prev => prev.map(todo => 
      todo.id === tempTodo.id ? createdTodo : todo
    ));
  } catch (error) {
    // 실패 시 임시 데이터 제거
    setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
    throw error;
  }
}
```

### 8.2 WebSocket을 통한 실시간 동기화

```javascript
// WebSocket 연결로 실시간 업데이트
class TodoRealtimeService {
  constructor() {
    this.ws = null;
    this.listeners = new Set();
  }
  
  connect() {
    this.ws = new WebSocket('ws://localhost:5000/todos');
    
    this.ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      this.notifyListeners(update);
    };
  }
  
  addListener(callback) {
    this.listeners.add(callback);
  }
  
  removeListener(callback) {
    this.listeners.delete(callback);
  }
  
  notifyListeners(update) {
    this.listeners.forEach(callback => callback(update));
  }
}

// 컴포넌트에서 사용
useEffect(() => {
  const realtimeService = new TodoRealtimeService();
  realtimeService.connect();
  
  realtimeService.addListener((update) => {
    if (update.type === 'TODO_CREATED') {
      setTodos(prev => [...prev, update.data]);
    }
  });
  
  return () => realtimeService.disconnect();
}, []);
```

## 요약

이번 장에서는 Create와 Read CRUD 작업을 통해 다음 개념들을 학습했습니다:

1. **HTTP POST 요청**: JSON 데이터를 서버로 전송하여 새 리소스 생성
2. **HTTP GET 요청**: 서버에서 데이터를 조회하고 JSON으로 파싱
3. **비동기 처리**: Promise와 async/await를 활용한 API 통신
4. **에러 처리**: 상태 코드별 세분화된 에러 처리와 재시도 로직
5. **최적화 기법**: 캐싱, 낙관적 업데이트, 실시간 동기화

## 다음 장 미리보기

다음 장에서는 CRUD 작업의 Update와 Delete 기능을 학습하며 다음 내용을 다룹니다:
- HTTP PUT/PATCH 요청을 통한 데이터 수정
- HTTP DELETE 요청을 통한 데이터 삭제
- 부분 업데이트 vs 전체 업데이트
- 삭제 확인과 복구 기능
- 상태 관리와 UI 동기화

---

💡 **추가 학습 자료**
- [MDN - HTTP 요청 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
- [JSON 데이터 포맷](https://www.json.org/json-ko.html)
- [JavaScript Promise 가이드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises)

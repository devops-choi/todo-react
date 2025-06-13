# Chapter 13: todoService/index.js - 서비스 레이어 구조

## 학습 목표
- 서비스 레이어 아키텍처 이해
- 비즈니스 로직과 UI 로직 분리
- 모듈 시스템과 import/export 패턴
- API 통신 추상화
- 에러 처리와 재사용성 설계

## 사전 준비사항
- ES6 모듈 시스템 기초
- fetch API 사용법
- Promise와 async/await 개념

---

## 1. 서비스 레이어 개요

서비스 레이어는 비즈니스 로직을 UI 컴포넌트로부터 분리하여 관리하는 아키텍처 패턴입니다.

### 왜 서비스 레이어가 필요한가?
- **관심사 분리**: UI와 데이터 처리 로직 분리
- **재사용성**: 여러 컴포넌트에서 동일한 로직 공유
- **테스트 용이성**: 비즈니스 로직만 독립적으로 테스트
- **유지보수성**: 변경 사항이 한 곳에 집중

## 2. 디렉터리 구조 분석

```
src/services/todoService/
├── index.js              # 메인 서비스 진입점
├── selectTodoList.js     # 할 일 목록 조회
├── selectTodoItem.js     # 개별 할 일 조회
├── createTodoItem.js     # 할 일 생성
├── updateTodoItem.js     # 할 일 수정
└── deleteTodoItem.js     # 할 일 삭제
```

### 파일 분리의 장점
- **단일 책임 원칙**: 각 파일이 하나의 기능만 담당
- **코드 가독성**: 기능별로 명확히 구분
- **개발 효율성**: 팀 작업 시 충돌 최소화

## 3. index.js 메인 진입점 분석

```javascript
import { selectTodoList } from './selectTodoList';
import { selectTodoItem } from './selectTodoItem';
import { createTodoItem } from './createTodoItem';
import { updateTodoItem } from './updateTodoItem';
import { deleteTodoItem } from './deleteTodoItem';

// 기본 내보내기 - 객체 형태
const todoService = {
  selectTodoList,
  selectTodoItem,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
};

export default todoService;

// 명명된 내보내기 - 개별 함수
export {
  selectTodoList,
  selectTodoItem,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
};
```

### 두 가지 내보내기 방식의 활용

```javascript
// 방법 1: 기본 내보내기 사용
import todoService from './services/todoService';
todoService.selectTodoList();
todoService.createTodoItem(data);

// 방법 2: 명명된 내보내기 사용
import { selectTodoList, createTodoItem } from './services/todoService';
selectTodoList();
createTodoItem(data);

// 방법 3: 혼합 사용
import todoService, { selectTodoList } from './services/todoService';
```

## 4. CRUD 작업별 함수 분석

### 4.1 Create (생성) - createTodoItem.js

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

### 4.2 Read (조회) - selectTodoList.js

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

### 4.3 Update (수정) - updateTodoItem.js

```javascript
export function updateTodoItem(id, item) {
  return fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PUT',
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

### 4.4 Delete (삭제) - deleteTodoItem.js

```javascript
export function deleteTodoItem(id) {
  return fetch(`http://localhost:5000/todos/${id}`, { 
    method: 'DELETE' 
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}
```

## 5. HTTP 메서드와 REST API 패턴

### REST API 규칙
```javascript
// GET: 데이터 조회
GET /todos          // 전체 목록
GET /todos/1        // 특정 항목

// POST: 새 데이터 생성
POST /todos         // 새 할 일 추가

// PUT: 전체 데이터 수정
PUT /todos/1        // 특정 할 일 전체 수정

// PATCH: 부분 데이터 수정
PATCH /todos/1      // 특정 할 일 부분 수정

// DELETE: 데이터 삭제
DELETE /todos/1     // 특정 할 일 삭제
```

### 헤더 설정의 중요성
```javascript
headers: {
  'Content-Type': 'application/json',  // JSON 데이터 전송
  'Authorization': 'Bearer token',     // 인증 (필요시)
  'Accept': 'application/json',        // 응답 형식 지정
}
```

## 6. 에러 처리 패턴

### 현재 구현된 에러 처리
```javascript
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
```

### 향상된 에러 처리 방법
```javascript
// 공통 에러 처리 함수
function handleResponse(response) {
  if (!response.ok) {
    // 상태 코드별 세분화된 에러 처리
    switch (response.status) {
      case 400:
        throw new Error('잘못된 요청입니다.');
      case 401:
        throw new Error('인증이 필요합니다.');
      case 403:
        throw new Error('권한이 없습니다.');
      case 404:
        throw new Error('데이터를 찾을 수 없습니다.');
      case 500:
        throw new Error('서버 오류가 발생했습니다.');
      default:
        throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
}

// 사용 예시
export function selectTodoList() {
  return fetch('http://localhost:5000/todos')
    .then(handleResponse)
    .catch(error => {
      console.error('할 일 목록 조회 실패:', error);
      throw error; // 상위로 에러 전파
    });
}
```

## 7. 설정과 환경 변수 관리

### API URL 중앙 관리
```javascript
// config.js 파일 생성
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  TODOS: `${API_BASE_URL}/todos`,
  TODO_ITEM: (id) => `${API_BASE_URL}/todos/${id}`,
};

// 서비스에서 사용
import { API_ENDPOINTS } from '../config';

export function selectTodoList() {
  return fetch(API_ENDPOINTS.TODOS)
    .then(response => response.json());
}
```

### 환경별 설정
```javascript
// .env.development
REACT_APP_API_URL=http://localhost:5000

// .env.production  
REACT_APP_API_URL=https://api.yourdomain.com

// .env.test
REACT_APP_API_URL=http://localhost:3001
```

## 8. 컴포넌트에서 서비스 사용하기

### 기본 사용 패턴
```javascript
import React, { useState, useEffect } from 'react';
import todoService from '../services/todoService';

function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 할 일 목록 로드
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.selectTodoList();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await todoService.createTodoItem(newTodo);
      setTodos(prev => [...prev, createdTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await todoService.updateTodoItem(id, updatedTodo);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updated : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodoItem(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      {/* UI 컴포넌트들 */}
    </div>
  );
}
```

## 9. 실습 과제

### 과제 1: 로딩 상태와 에러 처리 개선
```javascript
// LoadingService.js 생성
class LoadingService {
  constructor() {
    this.loadingStates = new Map();
  }

  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
  }

  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }
}

export const loadingService = new LoadingService();

// 서비스 함수에 적용
export async function selectTodoList() {
  loadingService.setLoading('todoList', true);
  try {
    const response = await fetch('http://localhost:5000/todos');
    return await response.json();
  } finally {
    loadingService.setLoading('todoList', false);
  }
}
```

### 과제 2: 캐싱 기능 추가
```javascript
// CacheService.js
class CacheService {
  constructor() {
    this.cache = new Map();
    this.expiry = new Map();
  }

  set(key, data, ttl = 5 * 60 * 1000) { // 5분 기본
    this.cache.set(key, data);
    this.expiry.set(key, Date.now() + ttl);
  }

  get(key) {
    if (this.expiry.get(key) < Date.now()) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.expiry.delete(key);
  }
}

export const cacheService = new CacheService();
```

### 과제 3: 재시도 로직 구현
```javascript
// RetryService.js
export async function withRetry(fn, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
}

// 사용 예시
export function selectTodoList() {
  return withRetry(() => 
    fetch('http://localhost:5000/todos').then(handleResponse)
  );
}
```

## 10. 테스트 작성하기

```javascript
// todoService.test.js
import { selectTodoList, createTodoItem } from '../todoService';

// Mock fetch
global.fetch = jest.fn();

describe('todoService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('selectTodoList should return todos', async () => {
    const mockTodos = [{ id: 1, title: 'Test', completed: false }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    const result = await selectTodoList();
    expect(result).toEqual(mockTodos);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/todos', {
      method: 'GET'
    });
  });

  test('createTodoItem should create new todo', async () => {
    const newTodo = { title: 'New Todo', completed: false };
    const createdTodo = { id: 1, ...newTodo };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdTodo,
    });

    const result = await createTodoItem(newTodo);
    expect(result).toEqual(createdTodo);
  });

  test('should handle errors properly', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(selectTodoList()).rejects.toThrow('HTTP error! status: 500');
  });
});
```

## 요약

이번 장에서는 todoService를 통해 다음 개념들을 학습했습니다:

1. **서비스 레이어 아키텍처**: UI와 비즈니스 로직의 분리
2. **모듈 시스템**: import/export를 활용한 코드 조직화
3. **CRUD 작업**: REST API 패턴에 따른 데이터 조작
4. **에러 처리**: 안정적인 API 통신을 위한 예외 처리
5. **코드 재사용성**: 여러 컴포넌트에서 활용 가능한 서비스 설계

## 다음 장 미리보기

다음 장에서는 CRUD 작업의 Create와 Read 기능을 자세히 분석하며 다음 내용을 학습합니다:
- HTTP POST 요청과 데이터 생성
- HTTP GET 요청과 데이터 조회
- 요청/응답 데이터 구조
- 비동기 처리 패턴
- 실제 API 연동 실습

---

💡 **추가 학습 자료**
- [MDN - fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [REST API 설계 가이드](https://restfulapi.net/)
- [JavaScript 모듈 시스템](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)

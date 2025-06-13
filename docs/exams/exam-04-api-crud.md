# 시험 4: 서비스 레이어와 CRUD 연산 (챕터 13-16)

**시험 시간**: 90분  
**만점**: 100점  
**총 문항**: 25문항

---

## 📝 문제 유형별 배점
- 객관식 (5지선다): 각 3점 × 8문항 = 24점
- 주관식 (단답형): 각 4점 × 6문항 = 24점
- 빈칸 채우기: 각 4점 × 4문항 = 16점
- 코딩 문제: 각 18점 × 2문항 = 36점

---

## 📋 객관식 문제 (3점 × 8문항 = 24점)

### 1. RESTful API에서 데이터를 생성할 때 사용하는 HTTP 메서드는?
① GET
② POST
③ PUT
④ DELETE
⑤ PATCH

### 2. JavaScript의 fetch API에서 JSON 응답을 처리하는 올바른 방법은?
① response.text()
② response.json()
③ response.data()
④ response.parse()
⑤ response.body()

### 3. CRUD 연산 중 'R'에 해당하는 작업은?
① Create
② Read
③ Update
④ Delete
⑤ Replace

### 4. 비동기 함수에서 에러를 처리하는 방법으로 올바른 것은?
① if-else 문
② try-catch 문
③ switch 문
④ for 문
⑤ while 문

### 5. Express.js에서 JSON 파싱을 위해 사용하는 미들웨어는?
① express.static()
② express.json()
③ express.urlencoded()
④ express.text()
⑤ express.raw()

### 6. 서비스 레이어 패턴의 주요 목적은?
① UI 컴포넌트 관리
② 비즈니스 로직 분리
③ 스타일링 관리
④ 라우팅 처리
⑤ 상태 관리

### 7. Node.js에서 파일을 읽고 쓰기 위해 사용하는 내장 모듈은?
① http
② path
③ fs
④ url
⑤ crypto

### 8. CORS(Cross-Origin Resource Sharing) 문제를 해결하는 방법은?
① 서버에서 적절한 헤더 설정
② 클라이언트에서 쿠키 사용
③ HTTPS 프로토콜 사용
④ JSON 형식 사용
⑤ 동일한 포트 사용

---

## ✏️ 주관식 문제 (4점 × 6문항 = 24점)

### 9. HTTP 상태 코드 중 성공적인 요청을 나타내는 200번대 코드 3가지를 작성하세요.
**답안**: _________________

### 10. async/await와 Promise.then()의 차이점을 간단히 설명하세요.
**답안**: _________________

### 11. RESTful API 설계에서 리소스를 식별하는 방법을 설명하세요.
**답안**: _________________

### 12. JavaScript에서 객체를 깊은 복사(deep copy)하는 방법 2가지를 작성하세요.
**답안**: _________________

### 13. Express.js에서 정적 파일을 제공하기 위해 사용하는 메서드를 작성하세요.
**답안**: _________________

### 14. API 응답에서 에러가 발생했을 때 클라이언트에서 처리해야 할 기본 사항을 작성하세요.
**답안**: _________________

---

## 📝 빈칸 채우기 (4점 × 4문항 = 16점)

### 15. HTTP GET 요청에서 특정 리소스를 조회할 때 URL 경로는 `/todos/______` 형태로 작성합니다.

### 16. Express.js에서 특정 포트에서 서버를 시작하려면 `app.______(포트번호)` 메서드를 사용합니다.

### 17. fetch API에서 POST 요청을 보낼 때 요청 본문을 설정하는 옵션은 `______` 입니다.

### 18. Node.js 서버에서 JSON 파일을 읽어올 때 사용하는 함수는 `JSON.______()` 입니다.

---

## 💻 코딩 문제 (18점 × 2문항 = 36점)

### 19. 다음 요구사항에 맞는 todoService 모듈을 작성하세요. (18점)

**요구사항**:
- 할 일 목록을 가져오는 selectTodoList 함수
- 새로운 할 일을 생성하는 createTodoItem 함수
- 할 일을 삭제하는 deleteTodoItem 함수
- 적절한 에러 처리 포함
- API 엔드포인트: http://localhost:5000

**답안 작성란**:
```javascript
// todoService.js

const API_BASE_URL = 'http://localhost:5000';

// 할 일 목록 조회
export async function selectTodoList() {
  // 여기에 코드를 작성하세요





}

// 할 일 생성
export async function createTodoItem(todoData) {
  // 여기에 코드를 작성하세요





}

// 할 일 삭제
export async function deleteTodoItem(id) {
  // 여기에 코드를 작성하세요





}

// 기본 export
const todoService = {
  selectTodoList,
  createTodoItem,
  deleteTodoItem,
};

export default todoService;
```

**평가 기준**:
- fetch API 올바른 사용 (6점)
- HTTP 메서드 적절한 선택 (4점)
- 에러 처리 구현 (4점)
- JSON 파싱 처리 (2점)
- 함수 구조와 export (2점)

### 20. Express.js를 사용하여 간단한 Todo API 서버를 작성하세요. (18점)

**요구사항**:
- GET /todos - 모든 할 일 반환
- POST /todos - 새로운 할 일 생성
- DELETE /todos/:id - 특정 할 일 삭제
- JSON 파일로 데이터 저장
- CORS 설정 포함

**답안 작성란**:
```javascript
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'database.json');

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// GET /todos - 모든 할 일 조회
app.get('/todos', (req, res) => {
  // 여기에 코드를 작성하세요




});

// POST /todos - 새로운 할 일 생성
app.post('/todos', (req, res) => {
  // 여기에 코드를 작성하세요




});

// DELETE /todos/:id - 할 일 삭제
app.delete('/todos/:id', (req, res) => {
  // 여기에 코드를 작성하세요




});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**평가 기준**:
- 라우트 핸들러 구현 (8점)
- 파일 시스템 작업 (4점)
- 에러 처리 (3점)
- HTTP 상태 코드 사용 (2점)
- 미들웨어 설정 (1점)

---

## 🔧 실습 문제 (보너스 10점)

### 다음 비동기 함수에서 발생할 수 있는 문제점을 찾고 개선된 코드를 작성하세요.

```javascript
async function updateTodoItem(id, data) {
  const response = fetch(`/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  const result = response.json();
  return result;
}
```

**문제점들**: _________________

**개선된 코드**:
```javascript
async function updateTodoItem(id, data) {
  // 여기에 개선된 코드를 작성하세요






}
```

---

## 🔍 정답 및 해설

### 객관식 정답
1. ② 2. ② 3. ② 4. ② 5. ② 6. ② 7. ③ 8. ①

### 주관식 정답
9. 200 (OK), 201 (Created), 204 (No Content)
10. async/await는 Promise를 더 동기 코드처럼 작성할 수 있게 하고, try-catch로 에러 처리가 가능
11. URL 경로와 HTTP 메서드를 조합하여 리소스와 작업을 명확히 구분
12. JSON.parse(JSON.stringify(obj)), structuredClone(obj)
13. express.static()
14. 상태 코드 확인, 에러 메시지 표시, 사용자에게 적절한 피드백 제공

### 빈칸 채우기 정답
15. {id} 또는 :id
16. listen
17. body
18. parse

### 코딩 문제 모범답안

19. 
```javascript
export async function selectTodoList() {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw error;
  }
}

export async function createTodoItem(todoData) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to create todo:', error);
    throw error;
  }
}

export async function deleteTodoItem(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw error;
  }
}
```

20.
```javascript
app.get('/todos', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data.todos || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read todos' });
  }
});

app.post('/todos', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const newTodo = {
      id: Date.now(),
      ...req.body,
      completed: false,
    };
    data.todos.push(newTodo);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/todos/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const todoId = parseInt(req.params.id);
    data.todos = data.todos.filter(todo => todo.id !== todoId);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});
```

### 실습 문제 정답
**문제점들**: await 키워드 누락, 에러 처리 없음, response.ok 체크 없음

**개선된 코드**:
```javascript
async function updateTodoItem(id, data) {
  try {
    const response = await fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw error;
  }
}
```

---

**시험 종료 후 체크리스트**:
- [ ] 모든 async/await 키워드 확인
- [ ] HTTP 메서드와 상태 코드 확인
- [ ] JSON 파싱 및 stringify 확인
- [ ] 에러 처리 구문 확인

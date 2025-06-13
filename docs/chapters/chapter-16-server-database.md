# Chapter 16: server.js와 database.json - 백엔드 서버

## 학습 목표
- JSON Server를 활용한 간단한 REST API 서버 구축
- Node.js와 Express 서버 기본 구조 이해
- CORS 설정과 미들웨어 개념
- JSON 파일을 데이터베이스로 활용하는 방법
- 개발 환경에서의 풀스택 애플리케이션 구성

## 사전 준비사항
- Node.js 기본 개념
- HTTP 프로토콜과 REST API 이해
- JSON 데이터 형식

---

## 1. JSON Server 개요

JSON Server는 JSON 파일을 기반으로 빠르게 REST API를 구축할 수 있는 도구입니다.

### 주요 특징
- **빠른 프로토타이핑**: 복잡한 백엔드 없이 API 서버 구축
- **RESTful API 자동 생성**: CRUD 작업을 위한 엔드포인트 자동 제공
- **실시간 데이터 동기화**: 파일 변경 시 자동 반영
- **커스터마이징 가능**: 미들웨어와 라우팅 확장

## 2. server.js 코드 분석

### 전체 코드 구조
```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults({
  static: './build'
});

const port = process.env.PORT || 5000;

// CORS 설정
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

server.use(middlewares);
server.use('/api', router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
```

### 2.1 서버 초기화

```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
```

**설명:**
- `json-server` 패키지 임포트
- Express 서버 인스턴스 생성
- JSON Server의 기본 기능 활용

### 2.2 라우터와 미들웨어 설정

```javascript
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults({
  static: './build'
});
```

**라우터 설정:**
- `database.json` 파일을 데이터 소스로 사용
- RESTful 엔드포인트 자동 생성

**미들웨어 설정:**
- `static: './build'`: 정적 파일 서빙 (React 빌드 파일)
- 기본 로깅, CORS, 에러 처리 포함

### 2.3 포트 설정

```javascript
const port = process.env.PORT || 5000;
```

**환경 변수 활용:**
- 배포 환경에서는 `process.env.PORT` 사용
- 로컬 개발에서는 기본값 5000 포트 사용

### 2.4 CORS 설정

```javascript
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
```

**CORS (Cross-Origin Resource Sharing) 이해:**
- 브라우저의 동일 출처 정책 우회
- 다른 도메인의 리소스 접근 허용
- 개발 환경에서 필수적

## 3. CORS 상세 설명

### 3.1 CORS가 필요한 이유

```javascript
// 문제 상황
// React 앱: http://localhost:3000
// API 서버: http://localhost:5000
// -> 다른 포트이므로 CORS 에러 발생

// 브라우저 에러 메시지
// "Access to fetch at 'http://localhost:5000/todos' 
// from origin 'http://localhost:3000' has been blocked by CORS policy"
```

### 3.2 CORS 헤더 상세

```javascript
// 모든 출처 허용 (개발용)
res.header('Access-Control-Allow-Origin', '*');

// 특정 출처만 허용 (프로덕션 권장)
res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');

// 여러 출처 허용
const allowedOrigins = ['http://localhost:3000', 'https://yourdomain.com'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.header('Access-Control-Allow-Origin', origin);
}

// 허용할 헤더 지정
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

// 허용할 HTTP 메서드 지정
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

// 쿠키 전송 허용 (필요시)
res.header('Access-Control-Allow-Credentials', 'true');
```

### 3.3 Preflight 요청 처리

```javascript
// OPTIONS 요청 처리 (Preflight)
server.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
  } else {
    next();
  }
});
```

## 4. database.json 구조 분석

### 현재 데이터 구조
```json
{
  "todos": [
    {
      "id": "8d2f",
      "title": "3",
      "completed": false
    },
    {
      "id": "5ec7", 
      "title": "1",
      "completed": false
    }
  ]
}
```

### 4.1 개선된 데이터 구조

```json
{
  "todos": [
    {
      "id": "1",
      "title": "React 프로젝트 완성하기",
      "completed": false,
      "priority": "high",
      "category": "개발",
      "dueDate": "2025-06-20T09:00:00.000Z",
      "createdAt": "2025-06-14T10:00:00.000Z",
      "updatedAt": "2025-06-14T10:00:00.000Z",
      "tags": ["react", "javascript", "프론트엔드"]
    },
    {
      "id": "2",
      "title": "운동하기",
      "completed": true,
      "priority": "medium",
      "category": "건강",
      "dueDate": null,
      "createdAt": "2025-06-13T08:00:00.000Z",
      "updatedAt": "2025-06-14T07:00:00.000Z",
      "tags": ["건강", "운동"]
    }
  ],
  "categories": [
    {
      "id": "1",
      "name": "개발",
      "color": "#3498db"
    },
    {
      "id": "2", 
      "name": "건강",
      "color": "#2ecc71"
    }
  ],
  "users": [
    {
      "id": "1",
      "name": "김개발",
      "email": "dev@example.com"
    }
  ]
}
```

### 4.2 JSON Server 자동 생성 엔드포인트

```javascript
// 기본 CRUD 엔드포인트 (todos 예시)
GET    /todos      // 모든 할 일 조회
GET    /todos/1    // ID가 1인 할 일 조회
POST   /todos      // 새 할 일 생성
PUT    /todos/1    // ID가 1인 할 일 전체 수정
PATCH  /todos/1    // ID가 1인 할 일 부분 수정
DELETE /todos/1    // ID가 1인 할 일 삭제

// 관계형 데이터 조회
GET /todos?categoryId=1    // 특정 카테고리의 할 일들
GET /todos?_expand=category // 카테고리 정보 포함해서 조회

// 정렬과 필터링
GET /todos?_sort=createdAt&_order=desc    // 생성일 기준 내림차순
GET /todos?completed=true                 // 완료된 할 일만
GET /todos?priority=high&completed=false  // 높은 우선순위, 미완료
GET /todos?q=React                        // 전체 텍스트 검색

// 페이지네이션
GET /todos?_page=1&_limit=10              // 첫 번째 페이지, 10개씩
```

## 5. 서버 확장과 커스터마이징

### 5.1 커스텀 라우트 추가

```javascript
// 커스텀 엔드포인트 추가
server.get('/api/stats', (req, res) => {
  const db = router.db; // 데이터베이스 접근
  const todos = db.get('todos').value();
  
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    byCategory: todos.reduce((acc, todo) => {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
      return acc;
    }, {})
  };
  
  res.json(stats);
});

// 검색 엔드포인트
server.get('/api/search', (req, res) => {
  const { q } = req.query;
  const db = router.db;
  const todos = db.get('todos').value();
  
  const results = todos.filter(todo => 
    todo.title.toLowerCase().includes(q.toLowerCase()) ||
    todo.category.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json(results);
});
```

### 5.2 미들웨어로 데이터 검증

```javascript
// 요청 데이터 검증 미들웨어
server.use('/api/todos', (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { title } = req.body;
    
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        error: '제목은 필수입니다.',
        code: 'TITLE_REQUIRED'
      });
    }
    
    if (title.length > 100) {
      return res.status(400).json({
        error: '제목은 100자를 초과할 수 없습니다.',
        code: 'TITLE_TOO_LONG'
      });
    }
  }
  
  next();
});

// ID 자동 생성 미들웨어
server.use('/api/todos', (req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = Math.random().toString(36).substr(2, 9);
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
  }
  
  if (req.method === 'PUT' || req.method === 'PATCH') {
    req.body.updatedAt = new Date().toISOString();
  }
  
  next();
});
```

### 5.3 응답 데이터 변환

```javascript
// 응답 데이터 후처리
server.use('/api/todos', (req, res, next) => {
  // 원본 send 함수 저장
  const originalSend = res.send;
  
  res.send = function(data) {
    if (res.statusCode === 200 && req.method === 'GET') {
      try {
        const parsedData = JSON.parse(data);
        
        // 배열인 경우 (목록 조회)
        if (Array.isArray(parsedData)) {
          const transformedData = parsedData.map(todo => ({
            ...todo,
            displayTitle: `${todo.priority === 'high' ? '🔥 ' : ''}${todo.title}`,
            isOverdue: new Date(todo.dueDate) < new Date() && !todo.completed
          }));
          
          originalSend.call(this, JSON.stringify(transformedData));
        } else {
          // 단일 객체인 경우
          const transformedData = {
            ...parsedData,
            displayTitle: `${parsedData.priority === 'high' ? '🔥 ' : ''}${parsedData.title}`,
            isOverdue: new Date(parsedData.dueDate) < new Date() && !parsedData.completed
          };
          
          originalSend.call(this, JSON.stringify(transformedData));
        }
      } catch (e) {
        originalSend.call(this, data);
      }
    } else {
      originalSend.call(this, data);
    }
  };
  
  next();
});
```

## 6. 환경별 서버 설정

### 6.1 개발 환경 설정

```javascript
// server-dev.js
const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  // 개발 환경용 로깅
  server.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
  
  // 개발용 지연 시뮬레이션
  server.use('/api', (req, res, next) => {
    setTimeout(next, Math.random() * 1000); // 0-1초 랜덤 지연
  });
}
```

### 6.2 프로덕션 환경 설정

```javascript
// 프로덕션 환경에서는 더 엄격한 CORS 설정
if (process.env.NODE_ENV === 'production') {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  
  server.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    next();
  });
}

// 환경 변수 기반 데이터베이스 파일
const dbFile = process.env.DB_FILE || 'database.json';
const router = jsonServer.router(dbFile);
```

## 7. 실습 과제

### 과제 1: 백업과 복원 기능

```javascript
// 데이터 백업 엔드포인트
server.get('/api/backup', (req, res) => {
  const db = router.db;
  const backup = {
    timestamp: new Date().toISOString(),
    data: db.getState()
  };
  
  res.setHeader('Content-Disposition', 'attachment; filename=backup.json');
  res.json(backup);
});

// 데이터 복원 엔드포인트
server.post('/api/restore', (req, res) => {
  try {
    const { data } = req.body;
    const db = router.db;
    
    db.setState(data);
    
    res.json({ message: '복원이 완료되었습니다.' });
  } catch (error) {
    res.status(400).json({ error: '복원에 실패했습니다.' });
  }
});
```

### 과제 2: 실시간 알림 시스템

```javascript
// WebSocket을 활용한 실시간 업데이트
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// 클라이언트 연결 관리
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  
  ws.on('close', () => {
    clients.delete(ws);
  });
});

// 데이터 변경 시 모든 클라이언트에 알림
server.use('/api/todos', (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    originalSend.call(this, data);
    
    // 성공적인 변경 작업인 경우 WebSocket으로 알림
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const message = {
        type: 'TODO_UPDATED',
        method: req.method,
        data: JSON.parse(data)
      };
      
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
  };
  
  next();
});
```

### 과제 3: API 문서 자동 생성

```javascript
// Swagger/OpenAPI 문서 생성
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'Simple Todo API built with JSON Server',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'], // API 주석이 있는 파일들
};

const specs = swaggerJsdoc(options);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: 모든 할 일 조회
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   completed:
 *                     type: boolean
 */
```

## 요약

이번 장에서는 server.js와 database.json을 통해 다음 개념들을 학습했습니다:

1. **JSON Server**: 빠른 REST API 프로토타이핑 도구
2. **CORS 설정**: 브라우저 동일 출처 정책 해결
3. **미들웨어**: Express 서버의 요청/응답 처리 파이프라인
4. **데이터베이스**: JSON 파일을 활용한 간단한 데이터 저장소
5. **서버 확장**: 커스텀 라우트와 기능 추가

## 다음 장 미리보기

다음 장에서는 jest.config.json을 분석하며 다음 내용을 학습합니다:
- Jest 테스트 프레임워크 설정
- 단위 테스트와 통합 테스트
- 코드 커버리지 측정
- 테스트 환경 구성
- 자동화된 테스트 실행

---

💡 **추가 학습 자료**
- [JSON Server 공식 문서](https://github.com/typicode/json-server)
- [Express.js 미들웨어 가이드](https://expressjs.com/ko/guide/using-middleware.html)
- [CORS 완전 가이드](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

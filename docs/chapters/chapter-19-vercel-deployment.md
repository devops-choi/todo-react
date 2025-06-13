# Chapter 19: Vercel 배포와 vercel.json 설정

## 학습 목표
- Vercel 플랫폼의 특징과 장점 이해
- vercel.json 설정 파일 구성과 활용
- 서버리스 함수를 활용한 백엔드 배포
- 풀스택 애플리케이션 배포 전략
- Vercel의 고급 기능과 최적화 방법

## 사전 준비사항
- Vercel 계정 생성
- Git 저장소 연결
- 서버리스 아키텍처 기본 개념

---

## 1. Vercel 플랫폼 개요

### 1.1 Vercel의 특징

```javascript
// Vercel의 주요 장점
✅ 즉시 배포 (Git push 시 자동)
✅ 글로벌 CDN
✅ 서버리스 함수 지원
✅ 자동 HTTPS
✅ 프리뷰 배포
✅ 무료 계층 제공
✅ 제로 설정 배포
```

### 1.2 GitHub Pages vs Vercel 비교

| 기능 | GitHub Pages | Vercel |
|------|-------------|--------|
| 정적 사이트 | ✅ | ✅ |
| 서버리스 함수 | ❌ | ✅ |
| 커스텀 도메인 | ✅ | ✅ |
| 자동 배포 | ✅ | ✅ |
| 프리뷰 배포 | ❌ | ✅ |
| 환경 변수 | 제한적 | ✅ |
| 성능 분석 | ❌ | ✅ |

## 2. vercel.json 설정 파일 분석

### 2.1 현재 설정 분석

```json
{
  "version": 2,
  "name": "react-remote-json-server",
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### 2.2 설정 옵션 상세 설명

```json
{
  // Vercel 플랫폼 버전
  "version": 2,
  
  // 프로젝트 이름
  "name": "react-remote-json-server",
  
  // 빌드 설정
  "builds": [
    {
      "src": "server.js",        // 소스 파일
      "use": "@vercel/node"      // Node.js 런타임 사용
    }
  ],
  
  // 라우팅 규칙
  "routes": [
    {
      "src": "/api/(.*)",        // /api/로 시작하는 모든 요청
      "dest": "/server.js"       // server.js로 프록시
    }
  ]
}
```

## 3. 풀스택 애플리케이션 배포 설정

### 3.1 React + Node.js 통합 배포

```json
{
  "version": 2,
  "name": "react-todo-fullstack",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    },
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "outputDirectory": "build"
}
```

### 3.2 환경 변수 설정

```json
{
  "env": {
    "NODE_ENV": "production",
    "DATABASE_URL": "@database-url"
  },
  "build": {
    "env": {
      "REACT_APP_API_URL": "https://your-app.vercel.app/api"
    }
  }
}
```

**Vercel 대시보드에서 환경 변수 설정:**
```bash
# Vercel CLI 사용
vercel env add REACT_APP_API_URL
vercel env add DATABASE_URL
vercel env add JWT_SECRET

# 환경별 설정
vercel env add NODE_ENV production --scope production
vercel env add NODE_ENV development --scope development
```

### 3.3 리다이렉트와 재작성 규칙

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/v1/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## 4. 서버리스 함수 구현

### 4.1 API 디렉터리 구조

```
api/
├── todos/
│   ├── index.js          // GET /api/todos
│   └── [id].js          // GET/PUT/DELETE /api/todos/[id]
├── auth/
│   ├── login.js         // POST /api/auth/login
│   └── register.js      // POST /api/auth/register
└── health.js            // GET /api/health
```

### 4.2 서버리스 함수 예시

```javascript
// api/todos/index.js
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const dbPath = join(process.cwd(), 'database.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    switch (req.method) {
      case 'GET':
        return res.status(200).json(db.todos);

      case 'POST':
        const newTodo = {
          id: Date.now().toString(),
          ...req.body,
          createdAt: new Date().toISOString()
        };
        
        db.todos.push(newTodo);
        writeFileSync(dbPath, JSON.stringify(db, null, 2));
        
        return res.status(201).json(newTodo);

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

### 4.3 동적 라우팅

```javascript
// api/todos/[id].js
export default function handler(req, res) {
  const { id } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const dbPath = join(process.cwd(), 'database.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf8'));

    switch (req.method) {
      case 'GET':
        const todo = db.todos.find(t => t.id === id);
        if (!todo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        return res.status(200).json(todo);

      case 'PUT':
        const todoIndex = db.todos.findIndex(t => t.id === id);
        if (todoIndex === -1) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        
        db.todos[todoIndex] = {
          ...db.todos[todoIndex],
          ...req.body,
          updatedAt: new Date().toISOString()
        };
        
        writeFileSync(dbPath, JSON.stringify(db, null, 2));
        return res.status(200).json(db.todos[todoIndex]);

      case 'DELETE':
        const deleteIndex = db.todos.findIndex(t => t.id === id);
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        
        db.todos.splice(deleteIndex, 1);
        writeFileSync(dbPath, JSON.stringify(db, null, 2));
        return res.status(200).json({ message: 'Todo deleted' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

## 5. 배포 최적화

### 5.1 성능 최적화 설정

```json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10
    }
  },
  "regions": ["icn1"],
  "framework": "create-react-app",
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "devCommand": "npm start"
}
```

### 5.2 캐싱 전략

```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### 5.3 이미지 최적화

```javascript
// next.config.js (Next.js 사용 시)
module.exports = {
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeImages: true,
  }
}

// React에서 최적화된 이미지 컴포넌트
function OptimizedImage({ src, alt, width, height }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoading(false);
    img.src = src;
  }, [src]);

  return (
    <div className="image-container">
      {loading && <div className="image-placeholder">로딩 중...</div>}
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onError={() => setImgSrc('/placeholder.jpg')}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}
```

## 6. 모니터링과 분석

### 6.1 Vercel Analytics 설정

```javascript
// src/index.js
import { Analytics } from '@vercel/analytics/react';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### 6.2 성능 모니터링

```javascript
// api/health.js
export default function handler(req, res) {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown'
  };

  res.status(200).json(healthCheck);
}

// 프론트엔드에서 헬스 체크
async function checkServerHealth() {
  try {
    const response = await fetch('/api/health');
    const health = await response.json();
    console.log('Server Health:', health);
    return health.status === 'OK';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}
```

### 6.3 에러 추적

```javascript
// utils/errorTracking.js
export function trackError(error, context = {}) {
  // Sentry, LogRocket 등 에러 추적 서비스로 전송
  if (process.env.NODE_ENV === 'production') {
    console.error('Error tracked:', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    });
  }
}

// 전역 에러 핸들러
window.addEventListener('error', (event) => {
  trackError(event.error, {
    type: 'JavaScript Error',
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

window.addEventListener('unhandledrejection', (event) => {
  trackError(new Error(event.reason), {
    type: 'Unhandled Promise Rejection'
  });
});
```

## 7. CI/CD와 Vercel 통합

### 7.1 GitHub Actions와 Vercel

```yaml
# .github/workflows/vercel-deploy.yml
name: Vercel Deployment

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Vercel CLI
      run: npm install --global vercel@latest
      
    - name: Pull Vercel Environment Information
      run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Build Project Artifacts
      run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Deploy Project Artifacts to Vercel
      run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```

### 7.2 자동 프리뷰 배포

```javascript
// vercel.json에 브랜치별 설정
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": true
    }
  },
  "github": {
    "autoJobCancelation": true,
    "autoAlias": true
  }
}
```

## 8. 실습 과제

### 8.1 데이터베이스 연결

```javascript
// api/db.js - 데이터베이스 유틸리티
import { MongoClient } from 'mongodb';

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  
  cachedClient = client;
  return client;
}

// api/todos/index.js - MongoDB 사용
import { connectToDatabase } from '../db';

export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db('todoapp');
  const collection = db.collection('todos');

  switch (req.method) {
    case 'GET':
      const todos = await collection.find({}).toArray();
      return res.status(200).json(todos);

    case 'POST':
      const result = await collection.insertOne({
        ...req.body,
        createdAt: new Date()
      });
      return res.status(201).json(result);

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
```

### 8.2 인증 시스템

```javascript
// api/auth/middleware.js
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// api/auth/login.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    // 사용자 조회 (데이터베이스에서)
    const user = await findUserByEmail(email);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### 8.3 실시간 기능

```javascript
// api/socket.js - WebSocket 핸들러
import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('todo-update', (data) => {
        socket.broadcast.emit('todo-updated', data);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }
  res.end();
}

// 클라이언트에서 Socket.IO 사용
import io from 'socket.io-client';

function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('todo-updated', (data) => {
      // 실시간 업데이트 처리
      console.log('Received update:', data);
    });

    return () => newSocket.close();
  }, []);

  return socket;
}
```

## 9. 비용 최적화

### 9.1 함수 실행 시간 최적화

```javascript
// 콜드 스타트 최소화
let dbConnection = null;

export default async function handler(req, res) {
  // 연결 재사용
  if (!dbConnection) {
    dbConnection = await connectToDatabase();
  }

  // 빠른 응답을 위한 캐싱
  const cacheKey = `todos_${req.query.page || 1}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  // 실제 데이터 조회
  const data = await fetchData();
  await redis.set(cacheKey, JSON.stringify(data), 'EX', 300); // 5분 캐시

  res.status(200).json(data);
}
```

### 9.2 대역폭 최적화

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "gzip"
        }
      ]
    }
  ]
}
```

## 요약

이번 장에서는 Vercel 배포를 통해 다음 개념들을 학습했습니다:

1. **Vercel 플랫폼**: 서버리스 배포의 장점과 특징
2. **vercel.json 설정**: 배포 환경 구성과 최적화
3. **서버리스 함수**: API 엔드포인트를 함수로 구현
4. **풀스택 배포**: 프론트엔드와 백엔드 통합 배포
5. **성능 최적화**: 캐싱, 모니터링, 비용 효율성

## 다음 장 미리보기

다음 장에서는 성능 최적화와 모범 사례를 학습하며 다음 내용을 다룹니다:
- React 성능 최적화 기법
- 메모이제이션과 지연 로딩
- 번들 크기 최적화
- 사용자 경험 개선
- 코드 품질과 유지보수성

---

💡 **추가 학습 자료**
- [Vercel 공식 문서](https://vercel.com/docs)
- [서버리스 아키텍처 가이드](https://aws.amazon.com/ko/serverless/)
- [JAMstack 개발 방법론](https://jamstack.org/)

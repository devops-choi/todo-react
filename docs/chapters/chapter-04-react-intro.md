# Chapter 4: React 소개와 개발 환경 설정

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 3: JavaScript 기초와 ES6+ 문법](./chapter-03-javascript-basics.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 5: package.json - 프로젝트 설정과 의존성 관리](./chapter-05-package-json.md)

---

## 📚 학습 목표
- React의 기본 개념과 특징 이해
- Create React App 프로젝트 구조 파악
- JSX 문법과 컴포넌트 개념 학습
- React 개발 도구와 환경 설정 방법
- 첫 번째 React 컴포넌트 만들기

## 🔗 필요한 사전 지식
- Chapter 1-3: HTML, CSS, JavaScript 기초
- ES6+ 문법에 대한 이해
- Node.js와 npm 기본 개념

---

## 1. React란 무엇인가?

**React**는 Facebook(현 Meta)에서 개발한 사용자 인터페이스(UI)를 구축하기 위한 JavaScript 라이브러리입니다.

### 1.1 React의 특징
- **컴포넌트 기반**: 재사용 가능한 UI 조각들로 구성
- **선언적 프로그래밍**: "무엇을" 만들지에 집중 (vs 명령적: "어떻게")
- **Virtual DOM**: 성능 최적화를 위한 가상 DOM 사용
- **단방향 데이터 흐름**: 예측 가능한 데이터 흐름

### 1.2 React vs 기존 DOM 조작
```html
<!-- 기존 방식 (명령적) -->
<div id="counter">
    <span id="count">0</span>
    <button onclick="increment()">+</button>
</div>

<script>
let count = 0;
function increment() {
    count++;
    document.getElementById('count').textContent = count;
}
</script>
```

```jsx
// React 방식 (선언적)
function Counter() {
    const [count, setCount] = React.useState(0);
    
    return (
        <div>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}
```

---

## 2. React의 핵심 개념

### 2.1 컴포넌트 (Components)
컴포넌트는 독립적이고 재사용 가능한 UI 조각입니다.

```jsx
// 함수형 컴포넌트 (권장)
function Welcome(props) {
    return <h1>안녕하세요, {props.name}님!</h1>;
}

// 클래스형 컴포넌트 (레거시)
class Welcome extends React.Component {
    render() {
        return <h1>안녕하세요, {this.props.name}님!</h1>;
    }
}

// 사용 방법
<Welcome name="홍길동" />
```

### 2.2 JSX (JavaScript XML)
JSX는 JavaScript 안에서 HTML과 유사한 문법을 사용할 수 있게 해주는 확장 문법입니다.

```jsx
// JSX 문법
const element = <h1>Hello, World!</h1>;

// JavaScript로 변환됨
const element = React.createElement('h1', null, 'Hello, World!');

// JSX에서 JavaScript 표현식 사용
const name = '홍길동';
const element = <h1>안녕하세요, {name}님!</h1>;

// 조건부 렌더링
const isLoggedIn = true;
const greeting = (
    <div>
        {isLoggedIn ? <h1>환영합니다!</h1> : <h1>로그인해주세요.</h1>}
    </div>
);
```

### 2.3 Props (Properties)
Props는 컴포넌트에 전달되는 읽기 전용 데이터입니다.

```jsx
// 부모 컴포넌트
function App() {
    return (
        <div>
            <UserCard name="홍길동" age={25} isAdmin={true} />
            <UserCard name="김철수" age={30} isAdmin={false} />
        </div>
    );
}

// 자식 컴포넌트
function UserCard(props) {
    return (
        <div className="user-card">
            <h2>{props.name}</h2>
            <p>나이: {props.age}</p>
            {props.isAdmin && <span>관리자</span>}
        </div>
    );
}

// 구조 분해 할당 사용
function UserCard({ name, age, isAdmin }) {
    return (
        <div className="user-card">
            <h2>{name}</h2>
            <p>나이: {age}</p>
            {isAdmin && <span>관리자</span>}
        </div>
    );
}
```

### 2.4 State (상태)
State는 컴포넌트의 내부 상태를 관리하는 데이터입니다.

```jsx
import React, { useState } from 'react';

function Counter() {
    // useState Hook 사용
    const [count, setCount] = useState(0);
    
    const increment = () => {
        setCount(count + 1);
    };
    
    const decrement = () => {
        setCount(count - 1);
    };
    
    return (
        <div>
            <h2>카운터: {count}</h2>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
        </div>
    );
}
```

---

## 3. Create React App 프로젝트 구조

### 3.1 프로젝트 생성
```bash
# Create React App 설치 및 프로젝트 생성
npx create-react-app my-todo-app
cd my-todo-app
npm start
```

### 3.2 프로젝트 구조 분석
```
my-todo-app/
├── public/                 # 정적 파일들
│   ├── index.html         # 메인 HTML 파일
│   ├── favicon.ico        # 파비콘
│   └── manifest.json      # PWA 설정
├── src/                   # 소스 코드
│   ├── index.js          # 앱의 진입점
│   ├── App.js            # 메인 App 컴포넌트
│   ├── App.css           # App 스타일
│   └── index.css         # 전역 스타일
├── package.json          # 의존성 및 스크립트
└── README.md            # 프로젝트 설명
```

### 3.3 핵심 파일들 분석

#### public/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
</head>
<body>
    <noscript>JavaScript를 활성화해주세요.</noscript>
    <div id="root"></div>
    <!-- React 앱이 여기에 렌더링됩니다 -->
</body>
</html>
```

#### src/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// React 18의 새로운 방식
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

#### src/App.js
```javascript
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>My Todo App</h1>
                <p>React로 만든 할 일 관리 앱</p>
            </header>
        </div>
    );
}

export default App;
```

---

## 4. JSX 문법 심화

### 4.1 JSX 규칙
```jsx
// 1. 단일 루트 요소 (React 17+에서는 Fragment 사용 가능)
function MyComponent() {
    return (
        <div>
            <h1>제목</h1>
            <p>내용</p>
        </div>
    );
}

// React.Fragment 또는 <> 사용
function MyComponent() {
    return (
        <>
            <h1>제목</h1>
            <p>내용</p>
        </>
    );
}

// 2. 모든 태그는 닫혀야 함
function MyComponent() {
    return (
        <div>
            <input type="text" />  {/* self-closing */}
            <img src="image.jpg" alt="이미지" />
        </div>
    );
}

// 3. 클래스 이름은 className 사용
function MyComponent() {
    return <div className="my-class">내용</div>;
}
```

### 4.2 JSX에서 JavaScript 표현식
```jsx
function TodoItem({ todo }) {
    const isCompleted = todo.completed;
    const completedClass = isCompleted ? 'completed' : '';
    
    return (
        <div className={`todo-item ${completedClass}`}>
            {/* 텍스트 표시 */}
            <span>{todo.text}</span>
            
            {/* 조건부 렌더링 */}
            {isCompleted && <span>✅</span>}
            
            {/* 인라인 스타일 */}
            <button 
                style={{
                    backgroundColor: isCompleted ? 'green' : 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px'
                }}
            >
                {isCompleted ? '완료됨' : '완료'}
            </button>
        </div>
    );
}
```

### 4.3 배열 렌더링과 key
```jsx
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>  {/* key는 필수! */}
                    <TodoItem todo={todo} />
                </li>
            ))}
        </ul>
    );
}

// key를 사용하는 이유
const todos = [
    { id: 1, text: '공부하기', completed: false },
    { id: 2, text: '운동하기', completed: true },
    { id: 3, text: '쇼핑하기', completed: false }
];
```

---

## 5. 이벤트 처리

### 5.1 이벤트 핸들러
```jsx
function TodoInput() {
    const [text, setText] = useState('');
    
    // 이벤트 핸들러 함수
    const handleChange = (event) => {
        setText(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 동작 방지
        if (text.trim()) {
            console.log('새 할 일:', text);
            setText(''); // 입력 필드 초기화
        }
    };
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="할 일을 입력하세요"
            />
            <button type="submit">추가</button>
        </form>
    );
}
```

### 5.2 인라인 이벤트 핸들러
```jsx
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className="todo-item">
            <span 
                onClick={() => onToggle(todo.id)}
                style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none' 
                }}
            >
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>
                삭제
            </button>
        </div>
    );
}
```

---

## 6. React Hooks 기초

### 6.1 useState Hook
```jsx
import React, { useState } from 'react';

function MultipleState() {
    // 여러 상태 관리
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    
    // 객체 상태 관리
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
    });
    
    const updateUser = (field, value) => {
        setUser(prevUser => ({
            ...prevUser,  // 기존 객체 복사
            [field]: value // 특정 필드 업데이트
        }));
    };
    
    return (
        <div>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
            />
            <button onClick={() => setAge(age + 1)}>
                나이: {age}
            </button>
        </div>
    );
}
```

### 6.2 useEffect Hook
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // 컴포넌트 마운트 시 실행
    useEffect(() => {
        console.log('컴포넌트가 마운트됨');
        
        // 데이터 가져오기 시뮬레이션
        setTimeout(() => {
            setData({ message: 'Hello, World!' });
            setLoading(false);
        }, 2000);
        
        // 정리 함수 (컴포넌트 언마운트 시 실행)
        return () => {
            console.log('컴포넌트가 언마운트됨');
        };
    }, []); // 빈 배열: 마운트 시에만 실행
    
    // 특정 상태가 변경될 때마다 실행
    useEffect(() => {
        console.log('데이터가 변경됨:', data);
    }, [data]); // data가 변경될 때마다 실행
    
    if (loading) {
        return <div>로딩 중...</div>;
    }
    
    return <div>{data.message}</div>;
}
```

---

## 7. 실습: 간단한 Todo 앱 만들기

### 7.1 기본 구조 설정
```jsx
import React, { useState } from 'react';
import './App.css';

function App() {
    const [todos, setTodos] = useState([
        { id: 1, text: '프로젝트 기획', completed: false },
        { id: 2, text: 'UI 디자인', completed: true },
        { id: 3, text: '코딩 시작', completed: false }
    ]);
    
    const [inputText, setInputText] = useState('');
    
    // 새 할 일 추가
    const addTodo = () => {
        if (inputText.trim()) {
            const newTodo = {
                id: Date.now(), // 간단한 ID 생성
                text: inputText,
                completed: false
            };
            setTodos([...todos, newTodo]);
            setInputText('');
        }
    };
    
    // 할 일 완료 상태 토글
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id 
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };
    
    // 할 일 삭제
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    return (
        <div className="App">
            <h1>📝 My Todo App</h1>
            
            {/* 입력 영역 */}
            <div className="todo-input">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="할 일을 입력하세요"
                />
                <button onClick={addTodo}>추가</button>
            </div>
            
            {/* 할 일 목록 */}
            <div className="todo-list">
                {todos.map(todo => (
                    <div key={todo.id} className="todo-item">
                        <span 
                            onClick={() => toggleTodo(todo.id)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>
                            삭제
                        </button>
                    </div>
                ))}
            </div>
            
            {/* 통계 */}
            <div className="todo-stats">
                전체: {todos.length} | 
                완료: {todos.filter(todo => todo.completed).length} | 
                남은 일: {todos.filter(todo => !todo.completed).length}
            </div>
        </div>
    );
}

export default App;
```

### 7.2 CSS 스타일링
```css
.App {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.todo-input {
    display: flex;
    margin-bottom: 20px;
}

.todo-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
}

.todo-input button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #eee;
    margin-bottom: 5px;
    border-radius: 4px;
}

.todo-item span {
    flex: 1;
    padding: 5px;
}

.todo-item button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.todo-stats {
    margin-top: 20px;
    text-align: center;
    color: #666;
}
```

---

## 8. 개발 도구와 디버깅

### 8.1 React Developer Tools
```bash
# Chrome 확장 프로그램 설치
# React Developer Tools를 설치하면 브라우저에서 React 컴포넌트 구조를 확인할 수 있습니다.
```

### 8.2 일반적인 에러와 해결법
```jsx
// 1. key prop 누락 에러
// 잘못된 예
{todos.map(todo => <div>{todo.text}</div>)}

// 올바른 예
{todos.map(todo => <div key={todo.id}>{todo.text}</div>)}

// 2. state 직접 수정 에러
// 잘못된 예
const addTodo = () => {
    todos.push(newTodo); // 직접 수정 X
    setTodos(todos);
};

// 올바른 예
const addTodo = () => {
    setTodos([...todos, newTodo]); // 새 배열 생성
};
```

---

## 9. 확인 문제

### 문제 1: 컴포넌트 분리
위의 Todo 앱을 TodoInput, TodoList, TodoItem 컴포넌트로 분리해보세요.

### 문제 2: Props 전달
부모 컴포넌트에서 자식 컴포넌트로 데이터와 함수를 props로 전달해보세요.

### 문제 3: 조건부 렌더링
할 일이 없을 때 "할 일이 없습니다" 메시지를 표시하도록 수정해보세요.

---

## 10. 다음 챕터 예고

**Chapter 5: package.json - 프로젝트 설정과 의존성 관리**에서는:
- package.json 파일의 구조와 역할
- npm scripts와 의존성 관리
- 개발 도구와 빌드 설정
- 프로젝트 메타데이터 관리

React의 기본기를 다졌다면, 이제 프로젝트 설정 파일들을 자세히 살펴보겠습니다!

---

## 📝 핵심 요약

1. **React는 컴포넌트 기반의 UI 라이브러리**
2. **JSX로 HTML과 JavaScript를 함께 작성**
3. **Props로 데이터 전달, State로 상태 관리**
4. **useState와 useEffect Hook으로 상태와 생명주기 관리**
5. **이벤트 처리로 사용자 상호작용 구현**

다음 챕터에서 프로젝트 설정의 핵심인 package.json을 학습하겠습니다!

---

## 📚 네비게이션

- **◀ 이전**: [Chapter 3: JavaScript 기초와 ES6+ 문법](./chapter-03-javascript-basics.md)
- **🏠 목차**: [전체 목차](./README.md)
- **▶ 다음**: [Chapter 5: package.json - 프로젝트 설정과 의존성 관리](./chapter-05-package-json.md)

---

**🎉 Chapter 4 완료! 수고하셨습니다! 🚀**

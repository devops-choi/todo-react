# Chapter 3: JavaScript 기초와 ES6+ 문법

## 📚 학습 목표
- JavaScript의 기본 개념과 역할 이해
- 변수, 데이터 타입, 연산자 학습
- 함수와 스코프의 개념 파악
- ES6+ 최신 문법 익히기
- React에서 사용되는 JavaScript 패턴 이해

## 🔗 필요한 사전 지식
- Chapter 1: HTML 기초
- Chapter 2: CSS 기초
- 프로그래밍의 기본 개념

---

## 1. JavaScript란 무엇인가?

**JavaScript**는 웹 페이지에 동적인 기능을 추가하는 프로그래밍 언어입니다.

### 1.1 JavaScript의 역할
- **동적 상호작용**: 사용자와의 상호작용 처리
- **DOM 조작**: HTML 요소의 동적 변경
- **비동기 처리**: 서버와의 데이터 통신
- **이벤트 처리**: 클릭, 입력 등의 사용자 행동 반응

### 1.2 JavaScript 실행 환경
```javascript
// 브라우저에서 실행
console.log('Hello, World!');

// Node.js에서 실행 (서버 사이드)
console.log('서버에서 실행되는 JavaScript');
```

---

## 2. 변수와 데이터 타입

### 2.1 변수 선언 (ES6+)
```javascript
// let: 재할당 가능한 변수
let name = '홍길동';
name = '김철수';  // 재할당 가능

// const: 재할당 불가능한 상수
const age = 25;
// age = 30;  // 에러 발생!

// var: 구형 문법 (사용 권장하지 않음)
var oldVariable = 'old';
```

### 2.2 데이터 타입
```javascript
// 원시 타입 (Primitive Types)
let text = 'Hello';           // string
let number = 42;              // number
let boolean = true;           // boolean
let empty = null;             // null
let unknown = undefined;      // undefined
let symbol = Symbol('id');    // symbol

// 참조 타입 (Reference Types)
let array = [1, 2, 3];                    // array
let object = { name: '홍길동', age: 25 }; // object
let func = function() { return 'hello'; }; // function
```

### 2.3 템플릿 리터럴 (ES6+)
```javascript
const name = '홍길동';
const age = 25;

// 기존 방식
const message1 = '안녕하세요, ' + name + '님! 나이는 ' + age + '세입니다.';

// 템플릿 리터럴 (권장)
const message2 = `안녕하세요, ${name}님! 나이는 ${age}세입니다.`;

// 여러 줄 문자열
const multiLine = `
    첫 번째 줄
    두 번째 줄
    세 번째 줄
`;
```

---

## 3. 연산자와 조건문

### 3.1 산술 연산자
```javascript
let a = 10;
let b = 3;

console.log(a + b);    // 13 (덧셈)
console.log(a - b);    // 7  (뺄셈)
console.log(a * b);    // 30 (곱셈)
console.log(a / b);    // 3.333... (나눗셈)
console.log(a % b);    // 1  (나머지)
console.log(a ** b);   // 1000 (거듭제곱)
```

### 3.2 비교 연산자
```javascript
// 동등 비교 (타입 변환 발생)
console.log(5 == '5');     // true
console.log(true == 1);    // true

// 일치 비교 (타입 변환 없음) - 권장
console.log(5 === '5');    // false
console.log(true === 1);   // false

// 부등 비교
console.log(10 > 5);       // true
console.log(10 <= 10);     // true
console.log(5 !== '5');    // true (타입이 다름)
```

### 3.3 논리 연산자
```javascript
// AND 연산자 (&&)
const isAdult = age >= 18;
const hasLicense = true;
const canDrive = isAdult && hasLicense;

// OR 연산자 (||)
const isWeekend = day === 'Saturday' || day === 'Sunday';

// NOT 연산자 (!)
const isNotEmpty = !array.length === 0;

// 단축 평가 (Short-circuit evaluation)
const defaultName = name || 'Unknown';  // name이 falsy면 'Unknown'
const message = isLoggedIn && 'Welcome!'; // isLoggedIn이 true면 'Welcome!'
```

### 3.4 조건문
```javascript
// if-else 문
const score = 85;

if (score >= 90) {
    console.log('A학점');
} else if (score >= 80) {
    console.log('B학점');
} else if (score >= 70) {
    console.log('C학점');
} else {
    console.log('재시험');
}

// 삼항 연산자 (간단한 조건)
const result = score >= 80 ? 'Pass' : 'Fail';

// switch 문
const day = 'Monday';
switch (day) {
    case 'Monday':
        console.log('월요일입니다.');
        break;
    case 'Friday':
        console.log('금요일입니다.');
        break;
    default:
        console.log('평일입니다.');
}
```

---

## 4. 배열과 객체

### 4.1 배열 (Array)
```javascript
// 배열 생성
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null];

// 배열 접근과 수정
console.log(fruits[0]);    // 'apple'
fruits[0] = 'grape';       // 첫 번째 요소 변경

// 배열 메서드
fruits.push('mango');      // 끝에 추가
fruits.pop();              // 끝에서 제거
fruits.unshift('kiwi');    // 앞에 추가
fruits.shift();            // 앞에서 제거

// 배열 길이
console.log(fruits.length); // 배열의 길이
```

### 4.2 객체 (Object)
```javascript
// 객체 생성
const person = {
    name: '홍길동',
    age: 25,
    city: 'Seoul',
    hobbies: ['reading', 'swimming'],
    greet: function() {
        return `안녕하세요, ${this.name}입니다.`;
    }
};

// 객체 접근과 수정
console.log(person.name);        // 점 표기법
console.log(person['age']);      // 대괄호 표기법

person.age = 26;                 // 값 수정
person.job = 'Developer';        // 새 속성 추가
delete person.city;              // 속성 삭제

// 메서드 호출
console.log(person.greet());
```

### 4.3 구조 분해 할당 (Destructuring)
```javascript
// 배열 구조 분해
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first);  // 'red'

// 객체 구조 분해
const user = { name: '김철수', age: 30, city: 'Busan' };
const { name, age, city } = user;
console.log(name);   // '김철수'

// 기본값과 별명
const { name: userName = 'Unknown', country = 'Korea' } = user;
console.log(userName);  // '김철수'
console.log(country);   // 'Korea'
```

---

## 5. 함수 (Functions)

### 5.1 함수 선언과 표현
```javascript
// 함수 선언문 (Function Declaration)
function greet(name) {
    return `안녕하세요, ${name}님!`;
}

// 함수 표현식 (Function Expression)
const greet2 = function(name) {
    return `안녕하세요, ${name}님!`;
};

// 화살표 함수 (Arrow Function) - ES6+
const greet3 = (name) => {
    return `안녕하세요, ${name}님!`;
};

// 간단한 화살표 함수
const greet4 = name => `안녕하세요, ${name}님!`;
const add = (a, b) => a + b;
```

### 5.2 함수의 매개변수
```javascript
// 기본 매개변수 (ES6+)
function createUser(name, age = 20, city = 'Seoul') {
    return { name, age, city };
}

console.log(createUser('홍길동'));           // age: 20, city: 'Seoul'
console.log(createUser('김철수', 25));       // age: 25, city: 'Seoul'

// 나머지 매개변수 (Rest Parameters)
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 전개 연산자 (Spread Operator)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

### 5.3 스코프와 클로저
```javascript
// 전역 스코프
const globalVar = 'global';

function outerFunction() {
    // 함수 스코프
    const outerVar = 'outer';
    
    function innerFunction() {
        // 내부 함수 스코프
        const innerVar = 'inner';
        console.log(globalVar);  // 접근 가능
        console.log(outerVar);   // 접근 가능
        console.log(innerVar);   // 접근 가능
    }
    
    return innerFunction;
}

// 클로저: 내부 함수가 외부 함수의 변수에 접근
const closure = outerFunction();
closure(); // 여전히 outerVar에 접근 가능
```

---

## 6. 배열 고차 함수 (Higher Order Functions)

### 6.1 map() - 변형
```javascript
const numbers = [1, 2, 3, 4, 5];

// 각 요소를 2배로 만들기
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 객체 배열 변형
const users = [
    { name: '홍길동', age: 25 },
    { name: '김철수', age: 30 }
];

const names = users.map(user => user.name);
console.log(names); // ['홍길동', '김철수']
```

### 6.2 filter() - 필터링
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 짝수만 필터링
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// 조건에 맞는 객체 필터링
const adults = users.filter(user => user.age >= 18);
```

### 6.3 reduce() - 축약
```javascript
const numbers = [1, 2, 3, 4, 5];

// 합계 계산
const sum = numbers.reduce((total, current) => total + current, 0);
console.log(sum); // 15

// 객체로 변환
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { apple: 2, banana: 2, orange: 1 }
```

### 6.4 find()와 includes()
```javascript
const users = [
    { id: 1, name: '홍길동', age: 25 },
    { id: 2, name: '김철수', age: 30 }
];

// 조건에 맞는 첫 번째 요소 찾기
const user = users.find(user => user.age > 25);
console.log(user); // { id: 2, name: '김철수', age: 30 }

// 배열에 요소가 있는지 확인
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.includes(3)); // true
console.log(numbers.includes(10)); // false
```

---

## 7. 비동기 처리

### 7.1 콜백 함수 (Callback)
```javascript
// 전통적인 콜백 방식
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: '홍길동' };
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log('데이터 받음:', data);
});
```

### 7.2 Promise
```javascript
// Promise 생성
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: '홍길동' });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
}

// Promise 사용
fetchUserData(1)
    .then(user => {
        console.log('사용자:', user);
        return user.id;
    })
    .then(id => {
        console.log('사용자 ID:', id);
    })
    .catch(error => {
        console.error('에러:', error);
    });
```

### 7.3 Async/Await (ES8+)
```javascript
// async/await 사용
async function getUserData(userId) {
    try {
        const user = await fetchUserData(userId);
        console.log('사용자:', user);
        return user;
    } catch (error) {
        console.error('에러:', error);
        throw error;
    }
}

// 사용 예시
async function main() {
    try {
        const user = await getUserData(1);
        console.log('받은 데이터:', user);
    } catch (error) {
        console.log('처리 실패');
    }
}
```

---

## 8. ES6+ 추가 기능들

### 8.1 클래스 (Class)
```javascript
// ES6+ 클래스 문법
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `안녕하세요, ${this.name}입니다.`;
    }
    
    // 정적 메서드
    static species() {
        return 'Homo sapiens';
    }
}

// 클래스 사용
const person = new Person('홍길동', 25);
console.log(person.greet());
console.log(Person.species());

// 상속
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // 부모 생성자 호출
        this.grade = grade;
    }
    
    study() {
        return `${this.name}이(가) 공부하고 있습니다.`;
    }
}
```

### 8.2 모듈 (Module)
```javascript
// math.js (모듈 내보내기)
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// 기본 내보내기
export default function subtract(a, b) {
    return a - b;
}

// main.js (모듈 가져오기)
import subtract, { PI, add, multiply } from './math.js';
// 또는
import * as Math from './math.js';

console.log(add(2, 3));        // 5
console.log(PI);               // 3.14159
console.log(subtract(5, 2));   // 3
```

---

## 9. React에서 자주 사용하는 JavaScript 패턴

### 9.1 조건부 렌더링
```javascript
// JSX에서 조건부 렌더링
const TodoItem = ({ todo, isLoggedIn }) => {
    return (
        <div>
            {/* 조건부 렌더링 */}
            {isLoggedIn && <button>삭제</button>}
            
            {/* 삼항 연산자 */}
            <span>{todo.completed ? '완료' : '진행중'}</span>
            
            {/* 논리 연산자 */}
            {todo.text || '내용 없음'}
        </div>
    );
};
```

### 9.2 배열 렌더링
```javascript
const TodoList = ({ todos }) => {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                </li>
            ))}
        </ul>
    );
};
```

### 9.3 이벤트 핸들링
```javascript
const TodoInput = () => {
    const [text, setText] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 동작 방지
        if (text.trim()) {
            onAddTodo(text);
            setText('');
        }
    };
    
    const handleChange = (e) => {
        setText(e.target.value);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={text}
                onChange={handleChange}
                placeholder="할 일을 입력하세요"
            />
            <button type="submit">추가</button>
        </form>
    );
};
```

---

## 10. 실습: Todo 앱 로직 구현

### 10.1 Todo 데이터 관리
```javascript
// Todo 아이템 생성
const createTodo = (text) => {
    return {
        id: Date.now(), // 간단한 ID 생성
        text: text.trim(),
        completed: false,
        createdAt: new Date()
    };
};

// Todo 상태 토글
const toggleTodo = (todos, id) => {
    return todos.map(todo => 
        todo.id === id 
            ? { ...todo, completed: !todo.completed }
            : todo
    );
};

// Todo 삭제
const deleteTodo = (todos, id) => {
    return todos.filter(todo => todo.id !== id);
};

// Todo 필터링
const filterTodos = (todos, filter) => {
    switch (filter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
};
```

---

## 11. 확인 문제

### 문제 1: 배열 메서드 체이닝
다음 데이터에서 성인만 필터링하고, 이름만 추출하여 배열로 만드세요:
```javascript
const users = [
    { name: '홍길동', age: 17 },
    { name: '김철수', age: 25 },
    { name: '이영희', age: 19 },
    { name: '박민수', age: 16 }
];
```

### 문제 2: 구조 분해 할당
다음 객체에서 name과 age를 추출하고, email이 없으면 기본값을 설정하세요:
```javascript
const user = {
    name: '홍길동',
    age: 25,
    city: 'Seoul'
};
```

### 문제 3: 비동기 함수 작성
사용자 ID를 받아서 사용자 정보를 반환하는 async 함수를 작성하세요.

---

## 12. 다음 챕터 예고

**Chapter 4: React 소개와 개발 환경 설정**에서는:
- React의 기본 개념과 특징
- Create React App 프로젝트 구조
- JSX 문법과 컴포넌트의 개념
- 개발 도구와 디버깅 방법

JavaScript 기초를 마스터했다면, 이제 React의 세계로 들어가보겠습니다!

---

## 📝 핵심 요약

1. **let/const로 변수 선언**, **템플릿 리터럴 활용**
2. **구조 분해 할당으로 코드 간소화**
3. **화살표 함수와 고차 함수 활용**
4. **비동기 처리는 async/await 사용**
5. **모듈 시스템으로 코드 구조화**

다음 챕터에서 React의 핵심 개념들을 학습하겠습니다!

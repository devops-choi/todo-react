# Chapter 17: jest.config.json - 테스팅 환경 구성

## 학습 목표
- Jest 테스트 프레임워크 설정 이해
- 테스트 환경 구성과 최적화
- 코드 커버리지 측정과 임계값 설정
- React 컴포넌트 테스트 환경 구축
- 테스트 실행 전략과 성능 최적화

## 사전 준비사항
- Jest 테스트 프레임워크 기초
- JavaScript 모듈 시스템
- React 컴포넌트 구조

---

## 1. Jest 테스트 프레임워크 개요

Jest는 Facebook에서 개발한 JavaScript 테스트 프레임워크로, React 애플리케이션의 기본 테스트 도구입니다.

### 주요 특징
- **Zero Configuration**: 기본 설정만으로 바로 사용 가능
- **Snapshot Testing**: UI 컴포넌트 변경 감지
- **Mocking**: 의존성 모킹과 가짜 구현
- **Code Coverage**: 코드 커버리지 자동 측정
- **Parallel Testing**: 병렬 테스트 실행

## 2. jest.config.json 상세 분석

### 전체 설정 구조
```json
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
  "moduleNameMapping": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { "presets": ["@babel/preset-react"] }]
  },
  "testTimeout": 30000,
  "maxWorkers": 1,
  "runInBand": true,
  "verbose": true,
  "bail": false,
  "forceExit": true,
  "detectOpenHandles": true,
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!src/**/*.test.{js,jsx}",
    "!src/test-utils.js"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  },
  "testSequencer": "<rootDir>/testSequencer.js"
}
```

## 3. 핵심 설정 옵션 해석

### 3.1 테스트 환경 설정

```json
"testEnvironment": "jsdom"
```

**jsdom 환경의 특징:**
- 브라우저 DOM API를 Node.js에서 시뮬레이션
- `document`, `window` 객체 제공
- React 컴포넌트 렌더링에 필수적

```javascript
// jsdom 환경에서 가능한 것들
describe('DOM API 테스트', () => {
  test('document 객체 사용', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello World';
    expect(div.textContent).toBe('Hello World');
  });

  test('window 객체 사용', () => {
    Object.defineProperty(window, 'location', {
      value: { href: 'http://localhost:3000' }
    });
    expect(window.location.href).toBe('http://localhost:3000');
  });
});
```

### 3.2 초기 설정 파일

```json
"setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]
```

**setupTests.js 예시:**
```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// 전역 모킹
global.fetch = jest.fn();

// 콘솔 에러 억제 (필요시)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// 전역 테스트 설정
beforeEach(() => {
  fetch.mockClear();
});

// 커스텀 매처 추가
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});
```

### 3.3 모듈 매핑

```json
"moduleNameMapping": {
  "\\.(css|less|scss|sass)$": "identity-obj-proxy"
}
```

**CSS 모듈 처리:**
- CSS 파일을 JavaScript 객체로 변환
- 클래스명을 문자열로 반환

```javascript
// 실제 CSS 모듈
// styles.module.css
.button { background-color: blue; }
.primary { color: white; }

// 테스트에서의 변환 결과
import styles from './styles.module.css';
console.log(styles.button); // "button"
console.log(styles.primary); // "primary"

// 테스트 작성 예시
test('CSS 클래스 적용 테스트', () => {
  render(<Button className={styles.primary}>클릭</Button>);
  expect(screen.getByRole('button')).toHaveClass('primary');
});
```

### 3.4 파일 변환 설정

```json
"transform": {
  "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { "presets": ["@babel/preset-react"] }]
}
```

**Babel 변환 과정:**
- JSX를 일반 JavaScript로 변환
- ES6+ 문법을 호환 가능한 코드로 변환

```javascript
// 원본 JSX 코드
const Component = () => {
  return <div className="test">Hello</div>;
};

// Babel 변환 후
const Component = () => {
  return React.createElement("div", { className: "test" }, "Hello");
};
```

## 4. 실행 성능 설정

### 4.1 타임아웃과 워커 설정

```json
"testTimeout": 30000,
"maxWorkers": 1,
"runInBand": true
```

**설정 해석:**
- `testTimeout`: 개별 테스트 최대 실행 시간 (30초)
- `maxWorkers`: 병렬 실행 워커 수 (1개로 제한)
- `runInBand`: 순차 실행 모드

```javascript
// 긴 실행 시간이 필요한 테스트
test('긴 작업 테스트', async () => {
  const result = await someTimeConsumingOperation();
  expect(result).toBeDefined();
}, 25000); // 25초 타임아웃
```

### 4.2 디버깅 설정

```json
"verbose": true,
"bail": false,
"forceExit": true,
"detectOpenHandles": true
```

**각 옵션의 역할:**
- `verbose`: 상세한 테스트 결과 출력
- `bail`: 첫 번째 실패 시 중단하지 않음
- `forceExit`: 강제 종료 허용
- `detectOpenHandles`: 열린 핸들 감지

## 5. 코드 커버리지 설정

### 5.1 커버리지 수집 대상

```json
"collectCoverageFrom": [
  "src/**/*.{js,jsx}",
  "!src/index.js",
  "!src/reportWebVitals.js",
  "!src/**/*.test.{js,jsx}",
  "!src/test-utils.js"
]
```

**패턴 설명:**
- `src/**/*.{js,jsx}`: src 폴더의 모든 JS/JSX 파일
- `!src/index.js`: index.js 제외
- `!src/**/*.test.{js,jsx}`: 테스트 파일 제외

### 5.2 커버리지 임계값

```json
"coverageThreshold": {
  "global": {
    "branches": 70,
    "functions": 70,
    "lines": 70,
    "statements": 70
  }
}
```

**커버리지 유형:**
- **Lines**: 실행된 코드 라인 비율
- **Functions**: 호출된 함수 비율
- **Branches**: 실행된 분기문 비율 (if, switch 등)
- **Statements**: 실행된 명령문 비율

```javascript
// 커버리지 측정 예시
function calculateDiscount(price, userType) {
  if (userType === 'premium') {    // Branch 1
    return price * 0.2;           // Statement 1
  } else if (userType === 'vip') { // Branch 2
    return price * 0.3;           // Statement 2
  }
  return 0;                       // Statement 3
}

// 테스트: 모든 브랜치 커버
test('모든 할인 타입 테스트', () => {
  expect(calculateDiscount(100, 'premium')).toBe(20);
  expect(calculateDiscount(100, 'vip')).toBe(30);
  expect(calculateDiscount(100, 'normal')).toBe(0);
});
```

## 6. 실제 테스트 작성 예시

### 6.1 컴포넌트 테스트

```javascript
// TodoItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem 컴포넌트', () => {
  const mockTodo = {
    id: '1',
    title: '테스트 할 일',
    completed: false
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test('할 일 제목이 올바르게 렌더링된다', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('테스트 할 일')).toBeInTheDocument();
  });

  test('체크박스 클릭 시 onToggle이 호출된다', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  test('삭제 버튼 클릭 시 onDelete가 호출된다', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('완료된 할 일은 올바른 스타일이 적용된다', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
    
    const titleElement = screen.getByText('테스트 할 일');
    expect(titleElement).toHaveClass('completed');
  });
});
```

### 6.2 서비스 테스트

```javascript
// todoService.test.js
import { createTodoItem, selectTodoList } from '../services/todoService';

// fetch 모킹
global.fetch = jest.fn();

describe('todoService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('createTodoItem', () => {
    test('새 할 일을 성공적으로 생성한다', async () => {
      const newTodo = { title: '새 할 일', completed: false };
      const createdTodo = { id: '1', ...newTodo };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdTodo,
      });

      const result = await createTodoItem(newTodo);

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      expect(result).toEqual(createdTodo);
    });

    test('서버 오류 시 에러를 던진다', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(createTodoItem({}))
        .rejects
        .toThrow('HTTP error! status: 500');
    });
  });

  describe('selectTodoList', () => {
    test('할 일 목록을 성공적으로 조회한다', async () => {
      const todos = [
        { id: '1', title: '할 일 1', completed: false },
        { id: '2', title: '할 일 2', completed: true }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => todos,
      });

      const result = await selectTodoList();

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/todos', {
        method: 'GET'
      });
      expect(result).toEqual(todos);
    });
  });
});
```

### 6.3 통합 테스트

```javascript
// TodoContainer.integration.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoContainer from '../components/TodoContainer';

// 서비스 모킹
jest.mock('../services/todoService', () => ({
  selectTodoList: jest.fn(),
  createTodoItem: jest.fn(),
  updateTodoItem: jest.fn(),
  deleteTodoItem: jest.fn(),
}));

import todoService from '../services/todoService';

describe('TodoContainer 통합 테스트', () => {
  beforeEach(() => {
    todoService.selectTodoList.mockClear();
    todoService.createTodoItem.mockClear();
    todoService.updateTodoItem.mockClear();
    todoService.deleteTodoItem.mockClear();
  });

  test('전체 할 일 관리 플로우 테스트', async () => {
    // 초기 목록 로드
    todoService.selectTodoList.mockResolvedValue([]);
    
    render(<TodoContainer />);
    
    // 빈 상태 확인
    expect(screen.getByText('아직 할 일이 없습니다.')).toBeInTheDocument();

    // 새 할 일 추가
    const newTodo = { id: '1', title: '새 할 일', completed: false };
    todoService.createTodoItem.mockResolvedValue(newTodo);

    const input = screen.getByPlaceholderText('할 일을 입력하세요');
    const addButton = screen.getByText('추가');

    fireEvent.change(input, { target: { value: '새 할 일' } });
    fireEvent.click(addButton);

    // 추가된 할 일 확인
    await waitFor(() => {
      expect(screen.getByText('새 할 일')).toBeInTheDocument();
    });

    // 할 일 완료 처리
    const updatedTodo = { ...newTodo, completed: true };
    todoService.updateTodoItem.mockResolvedValue(updatedTodo);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(todoService.updateTodoItem).toHaveBeenCalledWith('1', updatedTodo);
    });

    // 할 일 삭제
    todoService.deleteTodoItem.mockResolvedValue({});

    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(todoService.deleteTodoItem).toHaveBeenCalledWith('1');
      expect(screen.queryByText('새 할 일')).not.toBeInTheDocument();
    });
  });
});
```

## 7. 실습 과제

### 과제 1: 스냅샷 테스트 구현

```javascript
// TodoItem.snapshot.test.js
import React from 'react';
import { render } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem 스냅샷 테스트', () => {
  const mockProps = {
    todo: { id: '1', title: '테스트', completed: false },
    onToggle: jest.fn(),
    onDelete: jest.fn(),
  };

  test('기본 상태 스냅샷', () => {
    const { container } = render(<TodoItem {...mockProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('완료 상태 스냅샷', () => {
    const completedProps = {
      ...mockProps,
      todo: { ...mockProps.todo, completed: true }
    };
    const { container } = render(<TodoItem {...completedProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### 과제 2: 성능 테스트

```javascript
// performance.test.js
import React from 'react';
import { render } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('성능 테스트', () => {
  test('많은 데이터 렌더링 성능', () => {
    const manyTodos = Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      title: `할 일 ${i}`,
      completed: i % 2 === 0
    }));

    const startTime = performance.now();
    
    render(
      <TodoList 
        items={manyTodos} 
        onToggle={jest.fn()} 
        onDelete={jest.fn()} 
      />
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // 렌더링 시간이 100ms 이하여야 함
    expect(renderTime).toBeLessThan(100);
  });
});
```

### 과제 3: E2E 테스트 설정

```javascript
// e2e/todoApp.test.js
import puppeteer from 'puppeteer';

describe('Todo App E2E 테스트', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('할 일 추가 플로우', async () => {
    await page.goto('http://localhost:3000');
    
    // 입력 필드에 텍스트 입력
    await page.type('input[placeholder="할 일을 입력하세요"]', '테스트 할 일');
    
    // 추가 버튼 클릭
    await page.click('button[type="submit"]');
    
    // 추가된 할 일 확인
    await page.waitForSelector('text/테스트 할 일');
    
    const todoExists = await page.$('text/테스트 할 일');
    expect(todoExists).toBeTruthy();
  });
});
```

## 8. 테스트 실행 스크립트

### package.json 테스트 스크립트
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand",
    "test:update-snapshots": "jest --updateSnapshot"
  }
}
```

### CI/CD 환경에서의 테스트
```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run test:ci
      
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v1
```

## 요약

이번 장에서는 jest.config.json을 통해 다음 개념들을 학습했습니다:

1. **Jest 설정**: 테스트 환경과 실행 옵션 구성
2. **코드 커버리지**: 테스트 품질 측정과 임계값 설정
3. **모듈 매핑**: CSS 모듈과 정적 자산 처리
4. **테스트 작성**: 단위, 통합, E2E 테스트 패턴
5. **성능 최적화**: 테스트 실행 속도와 안정성 개선

## 다음 장 미리보기

다음 장에서는 빌드와 배포 과정을 학습하며 다음 내용을 다룹니다:
- React 애플리케이션 빌드 과정
- GitHub Pages 배포 설정
- 정적 자산 최적화
- 환경 변수 관리
- CI/CD 파이프라인 구축

---

💡 **추가 학습 자료**
- [Jest 공식 문서](https://jestjs.io/docs/getting-started)
- [React Testing Library 가이드](https://testing-library.com/docs/react-testing-library/intro/)
- [테스트 주도 개발(TDD) 방법론](https://ko.wikipedia.org/wiki/%ED%85%8C%EC%8A%A4%ED%8A%B8_%EC%A3%BC%EB%8F%84_%EA%B0%9C%EB%B0%9C)

# 시험 5: 테스팅, 배포, 성능 최적화 (챕터 17-20)

**시험 시간**: 90분  
**만점**: 100점  
**총 문항**: 25문항

---

## 📝 문제 유형별 배점
- 객관식 (5지선다): 각 3점 × 8문항 = 24점
- 주관식 (단답형): 각 4점 × 5문항 = 20점
- 빈칸 채우기: 각 4점 × 5문항 = 20점
- 서술형: 각 18점 × 2문항 = 36점

---

## 📋 객관식 문제 (3점 × 8문항 = 24점)

### 1. Jest에서 테스트 케이스를 정의할 때 사용하는 함수는?
① describe()
② test() 또는 it()
③ expect()
④ beforeEach()
⑤ afterEach()

### 2. GitHub Pages 배포 시 빌드된 파일들이 위치해야 하는 브랜치는?
① main
② master
③ gh-pages
④ deploy
⑤ build

### 3. Vercel에서 배포 설정을 관리하는 파일은?
① package.json
② vercel.json
③ deploy.json
④ config.json
⑤ build.json

### 4. React에서 성능 최적화를 위해 사용하는 Hook이 아닌 것은?
① useMemo
② useCallback
③ useEffect
④ React.memo
⑤ useState

### 5. 번들 크기를 줄이기 위한 최적화 기법은?
① Code Splitting
② Tree Shaking
③ Lazy Loading
④ Minification
⑤ 위의 모든 것

### 6. CI/CD에서 CI는 무엇의 약자인가?
① Code Integration
② Continuous Integration
③ Component Integration
④ Custom Integration
⑤ Complete Integration

### 7. 웹 애플리케이션의 성능을 측정하는 도구로 올바른 것은?
① React DevTools
② Chrome DevTools - Lighthouse
③ VS Code
④ npm
⑤ GitHub

### 8. PWA(Progressive Web App)의 핵심 기술이 아닌 것은?
① Service Worker
② Web App Manifest
③ HTTPS
④ jQuery
⑤ Push Notifications

---

## ✏️ 주관식 문제 (4점 × 5문항 = 20점)

### 9. Jest에서 컴포넌트 렌더링을 테스트하기 위해 주로 사용하는 라이브러리의 이름을 작성하세요.
**답안**: _________________

### 10. GitHub Actions workflow 파일이 위치하는 디렉터리 경로를 작성하세요.
**답안**: _________________

### 11. React에서 코드 분할(Code Splitting)을 구현하는 두 가지 방법을 작성하세요.
**답안**: _________________

### 12. 웹 성능을 측정하는 Core Web Vitals 지표 3가지를 작성하세요.
**답안**: _________________

### 13. npm 스크립트에서 환경 변수를 설정하는 방법을 작성하세요.
**답안**: _________________

---

## 📝 빈칸 채우기 (4점 × 5문항 = 20점)

### 14. Jest 설정 파일의 기본 이름은 `______.config.js` 입니다.

### 15. React 컴포넌트를 동적으로 import할 때 사용하는 함수는 `React.______()` 입니다.

### 16. 성능 최적화를 위해 함수를 메모이제이션할 때 사용하는 Hook은 `______` 입니다.

### 17. GitHub Pages에서 SPA 라우팅 문제를 해결하기 위한 설정은 `______` 속성을 추가하는 것입니다.

### 18. 웹팩에서 번들 분석을 위해 생성되는 파일은 `bundle-______.json` 입니다.

---

## 📖 서술형 문제 (18점 × 2문항 = 36점)

### 19. React 애플리케이션의 성능 최적화 기법들을 설명하고, 각각의 사용 시나리오와 구현 방법을 구체적인 코드 예시와 함께 서술하세요. (18점)

**다음 항목들을 포함하여 작성하세요**:
- React.memo
- useMemo
- useCallback
- 코드 분할 (Code Splitting)

**평가 기준**:
- 각 최적화 기법의 정확한 설명 (8점)
- 사용 시나리오의 적절성 (4점)
- 코드 예시의 정확성 (4점)
- 설명의 논리성과 완성도 (2점)

**답안 작성란**:
```
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
```

### 20. 현대적인 웹 애플리케이션 배포 전략에 대해 설명하고, GitHub Actions를 사용한 CI/CD 파이프라인 구축 방법을 단계별로 서술하세요. Vercel과 GitHub Pages 배포의 차이점도 함께 설명하세요. (18점)

**다음 항목들을 포함하여 작성하세요**:
- CI/CD의 개념과 장점
- GitHub Actions workflow 구성
- Vercel vs GitHub Pages 비교
- 배포 자동화의 이점

**평가 기준**:
- CI/CD 개념의 정확한 이해 (4점)
- GitHub Actions workflow 설명 (5점)
- Vercel과 GitHub Pages 비교 (5점)
- 배포 전략의 실무적 이해 (3점)
- 설명의 체계성 (1점)

**답안 작성란**:
```
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
```

---

## 💻 실습 문제 (보너스 15점)

### 다음 요구사항에 맞는 GitHub Actions workflow 파일을 작성하세요.

**요구사항**:
- main 브랜치에 push 시 자동 실행
- Node.js 18 환경에서 테스트 실행
- 테스트 통과 시 빌드 실행
- 빌드 성공 시 GitHub Pages에 배포

**답안 작성란**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  # 여기에 workflow를 작성하세요
  test-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      # 체크아웃 단계 작성
      
    - name: Setup Node.js
      # Node.js 설정 단계 작성
      
    - name: Install dependencies
      # 의존성 설치 단계 작성
      
    - name: Run tests
      # 테스트 실행 단계 작성
      
    - name: Build project
      # 빌드 단계 작성
      
    - name: Deploy to GitHub Pages
      # 배포 단계 작성
```

---

## 🔧 디버깅 문제 (보너스 10점)

### 다음 React 컴포넌트에서 성능 문제를 찾고 최적화된 버전을 작성하세요.

```javascript
function TodoList({ todos, filter }) {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const expensiveCalculation = () => {
    return todos.reduce((sum, todo) => sum + todo.title.length, 0);
  };

  return (
    <div>
      <p>Total characters: {expensiveCalculation()}</p>
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={() => console.log('toggle', todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}
```

**성능 문제점들**: _________________

**최적화된 코드**:
```javascript
// 여기에 최적화된 코드를 작성하세요








```

---

## 🔍 정답 및 해설

### 객관식 정답
1. ② 2. ③ 3. ② 4. ④ 5. ⑤ 6. ② 7. ② 8. ④

### 주관식 정답
9. React Testing Library (또는 Enzyme)
10. .github/workflows/
11. React.lazy()와 Suspense, 동적 import()
12. LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
13. `"start": "NODE_ENV=production react-scripts start"` (크로스플랫폼: cross-env 사용)

### 빈칸 채우기 정답
14. jest
15. lazy
16. useCallback
17. homepage (package.json에서)
18. analyzer

### 서술형 모범답안

19. **React 성능 최적화 기법들**

**React.memo**: 컴포넌트의 props가 변경되지 않으면 리렌더링을 방지
```javascript
const TodoItem = React.memo(({ todo, onToggle }) => {
  return <li onClick={() => onToggle(todo.id)}>{todo.title}</li>;
});
```

**useMemo**: 값비싼 계산 결과를 메모이제이션
```javascript
const expensiveValue = useMemo(() => {
  return todos.filter(todo => todo.completed).length;
}, [todos]);
```

**useCallback**: 함수를 메모이제이션하여 불필요한 리렌더링 방지
```javascript
const handleToggle = useCallback((id) => {
  setTodos(todos => todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
}, []);
```

**코드 분할**: 번들 크기를 줄이고 초기 로딩 속도 향상
```javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

20. **현대적 웹 애플리케이션 배포 전략**

**CI/CD 개념**: 지속적 통합과 지속적 배포를 통해 코드 변경사항을 자동으로 테스트하고 배포하는 방식입니다. 

**GitHub Actions workflow**:
1. 코드 push 시 자동 트리거
2. 테스트 환경 설정
3. 의존성 설치 및 테스트 실행
4. 빌드 수행
5. 배포 플랫폼에 자동 배포

**Vercel vs GitHub Pages**:
- Vercel: 서버리스 함수 지원, 자동 HTTPS, 글로벌 CDN
- GitHub Pages: 정적 사이트만 지원, 무료, GitHub 통합

**배포 자동화 이점**: 수동 에러 감소, 빠른 피드백, 일관된 배포 프로세스

### 실습 문제 모범답안

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

### 디버깅 문제 정답

**성능 문제점들**: 
- 매 렌더링마다 필터링 수행
- 매 렌더링마다 expensiveCalculation 실행
- 인라인 함수로 인한 불필요한 리렌더링

**최적화된 코드**:
```javascript
function TodoList({ todos, filter }) {
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true;
    });
  }, [todos, filter]);

  const totalCharacters = useMemo(() => {
    return todos.reduce((sum, todo) => sum + todo.title.length, 0);
  }, [todos]);

  const handleToggle = useCallback((id) => {
    console.log('toggle', id);
  }, []);

  return (
    <div>
      <p>Total characters: {totalCharacters}</p>
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}
```

---

**시험 종료 후 체크리스트**:
- [ ] 모든 성능 최적화 개념 이해 확인
- [ ] 배포 관련 용어와 도구 확인
- [ ] 테스팅 관련 문법과 도구 확인
- [ ] YAML 문법과 GitHub Actions 구문 확인

---

**🎓 최종 학습 점검 리스트**:
- [ ] Jest와 React Testing Library 기본 사용법
- [ ] GitHub Actions workflow 작성법
- [ ] Vercel과 GitHub Pages 배포 차이점
- [ ] React 성능 최적화 Hook들
- [ ] 번들 최적화와 코드 분할
- [ ] CI/CD 파이프라인 구성
- [ ] 웹 성능 측정과 개선 방법

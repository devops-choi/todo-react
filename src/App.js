/**
 * App.js - React Todo 애플리케이션의 메인 컴포넌트
 * 
 * 이 파일은 React 애플리케이션의 최상위 컴포넌트로서 다음과 같은 역할을 합니다:
 * - 전체 애플리케이션의 구조와 레이아웃을 정의
 * - TodoContainer 컴포넌트를 렌더링하여 Todo 기능을 제공
 * - 글로벌 CSS 스타일을 적용
 * 
 * @file App.js
 * @description React Todo 애플리케이션의 루트 컴포넌트
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

// App 컴포넌트의 CSS 스타일시트 import
import './App.css';

// Todo 기능을 담당하는 메인 컨테이너 컴포넌트 import
import TodoContainer from './components/TodoContainer';

/**
 * App 컴포넌트 - 애플리케이션의 최상위 컴포넌트
 * 
 * React 애플리케이션의 진입점 역할을 하며, 전체 애플리케이션의
 * 구조를 정의하고 TodoContainer를 렌더링합니다.
 * 
 * @returns {JSX.Element} 애플리케이션의 메인 JSX 구조
 */
function App() {
  return (
    <div className="App">
      {/* Todo 기능을 제공하는 메인 컨테이너 컴포넌트 */}
      <TodoContainer />
    </div>
  );
}

// App 컴포넌트를 기본 export로 내보내기
// 다른 파일에서 import App from './App' 형태로 사용 가능
export default App;

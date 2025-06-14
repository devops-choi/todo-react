/**
 * index.js - React 애플리케이션의 진입점 (Entry Point)
 * 
 * 이 파일은 React 애플리케이션이 시작되는 지점으로 다음과 같은 역할을 합니다:
 * - React DOM을 HTML의 root 엘리먼트에 마운트
 * - StrictMode를 통한 개발 시 추가 검사 활성화
 * - 웹 성능 측정 도구 설정
 * 
 * @file index.js
 * @description React 애플리케이션 진입점 및 DOM 렌더링 설정
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

// React 라이브러리 core 모듈 import
import React from 'react';

// React DOM 클라이언트 API - React 18의 새로운 렌더링 API
import ReactDOM from 'react-dom/client';

// 전역 CSS 스타일시트 - 애플리케이션 전체에 적용되는 기본 스타일
import './index.css';

// 메인 App 컴포넌트 import
import App from './App';

// 웹 성능 측정 도구 - Core Web Vitals 메트릭 수집용
import reportWebVitals from './reportWebVitals';

// React 18의 새로운 createRoot API를 사용하여 루트 생성
// HTML의 id="root" 엘리먼트를 찾아서 React 앱의 마운트 포인트로 설정
const root = ReactDOM.createRoot(document.getElementById('root'));

// React 애플리케이션을 DOM에 렌더링
root.render(
  // StrictMode: 개발 모드에서 추가적인 검사와 경고를 제공
  // - 컴포넌트의 생명주기 메서드 중복 호출 검사
  // - 안전하지 않은 생명주기 메서드 경고
  // - 레거시 문자열 ref 사용 경고
  // - 예상치 못한 부작용 검출
  <React.StrictMode>
    {/* 메인 App 컴포넌트 렌더링 */}
    <App />
  </React.StrictMode>
);

// 웹 성능 측정 시작
// Core Web Vitals 메트릭을 측정하여 애플리케이션 성능을 모니터링
// 개발 단계에서는 console.log로 확인 가능하며,
// 프로덕션에서는 analytics 엔드포인트로 데이터 전송 가능
// 사용법: reportWebVitals(console.log) 또는 reportWebVitals()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

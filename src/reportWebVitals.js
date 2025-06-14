/**
 * reportWebVitals.js - 웹 성능 측정 유틸리티
 * 
 * 이 파일은 웹 애플리케이션의 성능을 측정하는 기능을 제공합니다.
 * Core Web Vitals 메트릭을 수집하여 사용자 경험을 개선하는 데 도움을 줍니다.
 * 
 * Core Web Vitals 지표:
 * - CLS (Cumulative Layout Shift): 누적 레이아웃 이동
 * - FID (First Input Delay): 최초 입력 지연
 * - FCP (First Contentful Paint): 최초 콘텐츠풀 페인트
 * - LCP (Largest Contentful Paint): 최대 콘텐츠풀 페인트
 * - TTFB (Time to First Byte): 최초 바이트까지의 시간
 * 
 * @file reportWebVitals.js
 * @description 웹 성능 메트릭 측정 및 리포팅 도구
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

/**
 * 웹 성능 메트릭을 측정하고 리포팅하는 함수
 * 
 * @param {Function} onPerfEntry - 성능 데이터를 처리할 콜백 함수
 *                                 예: console.log, analytics 전송 함수 등
 * 
 * 사용 예시:
 * - reportWebVitals(console.log): 콘솔에 메트릭 출력
 * - reportWebVitals(sendToAnalytics): 분석 서비스로 데이터 전송
 * - reportWebVitals(): 기본 설정으로 측정만 실행
 */
const reportWebVitals = onPerfEntry => {
  // 콜백 함수가 제공되고 유효한 함수인지 확인
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // web-vitals 라이브러리를 동적으로 import (코드 스플리팅)
    // 성능 측정이 필요할 때만 라이브러리를 로드하여 번들 크기 최적화
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // CLS (Cumulative Layout Shift) 측정
      // 페이지 로딩 중 예상치 못한 레이아웃 변화 측정
      getCLS(onPerfEntry);
      
      // FID (First Input Delay) 측정  
      // 사용자가 페이지와 처음 상호작용할 때까지의 지연 시간
      getFID(onPerfEntry);
      
      // FCP (First Contentful Paint) 측정
      // 첫 번째 콘텐츠가 화면에 렌더링되는 시간
      getFCP(onPerfEntry);
      
      // LCP (Largest Contentful Paint) 측정
      // 가장 큰 콘텐츠 요소가 화면에 렌더링되는 시간
      getLCP(onPerfEntry);
      
      // TTFB (Time to First Byte) 측정
      // 브라우저가 서버로부터 첫 바이트를 받는 시간
      getTTFB(onPerfEntry);
    });
  }
};

// reportWebVitals 함수를 기본 export로 내보내기
export default reportWebVitals;

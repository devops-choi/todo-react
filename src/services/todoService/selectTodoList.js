/**
 * selectTodoList.js - Todo 목록 조회 API 함수
 * 
 * 이 파일은 서버로부터 전체 Todo 목록을 조회하는 API 함수를 정의합니다.
 * HTTP GET 요청을 통해 백엔드 서버에서 모든 Todo 아이템들을 가져옵니다.
 * 
 * 주요 기능:
 * - 백엔드 API 서버에 GET 요청 전송
 * - HTTP 응답 상태 코드 검증
 * - JSON 응답 데이터 파싱 및 반환
 * - 에러 상황 처리 및 예외 throw
 * 
 * @file selectTodoList.js
 * @description 전체 Todo 목록을 서버에서 조회하는 API 함수
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

/**
 * 서버에서 전체 Todo 목록을 조회하는 비동기 함수
 * 
 * 이 함수는 백엔드 API 서버의 /todos 엔드포인트에 GET 요청을 보내서
 * 저장된 모든 Todo 아이템들을 배열 형태로 받아옵니다.
 * 
 * @async
 * @function selectTodoList
 * @returns {Promise<Array<Object>>} Todo 아이템들의 배열을 담은 Promise
 * 
 * @throws {Error} HTTP 요청 실패 시 에러 객체를 throw
 * 
 * 반환되는 Todo 객체 구조:
 * ```javascript
 * {
 *   id: string | number,    // 고유 식별자
 *   title: string,          // Todo 제목
 *   completed: boolean,     // 완료 여부
 *   createdAt: string       // 생성 일시 (ISO 문자열)
 * }
 * ```
 * 
 * 사용 예시:
 * ```javascript
 * try {
 *   const todos = await selectTodoList();
 *   console.log('받아온 Todo 목록:', todos);
 * } catch (error) {
 *   console.error('Todo 목록 조회 실패:', error.message);
 * }
 * ```
 */
export function selectTodoList() {
  // fetch API를 사용하여 HTTP GET 요청 전송
  return fetch('http://localhost:5000/todos', { method: 'GET' }).then(
    response => {
      // HTTP 응답 상태 코드 검증
      // response.ok는 상태 코드가 200-299 범위일 때 true
      if (!response.ok) {
        // 요청 실패 시 상태 코드를 포함한 에러 메시지와 함께 예외 발생
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // 성공적인 응답의 경우 JSON 데이터 파싱하여 반환
      // response.json()은 Promise<Array<Object>>를 반환
      return response.json();
    }
  );
}

// selectTodoList 함수를 기본 export로도 내보내기
// import selectTodoList from './selectTodoList' 형태로 사용 가능
export default selectTodoList;

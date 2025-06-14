/**
 * selectTodoItem.js - 특정 Todo 아이템 조회 API 함수
 * 
 * 이 파일은 서버로부터 특정 ID의 Todo 아이템을 조회하는 API 함수를 정의합니다.
 * HTTP GET 요청을 통해 백엔드 서버에서 지정된 ID에 해당하는 
 * 하나의 Todo 아이템을 가져옵니다.
 * 
 * 주요 기능:
 * - 특정 ID를 가진 Todo 아이템만 조회
 * - RESTful API 패턴 사용 (GET /todos/:id)
 * - HTTP 응답 상태 코드 검증 및 에러 처리
 * - JSON 응답 데이터 파싱 및 반환
 * 
 * @file selectTodoItem.js
 * @description 특정 ID의 Todo 아이템을 서버에서 조회하는 API 함수
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

/**
 * 서버에서 특정 ID의 Todo 아이템을 조회하는 비동기 함수
 * 
 * 이 함수는 백엔드 API 서버의 /todos/:id 엔드포인트에 GET 요청을 보내서
 * 지정된 ID에 해당하는 하나의 Todo 아이템을 받아옵니다.
 * 주로 Todo 상세보기나 수정 전 데이터 로드에 사용됩니다.
 * 
 * @async
 * @function selectTodoItem
 * @param {string|number} id - 조회할 Todo 아이템의 고유 식별자
 * @returns {Promise<Object>} 조회된 Todo 아이템 객체를 담은 Promise
 * 
 * @throws {Error} HTTP 요청 실패 시 에러 객체를 throw
 *                 - 404 Not Found: 해당 ID의 Todo가 존재하지 않음
 *                 - 500 Internal Server Error: 서버 내부 오류
 * 
 * 반환되는 Todo 객체 구조:
 * ```javascript
 * {
 *   id: string | number,    // 고유 식별자
 *   title: string,          // Todo 제목
 *   completed: boolean,     // 완료 여부
 *   createdAt: string,      // 생성 일시 (ISO 문자열)
 *   updatedAt: string       // 최종 수정 일시 (ISO 문자열)
 * }
 * ```
 * 
 * 사용 예시:
 * ```javascript
 * try {
 *   const todo = await selectTodoItem(123);
 *   console.log('조회된 Todo:', todo);
 * } catch (error) {
 *   if (error.message.includes('404')) {
 *     console.error('해당 Todo를 찾을 수 없습니다.');
 *   } else {
 *     console.error('Todo 조회 실패:', error.message);
 *   }
 * }
 * ```
 */
export function selectTodoItem(id) {
  // fetch API를 사용하여 특정 ID의 Todo에 HTTP GET 요청 전송
  // 템플릿 리터럴을 사용하여 동적 URL 생성 (/todos/123 형태)
  return fetch(`http://localhost:5000/todos/${id}`, { method: 'GET' }).then(
    response => {
      // HTTP 응답 상태 코드 검증
      // response.ok는 상태 코드가 200-299 범위일 때 true
      if (!response.ok) {
        // 요청 실패 시 상태 코드를 포함한 에러 메시지와 함께 예외 발생
        // 404일 경우 "Todo not found", 500일 경우 "Server error" 등
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // 성공적인 응답의 경우 JSON 데이터 파싱하여 반환
      // response.json()은 Promise<Object>를 반환 (단일 Todo 객체)
      return response.json();
    }
  );
}

// selectTodoItem 함수를 기본 export로도 내보내기
// import selectTodoItem from './selectTodoItem' 형태로 사용 가능
export default selectTodoItem;

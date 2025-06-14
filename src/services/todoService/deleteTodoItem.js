/**
 * deleteTodoItem.js - Todo 아이템 삭제 API 함수
 * 
 * 이 파일은 서버에서 특정 Todo 아이템을 삭제하는 API 함수를 정의합니다.
 * HTTP DELETE 요청을 통해 지정된 ID의 Todo 아이템을 
 * 데이터베이스에서 영구적으로 제거합니다.
 * 
 * 주요 기능:
 * - 특정 ID를 가진 Todo 아이템 영구 삭제
 * - RESTful API 패턴 준수 (DELETE /todos/:id)
 * - 삭제 확인 응답 처리
 * - 에러 상황 처리 및 예외 관리
 * 
 * @file deleteTodoItem.js
 * @description 특정 Todo 아이템을 서버에서 삭제하는 API 함수
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

/**
 * 서버에서 특정 ID의 Todo 아이템을 삭제하는 비동기 함수
 * 
 * 이 함수는 백엔드 API 서버의 /todos/:id 엔드포인트에 DELETE 요청을 보내서
 * 지정된 ID에 해당하는 Todo 아이템을 데이터베이스에서 영구적으로 삭제합니다.
 * 삭제는 되돌릴 수 없는 작업이므로 신중하게 사용해야 합니다.
 * 
 * @async
 * @function deleteTodoItem
 * @param {string|number} id - 삭제할 Todo 아이템의 고유 식별자
 * @returns {Promise<Object>} 삭제 결과를 담은 응답 객체 Promise
 * 
 * @throws {Error} HTTP 요청 실패 시 에러 객체를 throw
 *                 - 404 Not Found: 해당 ID의 Todo가 존재하지 않음
 *                 - 403 Forbidden: 삭제 권한이 없음
 *                 - 500 Internal Server Error: 서버 내부 오류
 * 
 * 반환되는 응답 객체 구조:
 * ```javascript
 * {
 *   success: boolean,        // 삭제 성공 여부
 *   message: string,         // 삭제 결과 메시지
 *   deletedId: string        // 삭제된 Todo의 ID (확인용)
 * }
 * ```
 * 
 * 사용 예시:
 * ```javascript
 * try {
 *   // 사용자 확인 후 삭제 실행
 *   if (confirm('정말로 삭제하시겠습니까?')) {
 *     const result = await deleteTodoItem(123);
 *     console.log('삭제 완료:', result.message);
 *   }
 * } catch (error) {
 *   if (error.message.includes('404')) {
 *     console.error('삭제할 Todo를 찾을 수 없습니다.');
 *   } else {
 *     console.error('Todo 삭제 실패:', error.message);
 *   }
 * }
 * ```
 * 
 * 주의사항:
 * - 삭제는 영구적이며 되돌릴 수 없습니다
 * - 삭제 전 사용자 확인을 받는 것이 좋습니다
 * - 네트워크 오류 시 삭제가 실패할 수 있으므로 에러 처리가 필요합니다
 */
export function deleteTodoItem(id) {
  // fetch API를 사용하여 특정 ID의 Todo에 HTTP DELETE 요청 전송
  // 템플릿 리터럴을 사용하여 동적 URL 생성 (/todos/123 형태)
  return fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' }).then(
    response => {
      // HTTP 응답 상태 코드 검증
      // 200 OK, 204 No Content 등의 성공 상태 코드 확인
      if (!response.ok) {
        // 요청 실패 시 상태 코드를 포함한 에러 메시지와 함께 예외 발생
        // 404일 경우 "Todo not found", 403일 경우 "Forbidden" 등
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // 성공적인 응답의 경우 JSON 데이터 파싱하여 반환
      // 일반적으로 삭제 확인 메시지나 결과 객체가 반환됨
      // 일부 서버는 204 No Content로 빈 응답을 보낼 수도 있음
      return response.json();
    }
  );
}

// deleteTodoItem 함수를 기본 export로도 내보내기
// import deleteTodoItem from './deleteTodoItem' 형태로 사용 가능
export default deleteTodoItem;

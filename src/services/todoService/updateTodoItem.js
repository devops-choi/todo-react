/**
 * updateTodoItem.js - Todo 아이템 수정 API 함수
 * 
 * 이 파일은 기존 Todo 아이템의 정보를 수정하는 API 함수를 정의합니다.
 * HTTP PUT 요청을 통해 지정된 ID의 Todo 아이템을 
 * 새로운 데이터로 업데이트합니다.
 * 
 * 주요 기능:
 * - 특정 ID의 Todo 아이템 전체 정보 교체 (PUT 방식)
 * - 완료 상태 토글, 제목 수정 등에 활용
 * - RESTful API 패턴 준수 (PUT /todos/:id)
 * - 수정된 Todo 객체 반환
 * 
 * @file updateTodoItem.js
 * @description 기존 Todo 아이템을 수정하는 API 함수
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

/**
 * 기존 Todo 아이템을 수정하는 비동기 함수
 * 
 * 이 함수는 지정된 ID의 Todo 아이템을 새로운 데이터로 업데이트합니다.
 * HTTP PUT 메서드를 사용하여 전체 리소스를 교체하는 방식으로 동작하며,
 * 주로 완료 상태 토글이나 제목 수정에 사용됩니다.
 * 
 * @async
 * @function updateTodoItem
 * @param {string|number} id - 수정할 Todo 아이템의 고유 식별자
 * @param {Object} item - 업데이트할 Todo 데이터
 * @param {string} [item.title] - 수정할 Todo 제목 (선택적)
 * @param {boolean} [item.completed] - 수정할 완료 상태 (선택적)
 * @returns {Promise<Object>} 수정된 Todo 아이템 객체를 담은 Promise
 * 
 * @throws {Error} HTTP 요청 실패 시 에러 객체를 throw
 *                 - 404 Not Found: 해당 ID의 Todo가 존재하지 않음
 *                 - 400 Bad Request: 잘못된 요청 데이터
 *                 - 500 Internal Server Error: 서버 내부 오류
 * 
 * 입력 데이터 예시:
 * ```javascript
 * // 완료 상태만 변경
 * {
 *   title: "기존 제목",
 *   completed: true
 * }
 * 
 * // 제목과 완료 상태 모두 변경
 * {
 *   title: "수정된 제목",
 *   completed: false
 * }
 * ```
 * 
 * 반환되는 Todo 객체 구조:
 * ```javascript
 * {
 *   id: string | number,    // 고유 식별자 (변경되지 않음)
 *   title: string,          // 수정된 Todo 제목
 *   completed: boolean,     // 수정된 완료 여부
 *   createdAt: string,      // 생성 일시 (변경되지 않음)
 *   updatedAt: string       // 수정 일시 (서버에서 자동 갱신)
 * }
 * ```
 * 
 * 사용 예시:
 * ```javascript
 * try {
 *   // 완료 상태 토글
 *   const updatedTodo = await updateTodoItem(123, {
 *     title: "기존 제목",
 *     completed: true
 *   });
 *   console.log('수정된 Todo:', updatedTodo);
 * } catch (error) {
 *   console.error('Todo 수정 실패:', error.message);
 * }
 * ```
 */
export function updateTodoItem(id, item) {
  // fetch API를 사용하여 특정 ID의 Todo에 HTTP PUT 요청 전송
  // 템플릿 리터럴을 사용하여 동적 URL 생성 (/todos/123 형태)
  return fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PUT',                               // HTTP 메서드를 PUT으로 설정 (전체 리소스 교체)
    headers: {
      'Content-Type': 'application/json',        // 요청 본문이 JSON 형태임을 명시
    },
    body: JSON.stringify(item),                  // JavaScript 객체를 JSON 문자열로 변환
  }).then(response => {
    // HTTP 응답 상태 코드 검증
    // 200 OK, 204 No Content 등의 성공 상태 코드 확인
    if (!response.ok) {
      // 요청 실패 시 상태 코드를 포함한 에러 메시지와 함께 예외 발생
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 성공적인 응답의 경우 서버에서 반환된 JSON 데이터 파싱
    // 일반적으로 수정된 Todo 객체가 반환됨
    return response.json();
  });
}

// updateTodoItem 함수를 기본 export로도 내보내기
// import updateTodoItem from './updateTodoItem' 형태로 사용 가능
export default updateTodoItem;

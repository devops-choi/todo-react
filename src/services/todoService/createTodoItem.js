/**
 * createTodoItem.js - Todo 아이템 생성 API 함수
 * 
 * 이 파일은 새로운 Todo 아이템을 서버에 생성(저장)하는 API 함수를 정의합니다.
 * HTTP POST 요청을 통해 클라이언트에서 입력받은 Todo 데이터를 
 * 백엔드 서버로 전송하여 데이터베이스에 저장합니다.
 * 
 * 주요 기능:
 * - 새 Todo 데이터를 JSON 형태로 서버에 전송
 * - HTTP POST 요청 및 적절한 헤더 설정
 * - 서버 응답 처리 및 에러 핸들링
 * - 생성된 Todo 객체 반환
 * 
 * @file createTodoItem.js
 * @description 새로운 Todo 아이템을 서버에 생성하는 API 함수
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

/**
 * 새로운 Todo 아이템을 서버에 생성하는 비동기 함수
 * 
 * 이 함수는 클라이언트에서 입력받은 Todo 데이터를 
 * 백엔드 API 서버의 /todos 엔드포인트에 POST 요청으로 전송하여
 * 새로운 Todo 아이템을 데이터베이스에 저장합니다.
 * 
 * @async
 * @function createTodoItem
 * @param {Object} item - 생성할 Todo 아이템 데이터
 * @param {string} item.title - Todo의 제목 (필수)
 * @param {boolean} [item.completed=false] - Todo의 완료 상태 (선택적, 기본값 false)
 * @returns {Promise<Object>} 서버에서 생성된 Todo 객체를 담은 Promise
 * 
 * @throws {Error} HTTP 요청 실패 시 에러 객체를 throw
 * 
 * 입력 데이터 예시:
 * ```javascript
 * {
 *   title: "새로운 할 일",
 *   completed: false
 * }
 * ```
 * 
 * 반환되는 Todo 객체 구조:
 * ```javascript
 * {
 *   id: string | number,    // 서버에서 생성된 고유 식별자
 *   title: string,          // 입력된 Todo 제목
 *   completed: boolean,     // 완료 여부
 *   createdAt: string       // 서버에서 생성된 생성 일시
 * }
 * ```
 * 
 * 사용 예시:
 * ```javascript
 * try {
 *   const newTodo = await createTodoItem({
 *     title: "리액트 공부하기",
 *     completed: false
 *   });
 *   console.log('새로 생성된 Todo:', newTodo);
 * } catch (error) {
 *   console.error('Todo 생성 실패:', error.message);
 * }
 * ```
 */
export function createTodoItem(item) {
  // fetch API를 사용하여 HTTP POST 요청 전송
  return fetch('http://localhost:5000/todos', {
    method: 'POST',                              // HTTP 메서드를 POST로 설정
    headers: {
      'Content-Type': 'application/json',        // 요청 본문이 JSON 형태임을 명시
    },
    body: JSON.stringify(item),                  // JavaScript 객체를 JSON 문자열로 변환
  }).then(response => {
    // HTTP 응답 상태 코드 검증
    // 201 Created, 200 OK 등의 성공 상태 코드 확인
    if (!response.ok) {
      // 요청 실패 시 상태 코드를 포함한 에러 메시지와 함께 예외 발생
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // 성공적인 응답의 경우 서버에서 반환된 JSON 데이터 파싱
    // 일반적으로 생성된 Todo 객체(ID 포함)가 반환됨
    return response.json();
  });
}

// createTodoItem 함수를 기본 export로도 내보내기
// import createTodoItem from './createTodoItem' 형태로 사용 가능
export default createTodoItem;

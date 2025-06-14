/**
 * todoService/index.js - Todo API 서비스 모듈의 진입점
 * 
 * 이 파일은 Todo 관련 모든 API 함수들을 통합하여 관리하는 
 * 서비스 모듈의 메인 인덱스 파일입니다.
 * 
 * 주요 역할:
 * - 개별 API 함수들을 import하여 하나의 객체로 통합
 * - 기본 export와 named export 모두 제공
 * - 클린한 API 인터페이스 제공으로 컴포넌트에서 쉽게 사용 가능
 * 
 * 사용 패턴:
 * - import TodoAPI from './services/todoService' (기본 import)
 * - import { createTodoItem } from './services/todoService' (named import)
 * 
 * @file todoService/index.js
 * @description Todo API 서비스 함수들의 통합 관리 모듈
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

// ===== API 함수들 Import =====

// 전체 Todo 목록을 조회하는 함수
import { selectTodoList } from './selectTodoList';

// 특정 Todo 아이템을 조회하는 함수
import { selectTodoItem } from './selectTodoItem';

// 새로운 Todo 아이템을 생성하는 함수
import { createTodoItem } from './createTodoItem';

// 기존 Todo 아이템을 수정하는 함수
import { updateTodoItem } from './updateTodoItem';

// Todo 아이템을 삭제하는 함수
import { deleteTodoItem } from './deleteTodoItem';

// ===== 서비스 객체 생성 =====

/**
 * todoService 객체 - 모든 Todo API 함수들을 포함하는 서비스 객체
 * 
 * 이 객체를 통해 Todo와 관련된 모든 CRUD 연산을 수행할 수 있습니다:
 * - selectTodoList: 전체 Todo 목록 조회 (READ)
 * - selectTodoItem: 특정 Todo 아이템 조회 (READ)
 * - createTodoItem: 새 Todo 아이템 생성 (CREATE)
 * - updateTodoItem: Todo 아이템 수정 (UPDATE)
 * - deleteTodoItem: Todo 아이템 삭제 (DELETE)
 * 
 * 사용 예시:
 * ```javascript
 * import TodoAPI from './services/todoService';
 * 
 * // 전체 목록 조회
 * const todos = await TodoAPI.selectTodoList();
 * 
 * // 새 아이템 생성
 * await TodoAPI.createTodoItem({ title: '새 할 일', completed: false });
 * ```
 */
const todoService = {
  selectTodoList,   // 목록 조회
  selectTodoItem,   // 개별 조회
  createTodoItem,   // 생성
  updateTodoItem,   // 수정
  deleteTodoItem,   // 삭제
};

// ===== Export 구문 =====

// 기본 export - 서비스 객체를 기본값으로 내보내기
// import TodoAPI from './services/todoService' 형태로 사용
export default todoService;

// Named exports - 개별 함수들을 각각 내보내기
// import { createTodoItem, selectTodoList } from './services/todoService' 형태로 사용
export {
  selectTodoList,   // 전체 목록 조회 함수
  selectTodoItem,   // 개별 아이템 조회 함수
  createTodoItem,   // 아이템 생성 함수
  updateTodoItem,   // 아이템 수정 함수
  deleteTodoItem,   // 아이템 삭제 함수
};

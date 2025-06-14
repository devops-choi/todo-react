/**
 * TodoItem.js - 개별 Todo 아이템 컴포넌트
 * 
 * 이 컴포넌트는 하나의 Todo 아이템을 표시하고 상호작용을 처리합니다.
 * 각 Todo는 체크박스, 제목 텍스트, 삭제 버튼으로 구성되며,
 * 사용자의 액션을 부모 컴포넌트로 전달하는 역할을 합니다.
 * 
 * 주요 기능:
 * - Todo 완료 상태 표시 (체크박스)
 * - Todo 제목 표시 (완료 시 스타일 변경)
 * - Todo 삭제 기능 (삭제 버튼)
 * - 각 액션을 부모 컴포넌트로 이벤트 위임
 * - 접근성 고려한 사용자 인터페이스
 * 
 * @file TodoItem.js
 * @description 개별 Todo 아이템의 UI와 상호작용을 담당하는 컴포넌트
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

// PropTypes import - 컴포넌트 props 타입 검증
import PropTypes from 'prop-types';

// CSS 모듈 import - 컴포넌트별 스코프 스타일
import styles from './TodoItem.module.css';

/**
 * TodoItem 컴포넌트 - 개별 Todo 아이템 렌더링 및 상호작용 처리
 * 
 * 하나의 Todo 객체를 받아서 UI로 표현하고,
 * 사용자의 상호작용(완료 토글, 삭제)을 부모 컴포넌트로 전달합니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.todo - 표시할 Todo 객체 { id, title, completed }
 * @param {Function} props.onToggle - 완료 상태 토글 시 호출할 함수
 * @param {Function} props.onDelete - 삭제 시 호출할 함수
 * @returns {JSX.Element} 개별 Todo 아이템 UI
 */
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    /*
      리스트 아이템 (li) 요소
      - TodoList 컴포넌트의 ul 내부에서 사용됨
      - 각 Todo를 표현하는 최상위 컨테이너
    */
    <li className={styles.todoItem}>
      {/* ===== 완료 상태 체크박스 ===== */}
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed}                    // Todo의 완료 상태와 연동
        onChange={() => onToggle(todo.id)}          // 체크박스 변경 시 토글 함수 호출
        aria-label={`${todo.title} 완료 상태 토글`} // 스크린 리더용 설명
      />
      
      {/* ===== Todo 제목 텍스트 ===== */}
      <span
        className={`${styles.title} ${todo.completed ? styles.completed : ''}`}
        aria-label={`할 일: ${todo.title}`}
      >
        {/* 
          조건부 CSS 클래스 적용:
          - 기본적으로 styles.title 클래스 적용
          - todo.completed가 true이면 styles.completed 클래스 추가
          - 완료된 Todo는 취소선, 흐린 색상 등의 스타일 적용
        */}
        {todo.title}
      </span>
      
      {/* ===== 삭제 버튼 ===== */}
      <button 
        className={styles.deleteButton} 
        onClick={() => onDelete(todo.id)}          // 클릭 시 삭제 함수 호출
        aria-label={`${todo.title} 삭제`}         // 스크린 리더용 버튼 설명
      >
        삭제
      </button>
    </li>
  );
}

// ===== PropTypes 정의 =====
/**
 * TodoItem 컴포넌트의 props 타입 검증
 * 개발 환경에서 잘못된 props 타입 전달 시 경고 표시
 */
TodoItem.propTypes = {
  // todo 객체 - 특정 구조를 가져야 함
  todo: PropTypes.shape({
    // id: 문자열 또는 숫자 타입 (필수)
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // title: 문자열 타입 (필수)
    title: PropTypes.string.isRequired,
    // completed: 불린값 타입 (필수)
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  // 완료 토글 함수 (필수)
  onToggle: PropTypes.func.isRequired,
  // 삭제 함수 (필수)
  onDelete: PropTypes.func.isRequired,
};

// TodoItem 컴포넌트를 기본 export로 내보내기
export default TodoItem;

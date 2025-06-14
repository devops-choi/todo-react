/**
 * TodoList.js - Todo 목록 표시 컴포넌트
 * 
 * 이 컴포넌트는 Todo 아이템들의 목록을 렌더링하는 역할을 담당합니다.
 * 목록이 비어있을 때는 안내 메시지를 표시하고, 
 * 아이템이 있을 때는 각각을 TodoItem 컴포넌트로 렌더링합니다.
 * 
 * 주요 기능:
 * - Todo 아이템 배열을 순회하여 개별 TodoItem 컴포넌트 렌더링
 * - 빈 목록일 때 사용자 친화적인 안내 메시지 표시
 * - 각 TodoItem에 필요한 props 전달 (데이터, 이벤트 핸들러)
 * - 접근성 고려한 마크업 구조 제공
 * 
 * @file TodoList.js
 * @description Todo 아이템들의 목록을 관리하고 표시하는 컴포넌트
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

// PropTypes import - 컴포넌트 props 타입 검증
import PropTypes from 'prop-types';

// 개별 Todo 아이템을 렌더링하는 자식 컴포넌트
import TodoItem from './TodoItem';

// CSS 모듈 import - 컴포넌트별 스코프 스타일
import styles from './TodoList.module.css';

/**
 * TodoList 컴포넌트 - Todo 아이템들의 목록 렌더링
 * 
 * 전달받은 Todo 배열을 기반으로 목록을 구성하며,
 * 각 아이템에 대한 상호작용을 부모 컴포넌트로 위임합니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Array<Object>} props.items - 렌더링할 Todo 아이템 배열
 * @param {Function} props.onToggle - Todo 완료 상태 토글 핸들러
 * @param {Function} props.onDelete - Todo 삭제 핸들러
 * @returns {JSX.Element} Todo 목록 UI 또는 빈 상태 UI
 */
function TodoList({ items, onToggle, onDelete }) {
  // ===== 빈 목록 상태 처리 =====
  
  /**
   * 목록이 비어있을 때의 UI 렌더링
   * - items 배열이 null/undefined이거나 길이가 0인 경우
   * - 사용자에게 친화적인 안내 메시지와 아이콘 표시
   * - 접근성을 위한 적절한 ARIA 속성 사용
   */
  if (!items || items.length === 0) {
    return (
      <div className={styles.todoList} role="region" aria-label="할 일 목록">
        <div className={styles.emptyState}>
          {/* 
            빈 상태 아이콘
            - aria-hidden="true": 스크린 리더에서 무시 (장식적 요소)
          */}
          <div className={styles.emptyIcon} aria-hidden="true">📝</div>
          
          {/* 
            빈 상태 안내 메시지
            - aria-live="polite": 내용 변경 시 스크린 리더에 알림
          */}
          <p aria-live="polite">
            아직 할 일이 없습니다.
            <br />
            새로운 할 일을 추가해보세요!
          </p>
        </div>
      </div>
    );
  }

  // ===== Todo 목록 렌더링 =====
  
  return (
    /*
      순서 있는 목록 (ul) 사용
      - 각 Todo 아이템은 리스트 아이템(li)으로 구성
      - aria-label: 스크린 리더용 목록 설명
    */
    <ul className={styles.todoList} aria-label="할 일 목록">
      {/* 
        Todo 배열을 순회하여 각각을 TodoItem 컴포넌트로 렌더링
        - map 함수를 사용한 배열 순회 및 JSX 변환
        - key prop: React의 가상 DOM 효율성을 위한 고유 식별자
        - todo.id가 있으면 사용, 없으면 배열 인덱스 사용 (fallback)
      */}
      {items.map((todo, index) => (
        <TodoItem
          key={todo.id || index}        // 고유 key (React 최적화용)
          todo={todo}                   // Todo 데이터 객체 전달
          onToggle={onToggle}           // 완료 상태 토글 핸들러 전달
          onDelete={onDelete}           // 삭제 핸들러 전달
        />
      ))}
    </ul>
  );
}

// ===== PropTypes 정의 =====
/**
 * TodoList 컴포넌트의 props 타입 검증
 * 개발 환경에서 타입 안전성을 보장하고 디버깅을 도움
 */
TodoList.propTypes = {
  // Todo 아이템 배열 - 각 아이템은 특정 구조를 가져야 함
  items: PropTypes.arrayOf(
    PropTypes.shape({
      // id: 문자열 또는 숫자 (필수)
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // title: 문자열 (필수)
      title: PropTypes.string.isRequired,
      // completed: 불린값 (필수)
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  // 완료 상태 토글 함수 (필수)
  onToggle: PropTypes.func.isRequired,
  // 삭제 함수 (필수)
  onDelete: PropTypes.func.isRequired,
};

// TodoList 컴포넌트를 기본 export로 내보내기
export default TodoList;

/**
 * TodoContainer.js - Todo 애플리케이션의 메인 컨테이너 컴포넌트
 * 
 * 이 컴포넌트는 Todo 애플리케이션의 핵심 비즈니스 로직을 담당합니다:
 * - Todo 아이템들의 상태 관리 (생성, 읽기, 수정, 삭제)
 * - 필터링 기능 (전체, 진행중, 완료)
 * - 통계 정보 표시 (전체/진행중/완료 개수)
 * - 자식 컴포넌트들과의 데이터 흐름 관리
 * 
 * @file TodoContainer.js
 * @description Todo 애플리케이션의 중앙 상태 관리 컨테이너
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

// React Hooks import - 함수형 컴포넌트에서 상태와 생명주기 관리
import { useState, useEffect } from 'react';

// Todo 관련 API 서비스 import - 백엔드와의 데이터 통신
import TodoAPI from '../services/todoService';

// 자식 컴포넌트들 import
import TodoList from './TodoList';      // Todo 목록 표시 컴포넌트
import TodoInput from './TodoInput';    // Todo 입력 폼 컴포넌트

// CSS 모듈 import - 컴포넌트별 스코프 CSS
import styles from './TodoContainer.module.css';

/**
 * TodoContainer 컴포넌트 - Todo 애플리케이션의 메인 로직 담당
 * 
 * 이 컴포넌트는 다음과 같은 기능을 제공합니다:
 * - Todo 아이템 CRUD 연산 (Create, Read, Update, Delete)
 * - 필터링 기능 (전체/진행중/완료)
 * - 통계 정보 계산 및 표시
 * - 자식 컴포넌트와의 상태 공유
 * 
 * @returns {JSX.Element} Todo 애플리케이션의 메인 UI 구조
 */
function TodoContainer() {
  // ===== 상태 관리 =====
  
  /**
   * Todo 아이템들의 배열 상태
   * @type {Array<Object>} todos - Todo 아이템 객체들의 배열
   * 각 Todo 객체 구조: { id, text, completed, createdAt }
   */
  const [todos, setTodos] = useState([]);
  
  /**
   * 현재 활성화된 필터 상태
   * @type {string} filter - 'all' | 'active' | 'completed'
   */
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // ===== 이벤트 핸들러 함수들 =====

  /**
   * 새로운 Todo 아이템을 생성하는 핸들러
   * 
   * @param {Object} data - 새로 생성할 Todo 데이터 { text }
   * @async
   * @description 
   * 1. API를 통해 새 Todo 아이템을 서버에 저장
   * 2. 저장 완료 후 Todo 목록을 다시 로드하여 UI 업데이트
   */
  async function handleCreateTodo(data) {
    await TodoAPI.createTodoItem(data);
    await handleReloadTodos();
  }

  /**
   * 서버에서 Todo 목록을 다시 로드하는 핸들러
   * 
   * @async
   * @description
   * 1. API를 통해 최신 Todo 목록을 서버에서 가져옴
   * 2. 받아온 데이터로 로컬 상태 업데이트
   * 3. CRUD 연산 후 데이터 동기화를 위해 사용
   */
  async function handleReloadTodos() {
    const data = await TodoAPI.selectTodoList();
    setTodos(data);
  }

  /**
   * Todo 아이템의 완료 상태를 토글하는 핸들러
   * 
   * @param {string|number} id - 토글할 Todo 아이템의 고유 ID
   * @async
   * @description
   * 1. ID로 해당 Todo 아이템을 찾음
   * 2. completed 속성을 반대값으로 변경
   * 3. 변경된 데이터를 서버에 업데이트
   * 4. UI 재로드로 변경사항 반영
   */
  async function handleToggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await TodoAPI.updateTodoItem(id, updatedTodo);
      await handleReloadTodos();
    }
  }

  /**
   * Todo 아이템을 삭제하는 핸들러
   * 
   * @param {string|number} id - 삭제할 Todo 아이템의 고유 ID
   * @async
   * @description
   * 1. 사용자에게 삭제 확인 대화상자 표시
   * 2. 확인 시 API를 통해 서버에서 해당 아이템 삭제
   * 3. 삭제 완료 후 Todo 목록 재로드
   */
  async function handleDeleteTodo(id) {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      await TodoAPI.deleteTodoItem(id);
      await handleReloadTodos();
    }
  }

  // ===== 계산된 값들 (Computed Values) =====

  /**
   * 현재 선택된 필터에 따라 필터링된 Todo 목록
   * @type {Array<Object>} filteredTodos - 필터링된 Todo 아이템 배열
   */
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;    // 미완료 아이템만
    if (filter === 'completed') return todo.completed;  // 완료된 아이템만
    return true;                                         // 전체 아이템
  });

  /**
   * Todo 통계 정보 계산
   * @type {number} totalCount - 전체 Todo 개수
   * @type {number} completedCount - 완료된 Todo 개수  
   * @type {number} activeCount - 진행중인 Todo 개수
   */
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = totalCount - completedCount;

  // ===== 생명주기 및 사이드 이펙트 =====

  /**
   * 컴포넌트 마운트 시 초기 데이터 로드
   * 
   * @description
   * - 컴포넌트가 처음 렌더링될 때 서버에서 Todo 목록을 가져옴
   * - 의존성 배열이 빈 배열이므로 마운트 시에만 실행
   * - 에러 발생 시 콘솔에 에러 로그 출력
   */
  useEffect(() => {
    handleReloadTodos().catch(error => {
      console.error('Failed to load todos:', error);
    });
    return () => {}; // 클린업 함수 (현재는 빈 함수)
  }, []); // 빈 의존성 배열: 마운트 시에만 실행

  // ===== JSX 렌더링 =====
  
  return (
    <div className={styles.container}>
      {/* ===== 헤더 섹션 ===== */}
      <header className={styles.header}>
        <h1 className={styles.title}>📝 Todo App</h1>
        <p className={styles.subtitle}>오늘 할 일을 정리해보세요</p>
      </header>

      {/* ===== 통계 정보 섹션 ===== */}
      <div className={styles.stats}>
        {/* 전체 Todo 개수 */}
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{totalCount}</span>
          <span className={styles.statLabel}>전체</span>
        </div>
        {/* 진행중인 Todo 개수 */}
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{activeCount}</span>
          <span className={styles.statLabel}>진행중</span>
        </div>
        {/* 완료된 Todo 개수 */}
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{completedCount}</span>
          <span className={styles.statLabel}>완료</span>
        </div>
      </div>

      {/* ===== 필터 버튼 섹션 ===== */}
      <div className={styles.filters} role="group" aria-label="할 일 필터">
        {/* 전체 보기 필터 버튼 */}
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
        >
          전체
        </button>
        {/* 진행중 보기 필터 버튼 */}
        <button
          className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => setFilter('active')}
          aria-pressed={filter === 'active'}
        >
          진행중
        </button>
        {/* 완료 보기 필터 버튼 */}
        <button
          className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
          aria-pressed={filter === 'completed'}
        >
          완료
        </button>
      </div>

      {/* ===== 메인 콘텐츠 섹션 ===== */}
      <main className={styles.main}>
        {/* Todo 입력 컴포넌트 - 새로운 Todo 추가 기능 */}
        <TodoInput onSubmit={handleCreateTodo} />
        
        {/* Todo 목록 컴포넌트 - 필터링된 Todo 목록 표시 */}
        <TodoList
          items={filteredTodos}        // 필터링된 Todo 배열 전달
          onToggle={handleToggleTodo}   // 완료 상태 토글 핸들러 전달
          onDelete={handleDeleteTodo}   // 삭제 핸들러 전달
        />
      </main>
    </div>
  );
}

// TodoContainer 컴포넌트를 기본 export로 내보내기
export default TodoContainer;

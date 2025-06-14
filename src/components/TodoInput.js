/**
 * TodoInput.js - Todo 입력 폼 컴포넌트
 * 
 * 이 컴포넌트는 사용자가 새로운 Todo 아이템을 입력하고 추가할 수 있는 
 * 폼 인터페이스를 제공합니다. 
 * 
 * 주요 기능:
 * - 텍스트 입력 필드 제공
 * - 폼 유효성 검사 (빈 값 체크)
 * - 폼 제출 처리 및 부모 컴포넌트에 데이터 전달
 * - 제출 후 입력 필드 초기화
 * 
 * @file TodoInput.js
 * @description 새로운 Todo 아이템 추가를 위한 입력 폼 컴포넌트
 * @author 클라우드 개발자 양성과정
 * @since 2025-06-14
 */

// React Hooks import - 상태 관리를 위한 useState
import { useState } from 'react';

// PropTypes import - 컴포넌트 props 타입 검증을 위한 라이브러리
import PropTypes from 'prop-types';

// CSS 모듈 import - 컴포넌트별 스코프 스타일
import styles from './TodoInput.module.css';

/**
 * TodoInput 컴포넌트 - 새로운 Todo 아이템 입력 폼
 * 
 * 사용자로부터 Todo 제목을 입력받고, 유효성 검사를 거쳐
 * 부모 컴포넌트로 새 Todo 데이터를 전달하는 역할을 합니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Function} props.onSubmit - 새 Todo 데이터를 처리할 콜백 함수
 * @returns {JSX.Element} Todo 입력 폼 UI
 */
function TodoInput({ onSubmit }) {
  // ===== 상태 관리 =====
  
  /**
   * Todo 제목 입력값 상태
   * @type {string} title - 사용자가 입력한 Todo 제목
   */
  const [title, setTitle] = useState('');

  // ===== 이벤트 핸들러 함수들 =====

  /**
   * 입력 필드 값 변경 핸들러
   * 
   * @param {Event} event - input 요소의 change 이벤트 객체
   * @description
   * 사용자가 입력 필드에 텍스트를 입력할 때마다 호출되어
   * 로컬 상태를 업데이트합니다. (제어 컴포넌트 패턴)
   */
  function handleChange(event) {
    setTitle(event.target.value);
  }

  /**
   * 폼 제출 핸들러
   * 
   * @param {Event} event - form 요소의 submit 이벤트 객체
   * @description
   * 1. 기본 폼 제출 동작 방지 (페이지 새로고침 방지)
   * 2. 입력값 유효성 검사 (빈 문자열 및 공백만 있는 경우 체크)
   * 3. 유효한 경우 새 Todo 객체 생성하여 부모에게 전달
   * 4. 제출 완료 후 입력 필드 초기화
   */
  function handleSubmit(event) {
    // 브라우저의 기본 폼 제출 동작 방지 (페이지 새로고침 방지)
    event.preventDefault();
    
    // 입력값 유효성 검사: 빈 문자열이나 공백만 있는 경우 처리
    if (!title.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }
    
    // 새 Todo 객체 생성
    // completed: false로 초기 설정 (새로 추가된 Todo는 미완료 상태)
    const data = { title, completed: false };
    
    // 부모 컴포넌트의 onSubmit 콜백 함수 호출하여 데이터 전달
    onSubmit(data);
    
    // 제출 완료 후 입력 필드 초기화 (사용자 경험 개선)
    setTitle('');
  }

  // ===== JSX 렌더링 =====
  
  return (
    <div className={styles.container}>
      {/* 
        폼 요소 - 새 할 일 추가 폼
        - onSubmit: 폼 제출 시 handleSubmit 함수 실행
        - aria-label: 스크린 리더 접근성을 위한 폼 설명
      */}
      <form className={styles.form} onSubmit={handleSubmit} aria-label="새 할 일 추가">
        {/* 
          텍스트 입력 필드
          - value: 제어 컴포넌트 패턴 (React state와 연동)
          - onChange: 입력값 변경 시 state 업데이트
          - type="text": 텍스트 입력 타입
          - placeholder: 사용자에게 입력 안내 제공
          - aria-label: 스크린 리더용 필드 설명
          - aria-required: 필수 입력 필드임을 접근성 도구에 알림
        */}
        <input
          className={styles.input}
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="할 일을 입력하세요"
          aria-label="할 일 제목 입력"
          aria-required="true"
        />
        
        {/* 
          제출 버튼
          - type="submit": 폼 제출 버튼으로 설정
          - aria-label: 스크린 리더용 버튼 설명
        */}
        <button className={styles.button} type="submit" aria-label="할 일 추가">
          추가
        </button>
      </form>
    </div>
  );
}

// ===== PropTypes 정의 =====
/**
 * TodoInput 컴포넌트의 props 타입 검증
 * 개발 환경에서 잘못된 props 전달 시 경고 메시지 표시
 */
TodoInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,  // 필수 함수 prop
};

// TodoInput 컴포넌트를 기본 export로 내보내기
export default TodoInput;

import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoInput.module.css';

function TodoInput({ onSubmit }) {
  const [title, setTitle] = useState('');
  function handleChange(event) {
    setTitle(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }
    const data = { title, completed: false };
    onSubmit(data);
    setTitle('');
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} aria-label="새 할 일 추가">
        <input
          className={styles.input}
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="할 일을 입력하세요"
          aria-label="할 일 제목 입력"
          aria-required="true"
        />
        <button className={styles.button} type="submit" aria-label="할 일 추가">
          추가
        </button>
      </form>
    </div>
  );
}

TodoInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TodoInput;

import React, { useState } from 'react';
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="할 일을 입력하세요"
        />
        <button className={styles.button} type="submit">
          추가
        </button>
      </form>
    </div>
  );
}

export default TodoInput;

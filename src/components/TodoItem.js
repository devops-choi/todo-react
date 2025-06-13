import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={`${styles.title} ${todo.completed ? styles.completed : ''}`}>
        {todo.title}
      </span>
      <button 
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </button>
    </li>
  );
}
export default TodoItem;
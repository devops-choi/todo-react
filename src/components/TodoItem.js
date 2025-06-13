import PropTypes from 'prop-types';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} 완료 상태 토글`}
      />
      <span
        className={`${styles.title} ${todo.completed ? styles.completed : ''}`}
        aria-label={`할 일: ${todo.title}`}
      >
        {todo.title}
      </span>
      <button 
        className={styles.deleteButton} 
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.title} 삭제`}
      >
        삭제
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;

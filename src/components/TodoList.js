import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList({ items, onToggle, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.todoList} role="region" aria-label="할 일 목록">
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">📝</div>
          <p aria-live="polite">
            아직 할 일이 없습니다.
            <br />
            새로운 할 일을 추가해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.todoList} aria-label="할 일 목록">
      {items.map((todo, index) => (
        <TodoItem
          key={todo.id || index}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;

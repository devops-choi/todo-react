import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList({ items, onToggle, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.todoList}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <p>
            아직 할 일이 없습니다.
            <br />
            새로운 할 일을 추가해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.todoList}>
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

export default TodoList;

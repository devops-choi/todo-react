import React, { useState, useEffect } from 'react';
import TodoAPI from '../services/todoService';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import styles from './TodoContainer.module.css';

function TodoContainer() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
    
    async function handleCreateTodo(data) {
        await TodoAPI.createTodoItem(data);
        await handleReloadTodos();
    }
    
    async function handleReloadTodos() {
        const data = await TodoAPI.selectTodoList();
        setTodos(data);
    }
    
    async function handleToggleTodo(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            const updatedTodo = { ...todo, completed: !todo.completed };
            await TodoAPI.updateTodoItem(id, updatedTodo);
            await handleReloadTodos();
        }
    }
    
    async function handleDeleteTodo(id) {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            await TodoAPI.deleteTodoItem(id);
            await handleReloadTodos();
        }
    }

    // 필터링된 할 일 목록
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    // 통계 계산
    const totalCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = totalCount - completedCount;
    
    useEffect(() => {
        handleReloadTodos();
        return () => {}
    }, []);      return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>📝 Todo App</h1>
                <p className={styles.subtitle}>오늘 할 일을 정리해보세요</p>
            </header>
            
            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>{totalCount}</span>
                    <span className={styles.statLabel}>전체</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>{activeCount}</span>
                    <span className={styles.statLabel}>진행중</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>{completedCount}</span>
                    <span className={styles.statLabel}>완료</span>
                </div>
            </div>

            <div className={styles.filters}>
                <button 
                    className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                    onClick={() => setFilter('all')}
                >
                    전체
                </button>
                <button 
                    className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
                    onClick={() => setFilter('active')}
                >
                    진행중
                </button>
                <button 
                    className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    완료
                </button>
            </div>
            
            <main className={styles.main}>
                <TodoInput onSubmit={handleCreateTodo} />
                <TodoList 
                    items={filteredTodos} 
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                />
            </main>
        </div>
    )
}

export default TodoContainer;
export function selectTodoList() {
    return fetch('http://localhost:5000/todos', { method: 'GET' })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}
export default selectTodoList;
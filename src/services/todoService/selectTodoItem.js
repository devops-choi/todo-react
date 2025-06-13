export function selectTodoItem(id) {
    return fetch(`http://localhost:5000/todos/${id}`, { method: 'GET' })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
}
export default selectTodoItem;
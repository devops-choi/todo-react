export function deleteTodoItem(id) {
  return fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' }).then(
    response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  );
}
export default deleteTodoItem;

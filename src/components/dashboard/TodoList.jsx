import TodoCard from './TodoCard.jsx'

function TodoList({ todos, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/8 py-20 text-center">
        <p className="text-[14px] text-white/30">No tasks match your search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TodoList

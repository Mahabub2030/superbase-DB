function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <article className="group relative flex flex-col rounded-3xl border border-white/7 bg-white/2.5 p-5 backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/14 hover:bg-white/4 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/3">
          {todo.image ? (
            <img src={todo.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[9px] uppercase tracking-wide text-white/20">No image</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-white">{todo.title}</h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-white/40">{todo.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onEdit(todo)}
          className="rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 text-[12px] font-medium text-white/60 transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="rounded-full border border-red-400/15 bg-red-500/5 px-3.5 py-1.5 text-[12px] font-medium text-red-300/80 transition-all duration-200 hover:border-red-400/30 hover:text-red-200 active:scale-95"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TodoCard

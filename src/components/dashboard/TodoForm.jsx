import ImageUploadField from './ImageUploadField.jsx'

function TodoForm({ title, description, image, isEditing, onTitleChange, onDescriptionChange, onImageChange, onSubmit, onCancel }) {
  return (
    <section className="rounded-[28px] border border-white/7 bg-white/2.5 p-7 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <h2 className="text-[17px] font-semibold tracking-tight text-white">
        {isEditing ? 'Edit task' : 'New task'}
      </h2>

      <form onSubmit={onSubmit} className="mt-5 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="todo-title" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
              Title
            </label>
            <input
              id="todo-title"
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. Plan weekly sync"
              className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-[15px] text-white placeholder-white/25 outline-none backdrop-blur-xl transition-all duration-300 ease-out focus:border-white/25 focus:bg-white/6 focus:ring-4 focus:ring-white/6"
            />
          </div>
          <div>
            <label htmlFor="todo-description" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
              Description
            </label>
            <input
              id="todo-description"
              type="text"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="A short note about this task"
              className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 text-[15px] text-white placeholder-white/25 outline-none backdrop-blur-xl transition-all duration-300 ease-out focus:border-white/25 focus:bg-white/6 focus:ring-4 focus:ring-white/6"
            />
          </div>
        </div>

        <ImageUploadField image={image} onChange={onImageChange} />

        <div className="flex items-center gap-4 pt-1">
          <button
            type="submit"
            className="rounded-2xl bg-white px-6 py-3 text-[14px] font-medium text-black transition-all duration-300 ease-out hover:bg-white/90 active:scale-[0.97]"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="text-[13px] font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default TodoForm

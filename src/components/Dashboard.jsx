import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import supabase from '../utils/supabase.js'
import DashboardHeader from './dashboard/DashboardHeader.jsx'
import LoadMoreButton from './dashboard/LoadMoreButton.jsx'
import SearchBar from './dashboard/SearchBar.jsx'
import TodoForm from './dashboard/TodoForm.jsx'
import TodoList from './dashboard/TodoList.jsx'

const PAGE_SIZE = 3

function Dashboard({ userEmail, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const fetchTasks = async (curentSearch = search, currentLimit = visibleCount) => {

    const query = supabase.from("tasks").select("*", { count: "exact" });

    if (curentSearch) {
      query.or(`title.ilike.%${curentSearch}%`);
    }

    const { data, error, count } = await query.range(0, currentLimit - 1);

    if (error) {
      console.log("There was an error: ", error);
    } else {
      setTodos(data);
    }

    if (count !== null) {
      setTotalCount(count);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks(search, visibleCount);
    }, 300);
  }, [search, visibleCount]);

  useEffect(() => {
    const subscription = supabase.channel("onTasks");

    subscription.on("postgres_changes", { event: "INSERT", schema: "public", table: "tasks" }, (payload) => {
      setTodos(prev => [payload.new, ...prev]);
    }).subscribe((status) => {
      console.log("Subscription status: ", status);
    })

    return () => {
      subscription.unsubscribe();
    }

  }, []);

  const isEditing = editingId !== null

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setImage(null)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const { data: sessionData } = await supabase.auth.getSession();

    if (isEditing) {

      const updatedState = { title, description, image }

      const { data: updatedTasks, error } = await supabase.from("tasks").update(updatedState).eq("id", editingId).select().single();

      if (error) {
        console.log(error);
      } else {

        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === editingId ? updatedTasks : todo
          )
        )
      }

    } else {

      let imageUrl = null;

      if (image) {
        const path = `public/${Date.now()}_${image.name}`
        const { data } = await supabase.storage.from("tasks-banner").upload(path, image);

        const { data: { publicUrl } } = await supabase.storage.from("tasks-banner").getPublicUrl(data.path);
        imageUrl = publicUrl
      }
      const newTodo = {
        title,
        description,
        image:imageUrl,
        user_id: sessionData.session.user.id
      }
      const { data: createTask, error } = await supabase.from("tasks").insert(newTodo).select().single();
      if (error) {
        console.log(error);
      } else {
        // setTodos((prev) => [createTask, ...prev])
      }
    }

    resetForm()
  }

  const handleEdit = (todo) => {
    setEditingId(todo.id)
    setTitle(todo.title)
    setDescription(todo.description)
    setImage(todo.image)
  }

  const handleCancel = () => {
    resetForm()
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.log(error);
    } else {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      if (editingId === id) resetForm()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login")
    onLogout()
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  const handleSearchChange = (value) => {
    setSearch(value)
    setVisibleCount(PAGE_SIZE)
  }

  const hasMore = visibleCount < totalCount

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pb-24">
      <div className="pointer-events-none absolute -top-1/4 right-0 h-120 w-120 rounded-full bg-white/3 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-[110px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <DashboardHeader userEmail={userEmail} onLogout={handleLogout} />

        <div className="mt-8">
          <TodoForm
            title={title}
            description={description}
            image={image}
            isEditing={isEditing}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onImageChange={setImage}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>

        <div className="mt-8">
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>

        <div className="mt-6">
          <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        {hasMore && (
          <div className="mt-8">
            <LoadMoreButton onClick={handleLoadMore} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Auth from './components/Auth.jsx'
import Dashboard from './components/Dashboard.jsx'
import supabase from './utils/supabase.js'

function App() {
  const [session, setSession] = useState(null)

  const handleAuthSuccess = (email) => {
    setSession({ email })
  }

  const handleLogout = () => {
    // setSession(null)
  }

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSession({ email: session.user.email });
      }
    })();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setSession({ email: session.user.email });
      } else if (event === "SIGNED_OUT") {
        setSession(null);
      }
    })

    return () => {
      data.subscription.unsubscribe();
    }

  }, []);

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Auth mode="signin" onAuthSuccess={handleAuthSuccess} />,
    },
    {
      path: '/register',
      element: <Auth mode="signup" onAuthSuccess={handleAuthSuccess} />,
    },
    {
      path: '/',
      element: <Dashboard userEmail={session?.email} onLogout={handleLogout} />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App

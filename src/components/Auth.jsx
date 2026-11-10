import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import supabase from '../utils/supabase.js'
import AuthForm from './auth/AuthForm.jsx'
import AuthLayout from './auth/AuthLayout.jsx'

function Auth({ mode, onAuthSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const isSignIn = mode === 'signin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in both email and password.')
      return
    }

    setLoading(true)

    if (isSignIn) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message)
      } else {
        onAuthSuccess(data.session.user.email);
        navigate("/");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
      } else {
        onAuthSuccess(data.user.email);
        navigate("/login");
      }
    }

    setLoading(false)
    onAuthSuccess(email)
  }

  return (
    <AuthLayout
      title={isSignIn ? 'Welcome back' : 'Create your account'}
      subtitle={isSignIn ? 'Sign in to continue to your tasks' : 'Sign up to start organizing your tasks'}
      footer={
        <>
          {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
          <Link
            to={isSignIn ? '/register' : '/login'}
            className="font-medium text-white/80 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </Link>
        </>
      }
    >
      <AuthForm
        mode={mode}
        email={email}
        password={password}
        loading={loading}
        error={error}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  )
}

export default Auth

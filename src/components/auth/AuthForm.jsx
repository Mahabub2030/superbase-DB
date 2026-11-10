import FormField from './FormField.jsx'
import ErrorBanner from './ErrorBanner.jsx'
import SubmitButton from './SubmitButton.jsx'

function AuthForm({ mode, email, password, loading, error, onEmailChange, onPasswordChange, onSubmit }) {
  const isSignIn = mode === 'signin'

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <ErrorBanner message={error} />

      <FormField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder="••••••••"
        autoComplete={isSignIn ? 'current-password' : 'new-password'}
      />

      <SubmitButton loading={loading} label={isSignIn ? 'Sign In' : 'Create Account'} />
    </form>
  )
}

export default AuthForm

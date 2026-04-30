import { createContext, useContext, useReducer, useEffect } from 'react'

const ADMIN_PASSWORD = 'admin123'
const SESSION_KEY = 'dg_admin_session'

const AuthContext = createContext(null)

const initialState = {
  authenticated: false,
  loginError: '',
  loading: true,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_SESSION':
      return { ...state, authenticated: action.payload, loading: false }
    case 'LOGIN_SUCCESS':
      return { ...state, authenticated: true, loginError: '', loading: false }
    case 'LOGIN_FAILURE':
      return { ...state, loginError: 'Invalid password. Try again.', loading: false }
    case 'LOGOUT':
      return { ...state, authenticated: false, loginError: '', loading: false }
    case 'CLEAR_ERROR':
      return { ...state, loginError: '' }
    default:
      return state
  }
}

export function AdminAuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY)
    dispatch({ type: 'RESTORE_SESSION', payload: session === 'true' })
  }, [])

  function login(password) {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      dispatch({ type: 'LOGIN_SUCCESS' })
    } else {
      dispatch({ type: 'LOGIN_FAILURE' })
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    dispatch({ type: 'LOGOUT' })
  }

  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return ctx
}

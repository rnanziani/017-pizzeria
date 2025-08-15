import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

// 🎯 Componente para rutas que requieren autenticación
export const ProtectedRoute = ({ children }) => {
  const { token } = useUser()
  
  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  // Si hay token, renderiza el componente hijo
  return children
}

// 🎯 Componente para rutas que NO deben ser accesibles si estás autenticado
export const PublicRoute = ({ children }) => {
  const { token } = useUser()
  
  // Si hay token, redirige al home
  if (token) {
    return <Navigate to="/" replace />
  }
  
  // Si no hay token, renderiza el componente hijo
  return children
}

export default ProtectedRoute

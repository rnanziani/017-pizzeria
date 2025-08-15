import React, { createContext, useContext, useState } from 'react'

// 🎯 Crear el contexto
const UserContext = createContext()

// 🎯 Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider')
  }
  return context
}

// 🎯 Provider del contexto
export const UserProvider = ({ children }) => {
  // 🎯 Estado del token - por defecto false (usuario no logueado)
  const [token, setToken] = useState(false)

  // 🎯 Método para hacer logout
  const logout = () => {
    setToken(false)
    // Aquí podrías agregar lógica adicional como:
    // - Limpiar localStorage
    // - Redireccionar
    // - Limpiar otros estados
  }

  // 🎯 Método para hacer login (útil para el futuro)
  const login = () => {
    setToken(true)
  }

  // 🎯 Valor que se compartirá con todos los componentes hijos
  const value = {
    token,        // Estado del token
    logout,       // Función para cerrar sesión
    login,        // Función para iniciar sesión
    isAuthenticated: token  // Alias más semántico
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

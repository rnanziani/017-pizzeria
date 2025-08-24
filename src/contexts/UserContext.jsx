import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { buildApiUrl, createAuthHeaders } from '../config/api'

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
  // 🎯 Estados para manejar la autenticación
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  // 🎯 Función para hacer peticiones HTTP con headers de autorización
  const makeAuthenticatedRequest = useCallback(async (url, options = {}) => {
    const headers = createAuthHeaders(token)
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }, [token])

  // 🎯 Método para hacer login
  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const response = await makeAuthenticatedRequest(buildApiUrl('/auth/login'), {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      // 🎯 Guardar token y email en estado y localStorage
      setToken(response.token)
      setUserEmail(response.email)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userEmail', response.email)

      return { success: true, data: response }
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [makeAuthenticatedRequest])

  // 🎯 Método para hacer register
  const register = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const response = await makeAuthenticatedRequest(buildApiUrl('/auth/register'), {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      // 🎯 Guardar token y email en estado y localStorage
      setToken(response.token)
      setUserEmail(response.email)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userEmail', response.email)

      return { success: true, data: response }
    } catch (error) {
      console.error('Error en register:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [makeAuthenticatedRequest])

  // 🎯 Método para hacer logout
  const logout = useCallback(() => {
    // 🎯 Limpiar estados
    setToken(null)
    setUserEmail(null)
    setUserProfile(null)
    
    // 🎯 Limpiar localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
  }, [])

  // 🎯 Método para obtener el perfil del usuario
  const getUserProfile = useCallback(async () => {
    if (!token) {
      throw new Error('No hay token de autenticación')
    }

    setLoading(true)
    try {
      const response = await makeAuthenticatedRequest(buildApiUrl('/auth/me'))
      setUserProfile(response)
      return response
    } catch (error) {
      console.error('Error obteniendo perfil:', error)
      // 🎯 Si hay error de autenticación, hacer logout
      if (error.message.includes('401') || error.message.includes('403')) {
        logout()
      }
      throw error
    } finally {
      setLoading(false)
    }
  }, [token, makeAuthenticatedRequest, logout])

  // 🎯 Verificar token al cargar la aplicación
  useEffect(() => {
    if (token) {
      // 🎯 Opcional: Verificar si el token sigue siendo válido
      getUserProfile().catch(() => {
        // 🎯 Si falla, limpiar datos inválidos
        logout()
      })
    }
  }, [token, getUserProfile, logout]) // 🎯 Incluir dependencias necesarias

  // 🎯 Valor que se compartirá con todos los componentes hijos
  const value = {
    // 🎯 Estados
    token,
    userEmail,
    userProfile,
    loading,
    isAuthenticated: !!token, // 🎯 Boolean más semántico
    
    // 🎯 Métodos
    login,
    register,
    logout,
    getUserProfile,
    makeAuthenticatedRequest // 🎯 Para usar en otros contextos
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext

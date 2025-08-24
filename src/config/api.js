// 🎯 Configuración de la API
export const API_CONFIG = {
  // 🎯 URL base de la API (ajusta según tu backend)
  BASE_URL: 'http://localhost:5001/api',
  
  // 🎯 Endpoints de autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me'
  },
  
  // 🎯 Endpoints de compras
  CHECKOUT: '/checkouts',
  
  // 🎯 Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  }
}

// 🎯 Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// 🎯 Función helper para crear headers con autorización
export const createAuthHeaders = (token) => {
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

# Sistema de Carrito de Compras - Pizzeria Mamma Mia!

## 📋 Resumen de Implementación

Este proyecto implementa un sistema completo de carrito de compras utilizando **React Context API** y **useReducer** para manejar el estado global de la aplicación.

## 🏗️ Arquitectura del Sistema

### 1. **CartContext** (`src/contexts/CartContext.jsx`)
- **Propósito**: Maneja el estado global del carrito de compras
- **Tecnologías**: React Context API + useReducer
- **Funcionalidades**:
  - Agregar productos al carrito
  - Remover productos del carrito
  - Actualizar cantidades
  - Calcular total automáticamente
  - Obtener cantidad de items específicos
  - Vaciar carrito completo

### 2. **PizzaContext** (`src/contexts/PizzaContext.jsx`)
- **Propósito**: Centraliza las llamadas a la API de pizzas
- **Funcionalidades**:
  - Obtener lista de pizzas
  - Obtener pizza específica por ID
  - Manejo de estados de carga y error

## 🔧 Componentes Actualizados

### **App.jsx**
```jsx
// Envuelve la aplicación con los providers
<PizzaProvider>
  <CartProvider>
    <Router>
      {/* Componentes de la aplicación */}
    </Router>
  </CartProvider>
</PizzaProvider>
```

### **Navbar.jsx**
- Consume `useCart()` para mostrar el total y cantidad de items
- Muestra: `🛒 Total: $X.XXX (Y items)`

### **Home.jsx**
- Usa `usePizza()` para obtener las pizzas
- Elimina la lógica de fetch local

### **CardPizza.jsx**
- Consume `useCart()` para funcionalidad de agregar al carrito
- Muestra cantidad en carrito si > 0
- Botón "Añadir 🛒" funcional

### **Cart.jsx**
- Consume `useCart()` para todas las operaciones del carrito
- Funcionalidades:
  - Mostrar items del carrito
  - Agregar/remover items
  - Vaciar carrito completo
  - Mostrar total calculado
  - Estado vacío con mensaje amigable

### **Pizza.jsx**
- Usa `usePizza()` para obtener pizza específica
- Consume `useCart()` para agregar al carrito
- Muestra cantidad en carrito

## 🎯 Funcionalidades Implementadas

### ✅ Requerimientos Cumplidos

1. **Context para carrito de compras** ✅
   - CartContext con useReducer
   - Estado global centralizado

2. **Navbar muestra total del carrito** ✅
   - Total calculado automáticamente
   - Cantidad de items visible

3. **Agregar productos desde Home** ✅
   - Botón "Añadir 🛒" funcional
   - Indicador de cantidad en carrito

4. **Página Cart funcional** ✅
   - Lista de productos agregados
   - Agregar/eliminar productos
   - Vaciar carrito completo

5. **Total sincronizado** ✅
   - Mismo total en Navbar y Cart
   - Cálculo automático en tiempo real

6. **Context para pizzas ** ✅
   - PizzaContext implementado
   - Centralización de llamadas API

## 🚀 Cómo Usar el Sistema

### Para Desarrolladores

1. **Acceder al carrito en cualquier componente**:
```jsx
import { useCart } from '../contexts/CartContext';

const MyComponent = () => {
  const { 
    items, 
    total, 
    addToCart, 
    removeFromCart,
    getItemQuantity 
  } = useCart();
  
  // Usar las funciones según necesites
};
```

2. **Acceder a las pizzas**:
```jsx
import { usePizza } from '../contexts/PizzaContext';

const MyComponent = () => {
  const { 
    pizzas, 
    loading, 
    error, 
    getPizzaById 
  } = usePizza();
  
  // Usar los datos según necesites
};
```

### Para Usuarios

1. **Navegar a Home** → Ver todas las pizzas disponibles
2. **Hacer clic en "Añadir 🛒"** → Pizza se agrega al carrito
3. **Ver el total en Navbar** → Actualización automática
4. **Ir a Cart** → Ver productos agregados
5. **Modificar cantidades** → Botones + y - funcionales
6. **Vaciar carrito** → Botón "🗑️ Vaciar carrito"

## 🔄 Flujo de Datos

```
API Backend → PizzaContext → Componentes
                    ↓
CartContext ← Componentes ← Usuario
```

## 📊 Estado del Carrito

```javascript
{
  items: [
    {
      id: "p001",
      name: "Pizza Margherita",
      price: 12000,
      quantity: 2,
      // ... otros datos
    }
  ],
  total: 24000 // Calculado automáticamente
}
```

## 🎨 Características Adicionales

- **Responsive Design**: Funciona en móviles y desktop
- **Accesibilidad**: Aria-labels y navegación por teclado
- **UX Mejorada**: Confirmaciones antes de eliminar
- **Estados de Carga**: Spinners y mensajes informativos
- **Manejo de Errores**: Alertas y mensajes de error
- **Formato de Precios**: Formato chileno (es-CL)

## 🔧 Tecnologías Utilizadas

- **React 18** con Hooks
- **Context API** para estado global
- **useReducer** para lógica compleja
- **React Bootstrap** para UI
- **SweetAlert2** para confirmaciones
- **React Router** para navegación

## 📚 Recursos de Aprendizaje

- [React Context API - Documentación Oficial](https://es.reactjs.org/docs/context.html)
- [useReducer Hook - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [React Hooks - Documentación Oficial](https://es.reactjs.org/docs/hooks-intro.html)

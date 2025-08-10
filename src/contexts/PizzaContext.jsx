import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const PizzaContext = createContext();

// Hook personalizado para usar el contexto
export const usePizza = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizza debe ser usado dentro de un PizzaProvider');
  }
  return context;
};

// Proveedor del contexto
export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las pizzas desde la API
  const fetchPizzas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5001/api/pizzas');
      
      if (!response.ok) {
        throw new Error('Error al obtener las pizzas');
      }
      
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener una pizza específica por ID
  const getPizzaById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5001/api/pizzas/${id}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener la pizza');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pizza:', error);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cargar las pizzas al montar el componente
  useEffect(() => {
    fetchPizzas();
  }, []);

  const value = {
    pizzas,
    loading,
    error,
    fetchPizzas,
    getPizzaById
  };

  return (
    <PizzaContext.Provider value={value}>
      {children}
    </PizzaContext.Provider>
  );
};

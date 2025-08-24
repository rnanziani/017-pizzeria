import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, loading } = useUser(); // 🎯 Obtenemos login y loading del contexto
  const navigate = useNavigate(); // 🎯 Para redireccionar después del login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 🎯 Limpiar errores anteriores
    
    // 🎯 Validaciones del frontend
    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // 🎯 Llamar al método login del contexto
      await login(email, password);
      
      Swal.fire({
        icon: 'success',
        title: '¡Login exitoso!',
        text: 'Bienvenido/a. Redirigiendo...',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // 🎯 Redirigir al home después del login exitoso
        navigate('/');
      });
    } catch (error) {
      // 🎯 Manejar errores de la API
      console.error('Error en login:', error);
      setError(error.message || 'Error al iniciar sesión. Intenta nuevamente.');
      
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: error.message || 'Credenciales inválidas. Verifica tu email y contraseña.'
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Iniciar Sesión</h2>
          
          {/* 🎯 Mostrar errores si existen */}
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit} aria-label="Formulario de login">
            <Form.Group className="mb-3" controlId="login-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-required="true"
                placeholder="Ingresa tu email"
                disabled={loading} // 🎯 Deshabilitar durante loading
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="login-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                aria-required="true"
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                disabled={loading} // 🎯 Deshabilitar durante loading
              />
            </Form.Group>
            
            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading} // 🎯 Deshabilitar durante loading
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </Form>
          
          {/* 🎯 Link para ir a registro */}
          <div className="text-center mt-3">
            <p className="mb-0">
              ¿No tienes cuenta?{' '}
              <a href="/register" className="text-decoration-none">
                Regístrate aquí
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login; 
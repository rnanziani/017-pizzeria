import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { register, loading } = useUser(); // 🎯 Obtenemos register y loading del contexto
  const navigate = useNavigate(); // 🎯 Para redireccionar después del registro

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 🎯 Limpiar errores anteriores
    
    // 🎯 Validaciones del frontend
    if (!email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // 🎯 Llamar al método register del contexto
      await register(email, password);
      
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada correctamente. Redirigiendo...',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // 🎯 Redirigir al home después del registro exitoso
        navigate('/');
      });
    } catch (error) {
      // 🎯 Manejar errores de la API
      console.error('Error en registro:', error);
      setError(error.message || 'Error al crear la cuenta. Intenta nuevamente.');
      
      Swal.fire({
        icon: 'error',
        title: 'Error de registro',
        text: error.message || 'No se pudo crear la cuenta. Verifica los datos ingresados.'
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Crear Cuenta</h2>
          
          {/* 🎯 Mostrar errores si existen */}
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit} aria-label="Formulario de registro">
            <Form.Group className="mb-3" controlId="register-email">
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
            
            <Form.Group className="mb-3" controlId="register-password">
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
            
            <Form.Group className="mb-3" controlId="register-confirm">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                aria-required="true"
                minLength={6}
                placeholder="Repite tu contraseña"
                disabled={loading} // 🎯 Deshabilitar durante loading
              />
            </Form.Group>
            
            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading} // 🎯 Deshabilitar durante loading
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </div>
          </Form>
          
          {/* 🎯 Link para ir a login */}
          <div className="text-center mt-3">
            <p className="mb-0">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-decoration-none">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register; 
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser(); // 🎯 Obtenemos la función login del contexto
  const navigate = useNavigate(); // 🎯 Para redireccionar después del login

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.'
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 6 caracteres.'
      });
      return;
    }
    // 🎯 AQUÍ ESTÁ LA CLAVE: Ejecutar login del contexto
    login(); // Cambia el token a true
    
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
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Login</h2>
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
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login; 
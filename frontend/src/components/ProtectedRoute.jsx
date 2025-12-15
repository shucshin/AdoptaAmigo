/**
 * @fileoverview Componente ProtectedRoute.
 * @version 1.0.0
 * @author Equipo Slytherin
 */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente funcional ProtectedRoute.
 *
 * Envuelve los componentes de la aplicación que requieren autenticación.
 * Si el usuario no ha iniciado sesión, se le redirige a la página de registro/login.
 *
 * @param {object} props Las propiedades del componente.
 * @param {React.ReactNode} props.children Los componentes hijos que se intentan renderizar (la ruta protegida).
 * @returns {React.ReactNode | Navigate} Los componentes hijos si el usuario está logueado, o un componente Navigate para la redirección.
 */
export default function ProtectedRoute({ children }) {
  // Obtener el estado de autenticación del usuario desde el contexto
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    // Si la sesión no está activa (false), redirigir al usuario a la ruta /register (login/registro).
    // 'replace' asegura que la entrada actual en el historial de navegación sea reemplazada.
    return <Navigate to="/register" replace />; 
  }

  // Si el usuario está autenticado (true), renderizar los componentes hijos (la ruta solicitada).
  return children;
}
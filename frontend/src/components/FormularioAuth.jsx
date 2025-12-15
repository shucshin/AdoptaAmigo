/**
 * @fileoverview Componente FormularioAuth.
 * Formulario unificado para el inicio de sesión y registro de usuarios.
 * Permite cambiar entre modos y seleccionar roles durante el registro.
 * @version 1.0.2
 * @author Equipo Slytherin
 */

import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUsers } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

/**
 * Componente funcional FormularioAuth.
 * 
 * Renderiza un formulario que se adapta según el `tipo` (login o register).
 * Gestiona el estado de los campos, la validación básica y la comunicación con el AuthContext.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.tipo - Modo del formulario: 'login' o 'register'.
 * @param {Function} props.onToggleType - Función para alternar entre modos Login/Registro.
 * @returns {JSX.Element} Formulario de autenticación.
 */
export default function FormularioAuth({ tipo, onToggleType }) { 
    
    const navigate = useNavigate();
    const { login, register } = useAuth();
    
    // Estado inicial del formulario
    const [formData, setFormData] = useState({ 
        username: "", 
        password: "", 
        password_confirm: "",
        email: "",
        rol: "adoptante" // Valor por defecto para nuevos registros
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null); 
    const [isError, setIsError] = useState(false);

    /**
     * Actualiza el estado del formulario al cambiar un input.
     * @param {Event} e - Evento de cambio del input.
     */
    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    /**
     * Alterna la visibilidad de la contraseña.
     */
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    /**
     * Maneja el envío del formulario.
     * Realiza el login o registro según corresponda.
     * @param {Event} e - Evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsError(false);
        setIsLoading(true);

        if (tipo === "login") {
            // --- LÓGICA DE INICIO DE SESIÓN ---
            const result = await login(formData.username, formData.password);
            
            if (result.success) {
                navigate("/muro");
            } else {
                // Si falla el login, mostrar error
                setIsError(true);
                setMessage("Usuario o contraseña incorrectos.");
            }
            setIsLoading(false);
        } else {
            // --- LÓGICA DE REGISTRO ---
            const result = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password_confirm: formData.password_confirm,
                rol: formData.rol
            });

            if (result.success) {
                navigate("/muro");
            } else {
                setIsError(true);
                setMessage(result.message || "Error: Ya existe una cuenta con este correo o usuario.");
            }
            setIsLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-blanco rounded-2xl shadow-xl p-8 w-full max-w-md border border-verde-menta"
        >
            {/* Encabezado dinámico del formulario */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-durazno rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUser className="text-2xl text-azul-fondo" />
                </div>
                <h2 className="text-3xl font-bold text-azul-fondo">
                    {tipo === "login" ? "Bienvenido" : "Crear Cuenta"}
                </h2>
                <p className="text-azul-fondo mt-2">
                    {tipo === "login" 
                        ? "Ingresa a tu cuenta" 
                        : "Únete a nuestra comunidad"
                    }
                </p>
            </div>
            
            {/* Mensaje de notificación (éxito o error) */}
            {message && (
                <div className={`p-3 rounded-lg text-sm mb-4 border ${
                    isError 
                    ? "bg-red-100 text-red-700 border-red-400" 
                    : "bg-verde-menta text-azul-fondo border-verde-grisaseo"
                }`}>
                    {message}
                </div>
            )}

            {/* Contenedor de campos */}
            <div className="space-y-4">
                {/* Campo Usuario */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-verde-grisaseo" />
                    </div>
                    <input 
                        name="username"
                        placeholder="Nombre de usuario"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
                    />
                </div>

                {/* Campos exclusivos para registro */}
                {tipo === "register" && ( 
                    <>
                        {/* Campo Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-verde-grisaseo" />
                            </div>
                            <input 
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
                            />
                        </div>

                        {/* Selector de Rol */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUsers className="text-verde-grisaseo" />
                            </div>
                            <select
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco appearance-none"
                            >
                                <option value="adoptante">Quiero Adoptar</option>
                                <option value="publicador">Quiero Publicar Mascotas</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                    </>
                )}

                {/* Campo Contraseña */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-verde-grisaseo" />
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full pl-10 pr-12 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
                    />
                    <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-verde-grisaseo hover:text-azul-fondo transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Campo Confirmar Contraseña (solo registro) */}
                {tipo === "register" && (
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-verde-grisaseo" />
                        </div>
                        <input 
                            type={showPassword ? "text" : "password"}
                            name="password_confirm"
                            placeholder="Confirmar contraseña"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
                        />
                    </div>
                )}
            </div>

            {/* Botón de envío */}
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold text-azul-fondo transition-all duration-200 shadow-lg ${
                    isLoading 
                        ? 'bg-verde-grisaseo cursor-not-allowed' 
                        : 'bg-durazno hover:bg-verde-menta hover:shadow-verde-menta/50'
                }`}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center text-azul-fondo">
                        <div className="w-5 h-5 border-2 border-azul-fondo border-t-transparent rounded-full animate-spin mr-2"></div>
                        Procesando...
                    </span>
                ) : (
                    tipo === "login" ? "Iniciar Sesión" : "Crear Cuenta"
                )}
            </button>

            {/* Enlace para alternar entre Login/Registro */}
            <div className="text-center mt-6 pt-6 border-t border-verde-grisaseo">
                <p className="text-azul-fondo">
                    {tipo === "login" 
                        ? "¿No tienes cuenta? " 
                        : "¿Ya tienes cuenta? "
                    }
                    <button 
                        type="button"
                        className="text-verde-grisaseo hover:text-azul-fondo font-semibold transition-colors"
                        onClick={onToggleType} // Llama a la función del padre para alternar
                    >
                        {tipo === "login" ? "Regístrate" : "Inicia Sesión"}
                    </button>
                </p>
            </div>
        </form>
    );
}
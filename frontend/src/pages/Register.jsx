/**
 * @fileoverview Componente de Página Register (Login/Registro).
 * @version 1.2.0
 * @author Equipo Slytherin
 */

import React, { useState } from 'react'; 
import FormularioAuth from "../components/FormularioAuth";

//Imagenes de Inicio de Sesion y de Registro 
import logo from '../assets/img/LOGO-NEGRO.png'; 
import imagenLogin from '../assets/img/imagen-inicioSesion.jpg';    
import imagenRegistro from '../assets/img/imagen-registro.jpg'; 


/**
 * Componente funcional Register.
 *
 * Muestra la página de autenticación.
 */
export default function Register({ initialType = 'login' }) {
    
    // Estado local para alternar entre Login y Registro
    const [currentFormType, setCurrentFormType] = useState(initialType);

    // Selecciona la imagen según el tipo de formulario actual
    const backgroundImage = currentFormType === 'login' ? imagenLogin : imagenRegistro;
    
    // Función para que FormularioAuth pueda cambiar el tipo (Login/Registro)
    const handleToggleFormType = () => {
        setCurrentFormType(prevType => (prevType === 'login' ? 'register' : 'login'));
    };

    return (

        <div className="min-h-screen flex text-azul-fondo bg-blanco">
            
            {/* 1. Contenedor de la columna izquierda (Formulario) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative">
                
                {/* Nombre de la Página y Logo */}
                <div className="absolute top-8 left-8 flex items-center gap-3">
                    <img 
                        src={logo} 
                        alt="Logo de la página" 
                        className="h-16 w-16 object-contain"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold font-serif">Adopta un Amigo</h1>
                </div>
                
                <FormularioAuth 
                    tipo={currentFormType} 
                    onToggleType={handleToggleFormType} 
                />
            </div>

            {/* 2. Contenedor de la columna derecha (Imagen) */}
            <div 
                className="hidden md:w-1/2 md:flex items-center justify-center bg-cover bg-center rounded-l-3xl rounded-r-none overflow-hidden" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
            </div>
        </div>
    );
}
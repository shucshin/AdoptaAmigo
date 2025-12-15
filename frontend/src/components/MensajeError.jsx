import React from 'react';
import Boton from './Boton';

/**
 * @fileoverview Componente de mensaje de error.
 * @version 1.0.0
 * @author Equipo Slytherin
 */
export default function MensajeError ({ 
    title = "Error de Conexión Irrecuperable", 
    description = "No pudimos conectar con la base de datos. Por favor, verifica tu conexión a internet e intenta recargar la página." 
}) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-96 rounded-lg">
            
            {/* Tarjeta de mensaje de error con sombra y esquinas redondeadas */}
            <div className="w-full flex flex-col items-center space-y-5 p-6 md:p-12 bg-white rounded-3xl bg-red-50 border-2 border-red-200">
                
                {/* Icono de Error (Triángulo con signo de exclamación) */}
                <svg 
                    className="w-16 h-16 text-red-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                </svg>
                
                {/* Texto de Error principal */}
                <h2 className="text-xl font-extrabold text-red-700 font-serif tracking-wide text-center max-w-md">
                    {title}
                </h2>
                
                {/* Texto de descripción y acción secundaria */}
                <p className="text-sm text-azul-fondo text-center max-w-md">
                    {description}
                </p>

                {/* Botón de Recarga para intentar de nuevo */}
                <Boton 
                    texto="Recargar Página" 
                    color="bg-red-500 hover:bg-red-600 text-blanco"
                    onClick={() => window.location.reload()} 
                    customClasses="text-lg py-2 px-6 shadow-lg"
                />
            </div>
        </div>
    );
};
import React from 'react';

/**
 * @fileoverview Componente de mensaje de carga con spinner animado.
 * @version 1.0.0
 * @author Equipo Slytherin
 */
export default function MensajeCargando ({ 
    loadingMessage = "Cargando los compañeros en adopción...", 
    subMessage = "Gracias por tu paciencia. Una vida espera ser cambiada." 
}) {
    return (
        // Contenedor de pantalla completa para centrar el mensaje
        <div className="flex flex-col items-center justify-center p-4">
            
            {/* Tarjeta de mensaje de carga con sombra y esquinas redondeadas */}
            <div className="flex flex-col items-center space-y-5 p-10 bg-blanco rounded-3xl shadow-xl border border-gray-100">
                
                {/* Spinner de Carga */}
                <div 
                    className="w-16 h-16 border-4 border-t-4 border-indigo-100 border-t-azul-fondo rounded-full animate-spin"
                    aria-label="Cargando"
                    role="status"
                >
                </div>
                
                {/* Texto de Carga principal */}
                <h2 className="text-xl font-semibold text-verde-grisaseo font-serif tracking-wide">
                    {loadingMessage}
                </h2>
                
                {/* Texto de Carga secundario */}
                <p className="text-sm text-verde-grisaseo">
                    {subMessage}
                </p>
            </div>
        </div>
    );
};
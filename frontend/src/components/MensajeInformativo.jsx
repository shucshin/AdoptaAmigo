import React from 'react';

/**
 * @fileoverview Componente de mensaje de carga con spinner animado.
 * @version 1.0.0
 * @author Equipo Slytherin
 */
export default function MensajeCargando ({ 
    title = "No hay nuevos amigos en adopción por ahora", 
    description = "Parece que todas las mascotas han encontrado un hogar. ¡Vuelve pronto, actualizamos la lista constantemente!" 
}) {
    return (
        <section className="flex flex-col items-center px-4 py-12">
            <div className="flex flex-col items-center p-12 rounded-3xl border b-2 border-azul-fondo max-w-2xl w-full">

                {/* Título */}
                <h2 className="text-2xl font-extrabold text-azul-fondo mb-2 font-serif text-center">
                    {title}
                </h2>
                
                {/* Descripción */}
                <p className="text-lg text-azul-fondo text-center">
                    {description}
                </p>
            </div>
        </section>
    );
};
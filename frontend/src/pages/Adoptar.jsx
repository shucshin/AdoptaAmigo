/**
 * @fileoverview Componente de Página Adoptar (Muro Principal).
 * @version 1.0.0
 * @author Equipo Slytherin
 */

import React, { useRef } from 'react'; // <-- Importar useRef para manejar el scroll
import ListaMascotas from "../components/ListaMascotas"; 
import Boton from "../components/Boton";
import { useNavigate } from 'react-router-dom'; 
import imgHome from "../assets/img/Mascotas.png"; // Imagen principal para la sección de bienvenida

/**
 * Componente funcional Adoptar.
 *
 * Página principal después del login, que sirve como muro de adopción.
 * Contiene una sección de bienvenida y la galería de mascotas, con funcionalidad de scroll suave.
 *
 * @returns {JSX.Element} La página de adopción renderizada.
 */
export default function Adoptar() {
    const navigate = useNavigate();
    // Referencia utilizada para apuntar a la sección donde se encuentran las tarjetas de mascotas.
    const mascotaListRef = useRef(null); 

    /**
     * Función para realizar un scroll suave hacia la sección de la lista de mascotas
     * (donde se asigna la referencia 'mascotaListRef').
     */
    const scrollToMascotas = () => {
        if (mascotaListRef.current) {
            mascotaListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-verde-grisaseo text-gray-800">
            {/* Contenedor Principal con ancho máximo */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                
                {/* Sección Superior: Bienvenida y llamado a la acción */}
                <section className="flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-xl shadow-lg mb-12">
                    
                    {/* Texto y Botón */}
                    <div className="md:w-1/2 text-center md:text-left p-4">
                        <h2 className="text-4xl font-bold text-azul-fondo leading-tight mb-6">
                            ADOPTA AQUÍ A TU NUEVO 
                            <br /><span className="text-durazno">MEJOR AMIGO</span>
                        </h2>
                        <Boton 
                            texto="ADOPTA AQUÍ" 
                            color="bg-durazno"
                            hoverColor="hover:bg-durazno/80"
                            onClick={scrollToMascotas} // Acción: Scroll a la galería
                        />
                    </div>
                    
                    {/* Imagen Grande */}
                    <div className="md:w-1/2 flex justify-center p-4">
                        <div className="h-64 w-64 md:h-80 md:w-80 flex items-center justify-center">
                            <img 
                                src={imgHome} 
                                alt="Grupo de perros listos para adopción" 
                                className="object-contain w-full h-full rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Sección Central: Galería de Mascotas */}
                <section 
                    ref={mascotaListRef} // Referencia asignada para ser el destino del scroll
                    className="py-8 px-4"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-azul-fondo mb-2">
                            ADOPTA HOY, <span className="text-verde-menta">CAMBIA UNA VIDA</span>
                        </h3>
                        <p className="text-gray-700 text-lg">
                            CONOCE A TUS AMIGOS EN ADOPCIÓN
                        </p>
                    </div>

                    {/* Componente que renderiza la lista de TarjetasMascotas */}
                    <ListaMascotas />

                    {/* Botón "VER TODOS" (mantiene el scroll para centrar la atención) */}
                    <div className="text-center mt-10">
                        <Boton 
                            texto="VER TODOS" 
                            color="bg-azul-fondo"
                            hoverColor="hover:bg-azul-fondo/80"
                            onClick={scrollToMascotas} 
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}
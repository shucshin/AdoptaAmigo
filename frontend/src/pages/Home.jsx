/**
 * @fileoverview Componente de Página Home.
 * Página de aterrizaje principal para usuarios no autenticados (Landing Page).
 * @version 1.0.2
 * @author Equipo Slytherin
 */

import Boton from "../components/Boton";
import { useNavigate } from "react-router-dom";
import imgHome from "../assets/img/imagenInicio2.png"; 
import { useAuth } from "../context/AuthContext";

/**
 * Componente funcional Home.
 *
 * Página de aterrizaje que saluda al usuario, destaca la misión de la aplicación
 * y proporciona botones para iniciar el proceso de autenticación.
 *
 * @returns {JSX.Element} La página de inicio renderizada.
 */
export default function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        // Contenedor principal
        <div className="min-h-screen w-full bg-verde-menta flex items-center py-16 relative"> 
            
            {/* Contenedor del contenido principal de la página  */}
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
                
                {/* Columna Izquierda: Mensajes de Marketing */}
                <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
                    
                    {/* Bloque del Título Principal*/}
                    <div className="mb-6">
                        <h1 className="text-6xl lg:text-7xl font-bold text-azul-fondo font-serif leading-tight">
                            Un nuevo 
                            <br />comienzo
                            <br />lleno de amor
                        </h1>
                    </div>
                    
                    {/* Párrafo Descriptivo */}
                    <p className="text-xl lg:text-2xl font-serif leading-relaxed text-azul-fondo/80 mb-10 max-w-2xl">
                        Cientos de animales esperan una segunda oportunidad, y aquí puedes encontrar al que cambiará tu vida.
                    </p>

                    {/* Contenedor de Autenticación */}
                    {!isAuthenticated ? (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10">
                            <Boton 
                                texto="Iniciar Sesión" 
                                onClick={() => navigate("/login")}  
                                color="bg-azul-fondo hover:bg-azul-fondo/80 text-blanco"
                                className="text-lg py-3 px-8" 
                            />
                            <Boton 
                                texto="Registrate" 
                                onClick={() => navigate("/register")}
                                color="bg-durazno hover:bg-durazno/80 text-azul-fondo"
                                className="text-lg py-3 px-8" 
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10">
                            <Boton 
                                texto="Muro de las Mascotas" 
                                onClick={() => navigate("/muro")}
                                color="bg-azul-fondo hover:bg-azul-fondo/80 text-blanco"
                                className="text-lg py-3 px-8" 
                            />
                        </div>
                    )}
                    
                    {!isAuthenticated && (
                        <div className="mt-6 text-center lg:text-left">
                            <button 
                                className="font-medium font-serif text-azul-fondo text-xl underline hover:text-verde-grisaseo transition-colors py-2"
                                onClick={() => navigate("/muro")} 
                            >
                            Muro de las Mascotas
                            </button>
                        </div>
                    )}
                    
                </div>

                {/* Columna Derecha: Ilustración  */}
                <div className="lg:w-1/2 relative flex justify-center mt-8 lg:mt-0">
                    <div className="relative z-10 w-full flex justify-center"> 
                        <img 
                            src={imgHome}
                            alt="Ilustración de mascotas"
                            className="w-full max-w-3xl lg:max-w-4xl object-cover" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
/**
 * @fileoverview Componente de Página MuroMascotas (Muro Principal) - Estética mejorada y sintaxis corregida.
 * @version 1.0.1
 * @author Equipo Slytherin
 */

import React, { useRef } from 'react'; 
import ListaMascotas from "../components/ListaMascotas"; 
import Boton from "../components/Boton";
// import { useNavigate } from 'react-router-dom'; 
import Slide from '../components/Slide';

/**
 * Componente funcional MuroMascotas.
 *
 * Página principal después del login, que sirve como muro de adopción.
 * Contiene una sección de bienvenida y la galería de mascotas.
 *
 */
export default function MuroMascotas() {
    // const navigate = useNavigate();
    const mascotaListRef = useRef(null);

    const [verTodos, setVerTodos] = React.useState(false);
    const [totalMascotas, setTotalMascotas] = React.useState(0);
    const handleTotalChange = React.useCallback((n) => {
        setTotalMascotas(n);
    }, []);

    return (
        // Fondo principal
        <div className="min-h-screen bg-blanco text-azul-fondo">

            {/* Contenedor Principal*/}
            <div className="mx-auto max-w-6xl px-4 py-12"> 
                
                {/* Sección Superior: Bienvenida  */}
                <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-14 py-4 bg-verde-menta rounded-3xl shadow-lg mx-4 mb-12 gap-10"> 
                    
                    {/* Texto*/}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-extrabold text-azul-fondo leading-tight mb-6 font-serif">
                            ADOPTA AQUÍ A TU NUEVO 
                            <br /><span className="text-verde-grisaseo">MEJOR AMIGO</span>
                        </h2>
                        <p className="text-lg text-azul-fondo/80">
                            Explora nuestra galería de compañeros que esperan un nuevo hogar lleno de amor.
                        </p>
                    </div>

                    {/* Slide de imagenes */}
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <Slide className="w-4/5"/> 
                    </div>
                </section>

                {/* Galería de Mascotas */}
                <section 
                    ref={mascotaListRef} 
                    className="py-8 px-4"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-extrabold text-azul-fondo mb-3 font-serif">
                            ADOPTA HOY, <span className="text-verde-grisaseo">CAMBIA UNA VIDA</span>
                        </h3>
                        <p className="text-xl text-azul-fondo/80">
                            CONOCE A TUS AMIGOS EN ADOPCIÓN
                        </p>
                    </div>

                    {/* Componente que renderiza la lista de TarjetasMascotas */}
                    <ListaMascotas 
                        verTodos={verTodos}
                        totalCargadas={handleTotalChange}
                    />

                    {/* Botón "Ver todos" solo aparece si no se a dado click y hay mas de 3 mascotas*/}
                    {!verTodos && totalMascotas > 3 && (
                        <div className="text-center mt-12">
                            <Boton 
                                texto="Ver todos" 
                                color="bg-azul-fondo hover:bg-azul-fondo/80 text-blanco"
                                onClick={() => setVerTodos(true)} 
                                customClasses="text-xl py-3 px-8 shadow-lg"
                            />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
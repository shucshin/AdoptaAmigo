/**
 * @fileoverview Página MisMascotas.
 * Muestra el listado de mascotas publicadas por el usuario autenticado
 * (solo para rol 'publicador') y permite eliminarlas.
 * @version 1.0.0
 * @author Equipo Slytherin
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TarjetaMascota from '../components/TarjetaMascota';
import MensajeCarga from '../components/MensajeCarga';
import MensajeError from '../components/MensajeError';
import Boton from '../components/Boton';

/**
 * Componente funcional MisMascotas.
 * 
 * Renderiza una galería de tarjetas con las mascotas creadas por el usuario actual.
 * Incluye funcionalidad para eliminar mascotas.
 * 
 * @returns {JSX.Element} Página con el listado de mascotas del usuario.
 */
export default function MisMascotas() {
    const { user } = useAuth();
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carga las mascotas cuando el usuario está disponible
    useEffect(() => {
        if (user) {
            fetchMascotas();
        }
    }, [user]);

    /**
     * Obtiene todas las mascotas del backend y filtra las del usuario actual.
     */
    const fetchMascotas = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/mascotas/");
            if (!response.ok) throw new Error("Error al cargar mascotas");
            const data = await response.json();
            
            // Filtramos para mostrar solo las mascotas del usuario logueado
            const myPets = data.filter(m => m.publicador_username === user.username);
            setMascotas(myPets);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    /**
     * Maneja la eliminación de una mascota.
     * @param {number} id - ID de la mascota a eliminar.
     */
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta mascota?")) return;
        
        try {
             const response = await fetch(`http://127.0.0.1:8000/api/mascotas/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                credentials: 'include'
            });

            if (response.ok) {
                // Actualiza el estado local eliminando la mascota borrada
                setMascotas(prev => prev.filter(m => m.id !== id));
            } else {
                alert("Error al eliminar");
            }
        } catch (err) {
            console.error(err);
            alert("Error al eliminar");
        }
    };
    
    /**
     * Obtiene el valor de una cookie por su nombre.
     * Útil para recuperar el token CSRF.
     * 
     * @param {string} name - Nombre de la cookie.
     * @returns {string|null} Valor de la cookie o null si no existe.
     */
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    if (loading) return <MensajeCarga />;
    if (error) return <MensajeError title={error} />;

    return (
        <div className="min-h-screen bg-blanco p-8">
            <h2 className="text-3xl font-bold text-azul-fondo mb-8 font-serif text-center">Mis Mascotas Publicadas</h2>
            
            {mascotas.length === 0 ? (
                <p className="text-center text-lg text-azul-fondo">No has publicado ninguna mascota aún.</p>
            ) : (
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                    {mascotas.map(mascota => (
                        <div key={mascota.id} className="relative group">
                            <TarjetaMascota
                                id={mascota.id}
                                nombre={mascota.nombre}
                                especie={mascota.especie_nombre}
                                genero={mascota.sexo}
                                ubicacion={mascota.ubicacion_abreviatura}
                                edad={mascota.edad_formateada}
                                descripcion={mascota.descripcion}
                                imagen={mascota.imagen}
                            />
                            {/* Botón flotante para eliminar */}
                            <div className="absolute top-4 right-4">
                                <button 
                                    onClick={() => handleDelete(mascota.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 shadow-md transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

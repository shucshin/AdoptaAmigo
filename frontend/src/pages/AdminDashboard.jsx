/**
 * @fileoverview Panel de Administración (Dashboard).
 * Vista exclusiva para usuarios con rol 'admin' que permite gestionar todas las mascotas del sistema.
 * @version 1.0.0
 * @author Equipo Slytherin
 */

import React, { useState, useEffect } from 'react';
import MensajeCarga from '../components/MensajeCarga';
import MensajeError from '../components/MensajeError';

/**
 * Componente funcional AdminDashboard.
 * 
 * Muestra una tabla con todas las mascotas registradas en el sistema
 * y permite a los administradores eliminarlas.
 * 
 * @returns {JSX.Element} Vista del panel de administración.
 */
export default function AdminDashboard() {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar lista completa de mascotas al montar el componente
    useEffect(() => {
        fetchMascotas();
    }, []);

    /**
     * Obtiene la lista de todas las mascotas desde la API.
     */
    const fetchMascotas = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/mascotas/");
            if (!response.ok) throw new Error("Error al cargar mascotas");
            const data = await response.json();
            setMascotas(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    /**
     * Elimina una mascota del sistema.
     * @param {number} id - Identificador de la mascota.
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
                // Actualizar estado visualmente
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
     * Recupera el token CSRF de las cookies del navegador.
     * @param {string} name - Nombre de la cookie a buscar.
     * @returns {string|null} Valor de la cookie.
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
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-azul-fondo mb-8 font-serif text-center">Panel de Administración</h2>
                
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Mascota
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Especie
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Publicador
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mascotas.map(mascota => (
                                <tr key={mascota.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                                <img className="w-full h-full rounded-full object-cover" src={mascota.imagen} alt="" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {mascota.nombre}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{mascota.especie_nombre}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{mascota.publicador_username}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{mascota.fecha_reporte}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button 
                                            onClick={() => handleDelete(mascota.id)}
                                            className="text-red-600 hover:text-red-900 font-bold"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

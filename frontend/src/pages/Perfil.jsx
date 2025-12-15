/**
 * @fileoverview Componente de Página Perfil.
 * @version 1.0.0
 * @author Equipo Slytherin
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserEdit, FaEnvelope, FaPhone, FaUserCircle } from 'react-icons/fa';

/**
 * Componente funcional Perfil.
 *
 * Muestra el perfil del usuario actual y permite la edición de sus datos personales.
 * Los datos se gestionan a través del AuthContext.
 *
 * @returns {JSX.Element} La página de edición de perfil renderizada.
 */
export default function Perfil() {
  // Obtener los datos del usuario y la función para actualizar el contexto
  const { user, setUser } = useAuth();
  // Estado local para manejar los datos del formulario durante la edición, inicializado con los datos del contexto
  const [formData, setFormData] = useState(user);
  // Estado para controlar si el formulario está en modo de edición o solo de visualización
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Actualiza el estado local del formulario (formData) al cambiar cualquier input.
   * @param {Event} e Evento de cambio del input.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Manejador para guardar los cambios. Simula el envío al backend.
   * @param {Event} e Evento de envío del formulario.
   */
  const handleSave = (e) => {
    e.preventDefault();
    // Simulación de guardado: Actualizar el estado global del Contexto
    setUser(formData);
    setIsEditing(false);
    // En una aplicación real, aquí se haría la llamada a la API
    alert('Perfil actualizado con éxito.');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-azul-fondo flex items-center gap-3">
          <FaUserEdit className="text-durazno" /> Editar Perfil
        </h1>
        {/* Botón para alternar el modo de edición/visualización */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isEditing 
              ? 'bg-red-500 hover:bg-red-600 text-white' // Estilo para 'Cancelar'
              : 'bg-verde-menta hover:bg-verde-menta/80 text-azul-fondo' // Estilo para 'Editar'
          }`}
        >
          {isEditing ? 'Cancelar Edición' : 'Editar Información'}
        </button>
      </div>

      <div className="text-center mb-10">
        {/* Ícono o imagen de perfil */}
        <FaUserCircle className="w-24 h-24 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Campo Username */}
        <div className="relative">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-durazno focus-within:ring-1 focus-within:ring-durazno">
            <FaUserEdit className="text-gray-400 ml-3" />
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing} // Deshabilitado si no está en modo edición
              required
              className="block w-full py-2 px-3 pl-2 sm:text-sm rounded-r-lg disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Campo Email */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-durazno focus-within:ring-1 focus-within:ring-durazno">
            <FaEnvelope className="text-gray-400 ml-3" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="block w-full py-2 px-3 pl-2 sm:text-sm rounded-r-lg disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none"
            />
          </div>
        </div>
        
        {/* Campo Teléfono */}
        <div className="relative">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-durazno focus-within:ring-1 focus-within:ring-durazno">
            <FaPhone className="text-gray-400 ml-3" />
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone || ''} // Si el contexto devuelve 'null' para 'phone', usa cadena vacía
              onChange={handleChange}
              disabled={!isEditing}
              className="block w-full py-2 px-3 pl-2 sm:text-sm rounded-r-lg disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Botón de Guardar (Solo visible en modo edición) */}
        {isEditing && (
          <button
            type="submit"
            className="w-full bg-durazno text-white py-3 rounded-lg font-semibold hover:bg-durazno/80 transition-colors shadow-md mt-6"
          >
            Guardar Cambios
          </button>
        )}
      </form>
    </div>
  );
}
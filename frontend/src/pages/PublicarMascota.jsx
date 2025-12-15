/**
 * @fileoverview Componente de Página PublicarMascota.
 * @version 1.0.0
 * @author Equipo Slytherin
 */

import { useState } from "react";
// Íconos de FontAwesome y Lucide para mejorar la usabilidad
// Nota: FaWeightHanging se importó pero no se usó en el código. Se mantiene FaPaw, FaVenusMars, FaCalendar, FaInfoCircle, FaUpload.
import { FaPaw, FaVenusMars, FaCalendar, FaInfoCircle, FaWeightHanging, FaMapMarkerAlt, FaUpload } from 'react-icons/fa'; 
import { Mail, MapPin } from 'lucide-react'; 

/**
 * Componente funcional PublicarMascota.
 *
 * Formulario para el registro de una nueva mascota en el sistema de adopción.
 * Incluye campos para datos básicos, características y subida de imagen.
 *
 * @returns {JSX.Element} La página con el formulario de publicación renderizada.
 */
export default function PublicarMascota() {
    // Estado que almacena todos los datos del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        edad: "",
        sexo: "",
        ubicacion: "",
        descripcion: "",
        imagen: null, // Objeto File
        vacunado: false, // Checkbox
        especie: ""
    });
    // Estado para controlar el estado de carga del botón de envío
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Manejador genérico para actualizar el estado del formulario.
     * Soporta inputs de texto, checkboxes y campos de tipo 'file'.
     * @param {Event} e Evento de cambio del input.
     */
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
        });
    };

    /**
     * Manejador de envío del formulario. Simula la subida de datos.
     * @param {Event} e Evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log("Datos de la nueva mascota:", formData);

        // --- Simulación de envío de datos al backend (retraso de 2s) ---
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        alert("Mascota registrada exitosamente (simulación)");
        // navigate("/adopta"); // Posible redirección
        // ---------------------------------------------
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-verde-grisaseo">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl border-2 border-verde-menta">
                
                {/* Título de la sección */}
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-azul-fondo to-verde-grisaseo bg-clip-text text-transparent font-serif">
                    REGISTRA A TU AMIGO
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Columna Izquierda: Imagen y Reglas */}
                    <div className="flex flex-col space-y-6">
                        {/* Campo de Imagen (Área de subida estilizada) */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 border-2 border-verde-menta border-dashed rounded-xl h-64 cursor-pointer hover:bg-gray-200 transition-colors">
                            <FaUpload className="text-4xl text-azul-fondo mb-2" />
                            <span className="text-azul-fondo font-semibold">
                                {/* Muestra el nombre del archivo o un placeholder */}
                                {formData.imagen ? formData.imagen.name : "Subir Imagen (Max 3MB)"}
                            </span>
                            <input
                                name="imagen"
                                type="file"
                                onChange={handleChange}
                                accept="image/*"
                                className="opacity-0 absolute w-full h-64 cursor-pointer" // Input oculto
                            />
                        </div>

                        {/* Reglas de Publicación */}
                        <div className="p-4 bg-verde-menta/50 rounded-xl">
                            <h3 className="font-bold text-azul-fondo mb-2 flex items-center">
                                <FaInfoCircle className="mr-2" /> Reglas de Publicación:
                            </h3>
                            <ul className="text-sm text-azul-fondo space-y-1 list-disc list-inside">
                                <li>Solo imágenes claras y recientes.</li>
                                <li>Descripción honesta y detallada.</li>
                                <li>Máximo 3MB por imagen.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Columna Derecha: Datos de la Mascota */}
                    <div className="space-y-4">
                        
                        {/* Nombre */}
                        <div className="relative">
                            <FaPaw className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" />
                            <input
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-menta rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200"
                            />
                        </div>

                        {/* Especie */}
                        <div className="relative">
                            <FaPaw className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" />
                            <input
                                name="especie"
                                placeholder="Especie (Ej: Perro, Gato, Erizo)"
                                value={formData.especie}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-menta rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200"
                            />
                        </div>

                        {/* Edad */}
                        <div className="relative">
                            <FaCalendar className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" />
                            <input
                                name="edad"
                                type="number"
                                placeholder="Edad (en meses o años)"
                                value={formData.edad}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full pl-10 pr-4 py-3 border border-verde-menta rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200"
                            />
                        </div>

                        {/* Sexo (Dropdown/Select) */}
                        <div className="relative">
                            <FaVenusMars className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" />
                            <select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-menta rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 bg-white appearance-none"
                            >
                                <option value="" disabled>Selecciona Sexo</option>
                                <option value="macho">Macho</option>
                                <option value="hembra">Hembra</option>
                            </select>
                        </div>
                        
                        {/* Ubicación */}
                        <div className="relative">
                            <MapPin size={20} className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 mt-2.5" />
                            <input
                                name="ubicacion"
                                placeholder="Ubicación (Ciudad/Estado)"
                                value={formData.ubicacion}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-menta rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200"
                            />
                        </div>

                        {/* Vacunado Checkbox */}
                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                id="vacunado"
                                name="vacunado"
                                type="checkbox"
                                checked={formData.vacunado}
                                onChange={handleChange}
                                className="h-5 w-5 text-durazno border-verde-menta rounded focus:ring-durazno"
                            />
                            <label htmlFor="vacunado" className="text-gray-700 font-medium">
                                ¿Está vacunado?
                            </label>
                        </div>

                        {/* Descripción (Textarea) */}
                        <textarea
                            name="descripcion"
                            placeholder="Describe a la mascota (personalidad, necesidades, etc.)"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-3 border border-verde-menta rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Botón de envío (con estado de carga) */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-8 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                        isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-azul-fondo hover:bg-azul-fondo/80 shadow-lg hover:shadow-azul-fondo/30'
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Publicando...
                        </span>
                    ) : (
                        "Publicar Mascota"
                    )}
                </button>
            </form>
        </div>
    );
}
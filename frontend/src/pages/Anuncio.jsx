/**
 * @fileoverview Componente de Página Anuncio (Formulario para publicar una nueva mascota).
 * @version 1.0.0
 * @author Equipo Slytherin
 */

import { useState } from "react";
// Importar useNavigate para la redirección
import { useNavigate } from 'react-router-dom'; 
import { FaPaw, FaVenusMars, FaCalendar, FaInfoCircle, FaUpload } from 'react-icons/fa'; 
import { MapPin, Smile } from 'lucide-react'; 
import FeedbackModal from "../components/FeedbackModal";

/**
 * Componente funcional Anuncio.
 *
 * Formulario para el registro de una nueva mascota en el sistema de adopción.
 */
export default function Anuncio() {
    // Instanciar useNavigate
    const navigate = useNavigate();

    // Estado que almacena todos los datos del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        edad: "",
        sexo: "",
        ubicacion: "",
        descripcion: "",
        imagen: null, 
        vacunado: false, 
        especie: ""
    });
    // Estado para controlar el estado de carga del botón de envío
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Manejador genérico para actualizar el estado del formulario.
     */
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
        });
    };

    /**
     * Manejador de envío del formulario
     */
     const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            //  Función para leer cookies (csrf)
            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            };

            //  Asegurarnos de tener csrftoken
            let csrftoken = getCookie("csrftoken");
            if (!csrftoken) {
                // Petición
                await fetch("http://127.0.0.1:8000/api/auth/csrf/", {
                    method: "GET",
                    credentials: "include",
                });
                csrftoken = getCookie("csrftoken");
            }

            //  Construir FormData con los campos que el backend espera
            const data = new FormData();
            data.append("nombre", formData.nombre);
            data.append("edad_meses", formData.edad);
            data.append("descripcion", formData.descripcion);
            data.append("vacunado", formData.vacunado ? "true" : "false");
            data.append("sexo", formData.sexo);
            
            // Enviamos directamente el ID seleccionado en el dropdown
            data.append("ubicacion", formData.ubicacion);
            data.append("especie", formData.especie);

            if (formData.imagen) {
                data.append("imagen", formData.imagen);
            }

            // Enviar POST al backend
            const response = await fetch("http://127.0.0.1:8000/api/mascotas/", {
                method: "POST",
                body: data,
                credentials: "include",     
                headers: {
                    "X-CSRFToken": csrftoken || "",
                },
            });

            if (!response.ok) {
                let errorText = "Error al registrar la mascota";
                try {
                    const errorData = await response.json();
                    console.error("Error backend:", errorData);
                    if (typeof errorData === "object") {
                        errorText = JSON.stringify(errorData, null, 2);
                    }
                } catch (_) {
                    
                }
                alert(errorText);
                setIsLoading(false);
                return;
            }
            const mascotaCreada = await response.json();
            console.log("Mascota creada:", mascotaCreada);

            setShowPublishModal(true);
        } catch (err) {
            console.error("Error en el envío:", err);
            alert("Error de conexión con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    const [showPublishModal, setShowPublishModal] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-verde-grisaseo">
            <form onSubmit={handleSubmit} className="bg-blanco rounded-2xl shadow-2xl p-8 w-full max-w-2xl border-2 border-verde-menta">
                
                {/* Título de la sección */}
                <h2 className="text-3xl font-bold text-center mb-8 font-serif text-azul-fondo">
                    AÑADE UN ANUNCIO
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Columna Izquierda: Imagen y Reglas */}
                    <div className="flex flex-col space-y-6">
                        {/* Campo de Imagen  */}
                        <label htmlFor="upload-image" className="flex flex-col items-center justify-center bg-verde-menta/30 border-2 border-verde-grisaseo border-dashed rounded-xl h-64 cursor-pointer hover:bg-verde-menta/50 transition-colors">
                            <FaUpload className="text-4xl text-azul-fondo mb-2" />
                            <span className="text-azul-fondo font-semibold text-center px-4">
                                {formData.imagen ? formData.imagen.name : "Subir Imagen (Max 3MB)"}
                            </span>
                            <input
                                id="upload-image"
                                name="imagen"
                                type="file"
                                onChange={handleChange}
                                accept="image/*"
                                className="opacity-0 absolute w-full h-64 cursor-pointer" 
                            />
                        </label>

                        {/* Reglas de Publicación */}
                        <div className="p-4 bg-verde-menta rounded-xl">
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
                            <FaPaw className="absolute inset-y-0 left-0 pl-3 flex items-center text-verde-grisaseo" />
                            <input
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
                            />
                        </div>

                        {/* Especie */}
                        <div className="relative">
                            <FaPaw className="absolute inset-y-0 left-0 pl-3 flex items-center text-verde-grisaseo" />
                            <select
                                name="especie"
                                value={formData.especie}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 bg-blanco appearance-none text-azul-fondo"
                            >
                                <option value="" disabled>Selecciona Especie</option>
                                <option value="2">Perro</option>
                                <option value="3">Gato</option>
                                <option value="1">Hámster</option>
                            </select>
                        </div>

                        {/* Edad */}
                        <div className="relative">
                            <FaCalendar className="absolute inset-y-0 left-0 pl-3 flex items-center text-verde-grisaseo" />
                            <input
                                name="edad"
                                type="number"
                                placeholder="Edad (en meses o años)"
                                value={formData.edad}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
                            />
                        </div>

                        {/* Sexo (Dropdown/Select) */}
                        <div className="relative">
                            <FaVenusMars className="absolute inset-y-0 left-0 pl-3 flex items-center text-verde-grisaseo" />
                            <select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 bg-blanco appearance-none text-azul-fondo"
                            >
                                <option value="" disabled>Selecciona Sexo</option>
                                <option value="macho">Macho</option>
                                <option value="hembra">Hembra</option>
                            </select>
                        </div>
                        
                        {/* Ubicación */}
                        <div className="relative">
                            <MapPin size={20} className="absolute inset-y-0 left-0 pl-3 flex items-center text-verde-grisaseo mt-2.5" />
                            <select
                                name="ubicacion"
                                value={formData.ubicacion}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 bg-blanco appearance-none text-azul-fondo"
                            >
                                <option value="" disabled>Selecciona Ubicación</option>
                                <option value="1">Ciudad de México (CDMX)</option>
                                <option value="2">Estado de México</option>
                                <option value="3">Jalisco</option>
                                <option value="4">Nuevo León</option>
                                <option value="5">Puebla</option>
                                <option value="6">Querétaro</option>
                                <option value="7">Morelos</option>
                                <option value="8">Baja California</option>
                                <option value="9">Guanajuato</option>
                                <option value="10">Yucatán</option>
                            </select>
                        </div>

                        {/* Vacunado Checkbox */}
                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                id="vacunado"
                                name="vacunado"
                                type="checkbox"
                                checked={formData.vacunado}
                                onChange={handleChange}
                                className="h-5 w-5 text-durazno border-verde-grisaseo rounded focus:ring-durazno"
                            />
                            <label htmlFor="vacunado" className="text-azul-fondo font-medium">
                                ¿Está vacunado?
                            </label>
                        </div>

                        {/* Descripción */}
                        <textarea
                            name="descripcion"
                            placeholder="Describe a la mascota (personalidad, necesidades, etc.)"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-3 border border-verde-grisaseo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 resize-none text-azul-fondo bg-blanco"
                        ></textarea>
                    </div>
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-8 py-3 px-4 rounded-xl font-semibold text-blanco transition-all duration-200 ${
                        isLoading 
                            ? 'bg-verde-grisaseo cursor-not-allowed' 
                            : 'bg-azul-fondo hover:bg-azul-fondo/80 shadow-lg hover:shadow-azul-fondo/30'
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-blanco border-t-transparent rounded-full animate-spin mr-2"></div>
                            Publicando...
                        </span>
                    ) : (
                        "Publicar Anuncio"
                    )}
                </button>
            </form>

            <FeedbackModal
                isOpen={showPublishModal}
                title="¡Se ha publicado con éxito!"
                message=""
                icon={<Smile size={32} className="text-azul-fondo" />}
                showButtons={false}        
                centerContent={true}      
                showCloseIcon={true}
                iconPosition="below"       
                onConfirm={() => {
                    setShowPublishModal(false);
                    navigate("/muro");
                }}
            />
        </div>
    );
}
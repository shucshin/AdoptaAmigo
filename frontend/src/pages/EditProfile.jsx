import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import React, { useState, useEffect } from "react";

import { 
  FaUser, 
  FaInfoCircle, 
  FaPaw, 
  FaCalendar,  
  FaLock, 
  FaEye, 
  FaEyeSlash 
} from "react-icons/fa";
import erizo from "../assets/erizo.jpg";
import FeedbackModal from "../components/FeedbackModal"; // Ajusta la ruta si es diferente

export default function EditProfile() {
  const navigate = useNavigate();
  const {user} = useAuth();

  // Estado del formulario
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",

  });

  // Estados para UI
  const [isLoading, setIsLoading] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/perfil/", {
        withCredentials: true // porque usas sesiones
      });

      setFormData({
        username: res.data.username,
        email: res.data.email,
        bio: res.data.bio,
        avatar: res.data.avatar,
        password: ""
      });

    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);


  const togglePasswordVisibility = () => setShowPassword(prev => !prev);


  // Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormData(prev => ({ ...prev, imagen: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Manejo de envío
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const formPayload = new FormData();
  Object.keys(formData).forEach((key) => {
    formPayload.append(key, formData[key]);
  });

  try {
    await axios.put("http://localhost:8000/api/perfil/", formPayload, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    });

    setShowPublishModal(true);

  } catch (error) {
    console.error("Error actualizando:", error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-blanco">
      <form 
        onSubmit={handleSubmit} 
        className="bg-blanco rounded-2xl shadow-2xl p-8 w-full max-w-2xl border-2 border-none"
      >
        <h2 className="text-3xl font-bold text-center mb-8 font-serif text-azul-fondo">
          Editar Perfil
        </h2>

        <div className="grid grid-cols-1 gap-6">


          {/* Columna Derecha: Datos de la Mascota */}
          <div className="space-y-4">

            {/* Nombre */}
            <div className="relative">
              <FaPaw className="absolute inset-y-0 left-0 pl-3 flex items-center text-verde-grisaseo" />
              <input
                name="username"
                placeholder="Nombre de la mascota"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-azul-fondo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
              />
            </div>



            {/* Correo */}
            <div className="relative">
              <FaPaw className="absolute inset-y-0 left-0 pl-3 flex items-center text-verde-grisaseo" />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-azul-fondo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-verde-grisaseo" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-12 py-3 border border-azul-fondo rounded-xl focus:ring-2 focus:ring-durazno focus:border-durazno transition-all duration-200 text-azul-fondo bg-blanco"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-verde-grisaseo text-azul-fondo transition-colors"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>


          </div>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-8 py-3 px-4 rounded-xl font-semibold text-azul-fondo bg-verde-grisaseo transition-all duration-200 cursor-pointer${
            isLoading 
              ? 'bg-verde-grisaseo cursor-not-allowed' 
              : 'bg-azul-fondo hover:bg-azul-fondo/80 shadow-lg hover:shadow-azul-fondo/30 hover:text-blanco'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-blanco border-t-transparent rounded-full animate-spin mr-2"></div>
              Publicando...
            </span>
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </form>

      <FeedbackModal
        isOpen={showPublishModal}
        title="¡Se ha publicado con éxito!"
        message=""
        icon={<FaInfoCircle size={32} className="text-azul-fondo" />}
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

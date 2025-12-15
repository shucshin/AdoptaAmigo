/**
 * @fileoverview Componente de Página DetalleMascota.
 * Muestra el perfil completo de una mascota específica.
 * @version 1.0.0
 * @author Equipo Slytherin
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaPaw, FaMapMarkerAlt, FaVenusMars, FaHeart, FaSyringe, FaInfoCircle } from 'react-icons/fa';
import { Cake, Smile } from 'lucide-react';
import MensajeError from '../components/MensajeError';
import MensajeInformativo from '../components/MensajeInformativo';
import Boton from '../components/Boton';
import FeedbackModal from "../components/FeedbackModal";
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from "../context/AuthContext";

export default function DetalleMascota() {
    // Captura el ID de la mascota de la URL
    const { id } = useParams();
    const [mascota, setMascota] = useState(null);
    const [noExiste, setNoExiste] = useState(false);
    const [error, setError] = useState(null);
    const [showAdoptModal, setShowAdoptModal] = useState(false);
    const navigate = useNavigate();
        const { isAuthenticated } = useAuth();
        const adoptedList = JSON.parse(localStorage.getItem("adoptedPets") || "[]");
        const isAdopted = adoptedList.includes(Number(id));


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/mascotas/${id}`)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 404) {
                        setNoExiste(true);
                        throw new Error(`No se encontro la mascota.`);
                    }
                    throw new Error(`Fallo la conexión con el servidor.`);
                }
                return res.json();
            })
            .then(data => {
                setMascota(data);
            })
            .catch(err => {
                console.error("Error al cargar detalle:", err);
                setError(err.message);
            });
    }, [id]);

    // Casos de error
    if (error){
        if (noExiste) {
            return (
                <div className = "mx-auto max-w-6xl px-4 py-12">
                    <MensajeInformativo title = {error}
                    description = "Lo sentimos, no pudimos encontrar el perfil de esta mascota. Es posible que el enlace sea incorrecto o que el peludo ya haya sido adoptado."/>
                </div>
            );
        }
        return (
            <div className = "mx-auto max-w-6xl px-4 py-12">
                <MensajeError title = {error}/>
            </div>
        );
    }

    if (!mascota) return null;

    const vacunadoStatus = mascota.vacunado 
        ? { text: "Sí", color: "text-azul-fondo" } 
        : { text: "No", color: "text-durazno" };

    // Estilo para el género
    const generoInfo = mascota.sexo === 'macho'
    ? { text: "Macho", icon: <FaVenusMars className="text-azul-fondo" /> }
    : { text: "Hembra", icon: <FaVenusMars className="text-azul-fondo" /> };

    // Cuando el usuario hace click en "¡Quiero Adoptar!"
    const handleAdoptarClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        // Guardar en localStorage como adoptada (evita duplicados)
        const updated = [...new Set([...adoptedList, Number(id)])];
        localStorage.setItem("adoptedPets", JSON.stringify(updated));

        setShowAdoptModal(true);
    };


    return (
    <>
        <div className="max-w-4xl mx-auto bg-blanco p-8 rounded-xl shadow-2xl border border-gray-200 my-12">
            <h1 className="text-3xl font-bold text-azul-fondo mb-8 border-b pb-4">
                Conoce más a: <span className="text-verde-grisaseo">{mascota.nombre}</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Columna Izquierda: Imagen */}
                <div className="md:w-1/2 w-full">
                    <img
                        src={mascota.imagen} 
                        alt={`Imagen de ${mascota.nombre}`}
                        className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
                    />
                    
                     <div className="flex justify-center">
                        {isAdopted ? (
                            <p className="text-red-500 text-xl font-bold text-center">Ya ha sido adoptada</p>
                        ) : (
                            <Boton 
                                texto="¡Quiero Adoptar!"
                                customClasses="w-full text-base px-4 shadow-lg"
                                onClick={handleAdoptarClick}
                            />
                        )}
                    </div>
                </div>

                {/* Columna Derecha: Detalles y Descripción */}
                <div className="md:w-1/2 space-y-6 w-full">
                    
                    {/* Fila de Datos Cortos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-azul-fondo text-lg">
                        
                        {/* 1. Especie */}
                        <p className="bg-verde-grisaseo/30 p-3 rounded-lg flex items-center gap-1">
                            <FaPaw className="text-azul-fondo" /> <span className="font-bold">Especie:</span> {mascota.especie_nombre}
                        </p>
                        
                        {/* 2. Edad */}
                        <p className="bg-verde-grisaseo/30 p-3 rounded-lg flex items-center gap-1">
                            <Cake size={18} className="text-azul-fondo" /> <span className="font-bold">Edad:</span> {mascota.edad_formateada}
                        </p>
                        
                        {/* 3. Género */}
                        <p className="bg-verde-grisaseo/30 p-3 rounded-lg flex items-center gap-1">
                            {generoInfo.icon} <span className="font-bold">Género:</span> {generoInfo.text}
                        </p>

                        {/* 4. Vacunado */}
                        <p className="bg-verde-grisaseo/30 p-3 rounded-lg flex items-center gap-1">
                            <FaSyringe/> <span className="font-bold">Vacunado:</span> {vacunadoStatus.text}
                        </p>

                        {/* 5. Ubicación */}
                        <p className="bg-verde-grisaseo/30 p-3 rounded-lg col-span-1 sm:col-span-2 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-azul-fondo" /> <span className="font-bold">Ubicación:</span> {mascota.ubicacion_estado}
                        </p>
                    </div>

                    {/* Descripción */}
                    <div>
                        <h3 className="font-bold text-azul-fondo mb-2 flex items-center gap-2">
                             <FaInfoCircle className="text-azul-fondo" /> Detalles de Personalidad:
                        </h3>
                        <p className="text-azul-fondo/80 leading-relaxed text-lg">
                            {mascota.descripcion}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <FeedbackModal
            isOpen={showAdoptModal}
            title="¡SOLICITUD DE ADOPCIÓN EXITOSA!"
            message="Te mandaremos las especificaciones al correo registrado en un periodo de 10 días."
            icon={<Smile size={32} className="text-azul-fondo" />}
            showButtons={false}
            centerContent={true}
            showCloseIcon={true}
            iconPosition="below"
            onConfirm={() => {
                setShowAdoptModal(false);
                navigate("/muro");
            }}
        />
    </>

    );
}
/**
 * @fileoverview Componente Footer.
 * @version 1.0.0
 * @author Equipo Slytherin
 */
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Mail, MapPin } from 'lucide-react';
import logo from '../assets/img/LOGO.png';

/**
 * Componente funcional Footer.
 *
 * El pie de página principal de la aplicación, con diseño de 3 columnas (logo, info, redes).
 * Permite personalizar el color de fondo y el título del logo.
 *
 */
export default function Footer({ color = "bg-azul-fondo", texto = "Adopta un Amigo" }) {
  return (
    <footer className={`${color} py-10 text-white`}>
      <div className="container mx-auto px-6">
        {/* Contenedor principal de 3 columnas (en móvil se apilan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* 1. Logo + Nombre */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
              <h3 className="text-2xl font-bold font-serif">{texto}</h3>
            </div>
          </div>

          {/* 2. Texto Descriptivo + Contacto + Enlaces Legales */}
          <div className="flex flex-col items-center text-center">
            {/* Texto descriptivo en una sola línea */}
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Conectamos corazones y hogares.
            </p>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
               Nuestro objetivo es darle una nueva oportunidad a cada perrito que espera amor y cuidado.
            </p>
            {/* Información de contacto */}
            <div className="space-y-3 text-sm text-gray-200 mb-6">
              <div className="flex items-center justify-center gap-3">
                <MapPin size={18} className="text-verde-menta" /> {/* Ícono de ubicación */}
                <span>Ciudad Universitaria</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail size={18} className="text-verde-menta" /> {/* Ícono de correo */}
                <span>adoptaUnAmigo@gmail.com</span>
              </div>
            </div>

            {/* Enlaces legales (flex-wrap para evitar que se corten en pantallas pequeñas) */}
            <div className="flex flex-wrap justify-center gap-5 text-xs text-gray-400">
              <a href="#" className="hover:text-verde-menta transition">Privacidad</a>
              <a href="#" className="hover:text-verde-menta transition whitespace-nowrap">Política de cookies</a>
              <a href="#" className="hover:text-verde-menta transition">Avisos Legales</a>
              <a href="#" className="hover:text-verde-menta transition">Contacto</a>
              <a href="#" className="hover:text-verde-menta transition">Accesibilidad</a>
            </div>
          </div>

          {/* 3. Redes sociales */}
          <div className="flex justify-center md:justify-end">
            <div className="flex gap-4">
              {/* Botones de redes sociales con efecto hover */}
              <a href="#" className="w-10 h-10 bg-verde-menta rounded-full flex items-center justify-center hover:bg-verde-grisaseo transition">
                <FaTwitter className="text-black hover:text-white transition" />
              </a>
              <a href="#" className="w-10 h-10 bg-verde-menta rounded-full flex items-center justify-center hover:bg-verde-grisaseo transition">
                <FaInstagram className="text-black hover:text-white transition" />
              </a>
              <a href="#" className="w-10 h-10 bg-verde-menta rounded-full flex items-center justify-center hover:bg-verde-grisaseo transition">
                <FaFacebook className="text-black hover:text-white transition" />
              </a>
              <a href="#" className="w-10 h-10 bg-verde-menta rounded-full flex items-center justify-center hover:bg-verde-grisaseo transition">
                <FaYoutube className="text-black hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor (Copyright) */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Slytherin en México y Centroamérica. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
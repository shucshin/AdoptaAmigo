import { useState, useEffect } from "react";

import perro1 from "../assets/img/perro2.png";
import perro2 from "../assets/img/adoptame-perro.jpg";
import perro3 from "../assets/img/imagenHome.jpg";

const imagenes = [perro1, perro2, perro3];
export default function CarruselMascotas({className}) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className={`relative overflow-hidden bg-verde-grisaseo/30 rounded-3xl p-0 aspect-[4/3] shadow-inner ${className}`}
      > {/* Carril de slides */}
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{
            width: `${imagenes.length * 100}%`,
            transform: `translateX(-${indice * (100 / imagenes.length)}%)`,
          }}
        >
          {imagenes.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
              style={{ width: `${100 / imagenes.length}%` }}
            >
              <img
                src={img}
                alt={`Mascota ${i + 1}`}
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

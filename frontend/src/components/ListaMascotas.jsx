import { useState, useEffect } from "react";
import TarjetaMascota from "./TarjetaMascota";
import MensajeCargando from "../components/MensajeCarga";
import MensajeError from "../components/MensajeError";
import { useBusqueda } from "../context/BusquedaContext";

export default function ListaMascotas({verTodos, totalCargadas}) {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { terminoBusqueda } = useBusqueda();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/mascotas/")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar las mascotas");
        return res.json();
      })
      .then((data) => {
        setMascotas(data);
        // Notificamos al componente padre cuántas mascotas hay
        // Esto sirve para ocultar el boton cuando no hay muchas mascotas de la galeria
        totalCargadas?.(data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar mascotas:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [totalCargadas]);

  const mascotasFiltradas = mascotas.filter((m) => {
    // Si no hay búsqueda, mostramos todas
    if (!terminoBusqueda) return true;
    
    // Si hay búsqueda, comparamos solo con la especie
    return m.especie_nombre?.toLowerCase().includes(terminoBusqueda.toLowerCase());
  });

  // Mensaje de cargando mascotas
  if (loading)
    return (
      <MensajeCargando/>
    );

  // Caso de error
  if (error)
    return (
      <MensajeError title = {error}/>
    );

  // Caso si no hay mascotas
  if (mascotas.length === 0)
    return (
    <section className="flex flex-col items-center px-4 py-12">
      <div className="flex flex-col items-center p-12 rounded-3xl border b-2 border-azul-fondo max-w-2xl w-full">

        {/* Título */}
        <h2 className="text-2xl font-extrabold text-azul-fondo mb-2 font-serif text-center">
            No hay nuevos amigos en adopción por ahora
        </h2>
        
        {/* Descripción */}
        <p className="text-lg text-azul-fondo text-center">
            Parece que todas las mascotas han encontrado un hogar. ¡Vuelve pronto, actualizamos la lista constantemente!
        </p>
      </div>
    </section>
  );

  // Hay mascotas, pero ninguna coincide con la búsqueda
  if (mascotasFiltradas.length === 0) {
    return (
      <section className="flex flex-col items-center px-4 py-12">
        <div className="flex flex-col items-center p-12 rounded-3xl border-2 border-dashed border-azul-fondo max-w-2xl w-full opacity-70">
          <h2 className="text-2xl font-extrabold text-azul-fondo mb-2 font-serif text-center">
              No encontramos esa especie
          </h2>
          <p className="text-lg text-azul-fondo text-center">
              No tenemos mascotas registradas como "{terminoBusqueda}" en este momento.
          </p>
        </div>
      </section>
    );
  }

  const mascotasAMostrar = verTodos ? mascotasFiltradas : mascotasFiltradas.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 place-items-center py-6">
      {mascotasAMostrar.map((m) => (
        <TarjetaMascota
          key={m.id}
          id={m.id} 
          nombre={m.nombre}
          especie={m.especie_nombre}
          genero={m.sexo}
          ubicacion={m.ubicacion_abreviatura}
          edad={m.edad_formateada}
          descripcion={m.descripcion}
          imagen={m.imagen}
        />
      ))}
    </div>
  );
}
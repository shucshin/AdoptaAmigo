/**
 * @fileoverview Componente Boton (Button).
 * @version 1.0.1
 * @author Equipo Slytherin
 */

/**
 * Componente funcional Boton.
 *
 * Un botón reutilizable.
 */
export default function Boton ({
    texto,
    onClick,
    color = "bg-durazno hover:bg-durazno/90 text-azul-fondo",
    customClasses = ""
}) {
    return (
        <button
            onClick={onClick}
            className={`${color} ${customClasses} 
                        px-4 py-2 rounded-xl font-semibold text-lg
                        shadow-md hover:shadow-lg hover:scale-[1.02] 
                        transform transition-all duration-300 ease-in-out`}
        >
            {texto}
        </button>
    );
}
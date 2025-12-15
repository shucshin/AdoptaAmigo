import React from "react";

const FeedbackModal = ({
  isOpen,
  title,
  message,
  icon,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  showCancel = false,
  showButtons = true,
  centerContent = false,
  showCloseIcon = false,
  iconPosition = "above",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const titleAlign = centerContent ? "text-center" : "";
  const textAlign = centerContent ? "text-center" : "";
  const buttonsAlign = centerContent ? "justify-center" : "justify-end";

  const handleCloseIcon = () => {
    if (onCancel) onCancel();
    else if (onConfirm) onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-blanco p-6 rounded-lg shadow-xl w-full max-w-sm relative">
        {showCloseIcon && (
          <button
            type="button"
            onClick={handleCloseIcon}
            className="absolute top-3 right-3 text-azul-fondo/70 hover:text-azul-fondo"
          >
            &#10005;
          </button>
        )}

        {/* ICONO ARRIBA */}
        {icon && iconPosition === "above" && (
          <div className={`flex mb-2 text-4xl ${centerContent ? "justify-center" : ""}`}>
            {icon}
          </div>
        )}

        {/* TÍTULO */}
        <h3 className={`text-lg text-azul-fondo mb-2 font-medium ${titleAlign}`}>
          {title}
        </h3>

        {/* TEXTO */}
        {message && (
          <p className={`text-azul-fondo/80 mb-6 text-sm font-normal leading-relaxed ${textAlign}`}>
            {message}
          </p>
        )}

        {/* ICONO ABAJO */}
        {icon && iconPosition === "below" && (
          <div className={`flex mt-4 text-4xl ${centerContent ? "justify-center" : ""}`}>
            {icon}
          </div>
        )}

        {/* BOTONES */}
        {showButtons && (
          <div className={`flex ${buttonsAlign} gap-4 mt-6`}>
            {showCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-verde-grisaseo text-azul-fondo rounded-lg hover:bg-verde-grisaseo/50 transition text-sm font-normal"
              >
                {cancelText}
              </button>
            )}

            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-durazno text-azul-fondo rounded-lg hover:bg-durazno/80 transition text-sm font-normal"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;

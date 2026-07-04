import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children, subtitle, icon, badge }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          w-full
          max-w-5xl
          max-h-[90vh]
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
          border
          border-slate-200/60
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 border-b border-slate-100 px-8 py-6 bg-white">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {icon && (
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {title}
                  </h2>
                  {badge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                      {badge}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-sm text-slate-500">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition-all
                duration-200
                hover:bg-slate-100
                hover:text-slate-600
                flex-shrink-0
                ml-4
              "
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-0 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
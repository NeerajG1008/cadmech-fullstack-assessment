function ConfirmDialog({
    isOpen,
    title,
    message,
    onCancel,
    onConfirm,
  }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
  
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {title}
            </h2>
          </div>
  
          <div className="px-6 py-5">
            <p className="text-slate-600">
              {message}
            </p>
          </div>
  
          <div className="flex justify-end gap-3 border-t px-6 py-4">
  
            <button
              onClick={onCancel}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
  
            <button
              onClick={onConfirm}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
  
          </div>
  
        </div>
      </div>
    );
  }
  
  export default ConfirmDialog;
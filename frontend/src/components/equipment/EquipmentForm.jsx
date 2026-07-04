import { useEffect, useState } from "react";
import { Package, MapPin, Calendar, Hash, Save, Loader2, AlertCircle } from "lucide-react";
import { EQUIPMENT_STATUS, EQUIPMENT_TYPES } from "../../utils/constants";
import toast from 'react-hot-toast';

function EquipmentForm({ equipment, onSubmit, onClose }) {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "Active",
    location: "",
    serial_number: "",
    description: "",
    installed_date: "",
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name || "",
        type: equipment.type || "",
        status: equipment.status || "Active",
        location: equipment.location || "",
        serial_number: equipment.serial_number || "",
        description: equipment.description || "",
        installed_date: equipment.installed_date?.split("T")[0] || "",
      });
    } else {
      setFormData({
        name: "",
        type: "",
        status: "Active",
        location: "",
        serial_number: "",
        description: "",
        installed_date: "",
      });
    }
    setErrors({});
  }, [equipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Equipment name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Equipment name must be at least 3 characters";
    }

    // Type validation
    if (!formData.type || formData.type === "") {
      newErrors.type = "Equipment type is required";
    }

    // Status validation
    if (!formData.status || formData.status === "") {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      await onSubmit(formData);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4";

  const inputWithIconClass = "w-full rounded-xl border bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4";

  const getInputClasses = (fieldName, hasIcon = false) => {
    const baseClass = hasIcon ? inputWithIconClass : inputClass;
    if (errors[fieldName]) {
      return `${baseClass} border-red-300 focus:border-red-400 focus:ring-red-100/50`;
    }
    return `${baseClass} border-slate-200 focus:border-blue-400 focus:ring-blue-100/50 hover:border-slate-300`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Section 1: Basic Information */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Basic Information</h3>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Equipment Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Equipment Name
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                Required
              </span>
            </label>
            <p className="text-xs text-slate-500 mb-2">Visible to all operators</p>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="name"
                placeholder="e.g., CNC Lathe V2"
                value={formData.name}
                onChange={handleChange}
                className={getInputClasses('name', true)}
              />
              {errors.name && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Equipment Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Equipment Type
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                Required
              </span>
            </label>
            <p className="text-xs text-slate-500 mb-2">Used for filtering and categorization</p>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={getInputClasses('type', true)}
              >
                <option value="">Select Equipment Type</option>
                {EQUIPMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.type}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Section 2: Operational Details */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Operational Details</h3>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                Required
              </span>
            </label>
            <p className="text-xs text-slate-500 mb-2">Current operational status</p>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={getInputClasses('status', false)}
            >
              {EQUIPMENT_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.status}</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>
            <p className="text-xs text-slate-500 mb-2">Building and lab location</p>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="location"
                placeholder="Lab 3 • Building A"
                value={formData.location}
                onChange={handleChange}
                className={getInputClasses('location', true)}
              />
            </div>
          </div>

          {/* Installed Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Installed Date
            </label>
            <p className="text-xs text-slate-500 mb-2">When equipment was installed</p>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                name="installed_date"
                value={formData.installed_date}
                onChange={handleChange}
                className={getInputClasses('installed_date', true)}
              />
            </div>
          </div>

          {/* Serial Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Serial Number
            </label>
            <p className="text-xs text-slate-500 mb-2">Unique equipment identifier</p>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="serial_number"
                placeholder="SN-2026-001"
                value={formData.serial_number}
                onChange={handleChange}
                className={getInputClasses('serial_number', true)}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Section 3: Additional Information */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Additional Information</h3>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>
          <p className="text-xs text-slate-500 mb-2">Optional notes about this equipment</p>
          <textarea
            rows={3}
            name="description"
            placeholder="Add maintenance notes or additional information..."
            value={formData.description}
            onChange={handleChange}
            className={`${getInputClasses('description', false)} resize-y min-h-[80px]`}
          />
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 -mx-8 mt-8 border-t border-slate-100 bg-white px-8 py-5">
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition-all
              duration-200
              hover:bg-slate-50
              hover:border-slate-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-blue-700
              hover:shadow-lg
              hover:shadow-blue-600/20
              active:scale-[0.98]
              disabled:opacity-60
              disabled:cursor-not-allowed
              disabled:hover:shadow-none
            "
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {equipment ? "Save Changes" : "Save Equipment"}
              </>
            )}
          </button>
        </div>
      </div>

    </form>
  );
}

export default EquipmentForm;
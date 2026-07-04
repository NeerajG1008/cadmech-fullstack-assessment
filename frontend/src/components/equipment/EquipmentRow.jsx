import { Pencil, Trash2, MapPin, Cpu, Factory, Radar, Cable, Wrench, Zap, CircuitBoard, Microscope } from "lucide-react";

function EquipmentRow({ equipment, onEdit, onDelete, mobile }) {
    
    const getEquipmentIcon = (type) => {
      const iconMap = {
        'CNC Machine': Factory,
        'PLC Module': Cpu,
        '3D Printer': CircuitBoard,
        'Testing Equipment': Radar,
        'Sensor': Zap,
        'Cable Assembly': Cable,
        'Hand Tool': Wrench,
        'Microscope': Microscope,
      };
      const IconComponent = iconMap[type] || CircuitBoard;
      return <IconComponent className="w-4 h-4 text-slate-600" />;
    };

    const getStatusStyles = (status) => {
      switch (status) {
        case "Active":
          return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
        case "Under Maintenance":
          return "bg-amber-50 text-amber-700 border-amber-200/50";
        case "Decommissioned":
          return "bg-rose-50 text-rose-700 border-rose-200/50";
        default:
          return "bg-slate-50 text-slate-700 border-slate-200";
      }
    };

    const getStatusDotColor = (status) => {
      switch (status) {
        case "Active":
          return "bg-emerald-500";
        case "Under Maintenance":
          return "bg-amber-500";
        case "Decommissioned":
          return "bg-rose-500";
        default:
          return "bg-slate-400";
      }
    };

    // Mobile Card View
    if (mobile) {
      return (
        <div className="p-5 bg-white border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
          
          {/* Header: Icon + Name + Serial */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              {getEquipmentIcon(equipment.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900 text-base truncate">
                {equipment.name}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {equipment.serialNumber || `SN-${equipment.id}`}
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
              {equipment.type}
            </span>
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${getStatusStyles(equipment.status)}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(equipment.status)}`}></span>
              {equipment.status}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-5 pb-5 border-b border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{equipment.location}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(equipment)}
              className="flex-1 h-9 rounded-lg border border-slate-200 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
              aria-label="Edit equipment"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
            
            <button
              onClick={() => onDelete(equipment)}
              className="flex-1 h-9 rounded-lg border border-slate-200 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all"
              aria-label="Delete equipment"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>

        </div>
      );
    }

    // Desktop Table Row
    return (
      <tr className="group transition-all duration-200 hover:bg-slate-50/50 hover:shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
  
        <td className="px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
              {getEquipmentIcon(equipment.type)}
            </div>
            <div>
              <div className="font-medium text-slate-900 text-sm">{equipment.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{equipment.serialNumber || `SN-${equipment.id}`}</div>
            </div>
          </div>
        </td>
  
        <td className="px-4 py-3.5">
          <span className="text-sm text-slate-700">{equipment.type}</span>
        </td>
  
        <td className="px-4 py-3.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusStyles(equipment.status)}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(equipment.status)}`}></span>
            {equipment.status}
          </span>
        </td>
  
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{equipment.location}</span>
          </div>
        </td>
  
        <td className="px-6 py-3.5">
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => onEdit(equipment)}
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              aria-label="Edit equipment"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
  
            <button
              onClick={() => onDelete(equipment)}
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              aria-label="Delete equipment"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
  
      </tr>
    );
  }
  
  export default EquipmentRow;
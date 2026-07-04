import { useRef, useEffect } from "react";
import EquipmentRow from "./EquipmentRow";
import { Package, Search, CircleDot, RotateCcw, Plus, ChevronDown, Loader2 } from "lucide-react";
import { EQUIPMENT_STATUS, EQUIPMENT_TYPES } from "../../utils/constants";

function EquipmentTable({
  equipment,
  onEdit,
  onDelete,
  filters,
  onFilterChange,
  onReset,
  onAddEquipment,
  isLoading = false,
}) {

  const searchInputRef = useRef(null);

  // Auto-focus search input when component mounts or when equipment updates
  useEffect(() => {
    if (filters.search && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [equipment]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Header with Search & Filters */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Equipment Inventory</h2>
              {isLoading && (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">Search, filter and manage laboratory equipment</p>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-100">
            {equipment.length} {equipment.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              name="search"
              value={filters.search}
              onChange={onFilterChange}
              placeholder="Search equipment..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="relative w-full md:w-44">
            <Package size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              name="type"
              value={filters.type}
              onChange={onFilterChange}
              className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="">All Types</option>
              {EQUIPMENT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative w-full md:w-44">
            <CircleDot size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              name="status"
              value={filters.status}
              onChange={onFilterChange}
              className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="">All Status</option>
              {EQUIPMENT_STATUS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={onAddEquipment}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-sm active:scale-[0.98]"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">Add Equipment</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {equipment.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
            <Package className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1.5">No equipment found</h3>
          <p className="text-sm text-slate-500 text-center max-w-sm mb-5">
            {filters.search || filters.type || filters.status 
              ? "Try adjusting your filters or search terms"
              : "Get started by adding your first piece of equipment"}
          </p>
          {!filters.search && !filters.type && !filters.status && (
            <button
              onClick={onAddEquipment}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-sm"
            >
              <Plus size={15} />
              Add Equipment
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm text-slate-600 font-medium">Loading...</span>
                </div>
              </div>
            )}
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-slate-600">Equipment</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-600">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-600">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-600">Location</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {equipment.map((item) => (
                  <EquipmentRow
                    key={item.id}
                    equipment={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm text-slate-600 font-medium">Loading...</span>
                </div>
              </div>
            )}
            {equipment.map((item) => (
              <EquipmentRow
                key={item.id}
                equipment={item}
                onEdit={onEdit}
                onDelete={onDelete}
                mobile
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default EquipmentTable;
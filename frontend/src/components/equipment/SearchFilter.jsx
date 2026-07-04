import {
  Search,
  Package,
  CircleDot,
  RotateCcw,
  Plus,
  ChevronDown,
} from "lucide-react";

import {
  EQUIPMENT_STATUS,
  EQUIPMENT_TYPES,
} from "../../utils/constants";

function SearchFilter({
  filters,
  onFilterChange,
  onReset,
  onAddEquipment,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      {/* Heading */}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Equipment Inventory
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Search, filter and manage laboratory equipment.
          </p>
        </div>
      </div>

      {/* Toolbar */}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

        {/* Search */}

        <div className="relative flex-1 min-w-0">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onFilterChange}
            placeholder="Search equipment..."
            className="
              h-10
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50/80
              pl-11
              pr-4
              text-sm
              transition-all
              placeholder:text-slate-400
              focus:border-blue-500
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
              outline-none
            "
          />
        </div>

        {/* Type */}

        <div className="relative w-full lg:w-48">

          <Package
            size={16}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
            "
          />

          <ChevronDown
            size={16}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
            "
          />

          <select
            name="type"
            value={filters.type}
            onChange={onFilterChange}
            className="
              h-10
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50/80
              pl-11
              pr-10
              text-sm
              transition-all
              focus:border-blue-500
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
              outline-none
            "
          >
            <option value="">All Types</option>

            {EQUIPMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

        </div>

        {/* Status */}

        <div className="relative w-full lg:w-48">

          <CircleDot
            size={16}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
            "
          />

          <ChevronDown
            size={16}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
            "
          />

          <select
            name="status"
            value={filters.status}
            onChange={onFilterChange}
            className="
              h-10
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-slate-50/80
              pl-11
              pr-10
              text-sm
              transition-all
              focus:border-blue-500
              focus:bg-white
              focus:ring-2
              focus:ring-blue-100
              outline-none
            "
          >
            <option value="">All Status</option>

            {EQUIPMENT_STATUS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

        </div>

        {/* Actions */}

        <div className="flex gap-2">

          <button
            onClick={onReset}
            className="
              flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
              hover:border-slate-300
            "
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            onClick={onAddEquipment}
            className="
              flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              text-sm
              font-semibold
              text-white
              transition-all
              hover:bg-blue-700
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            <Plus size={16} />

            <span className="hidden sm:inline">
              Add Equipment
            </span>

            <span className="sm:hidden">
              Add
            </span>

          </button>

        </div>

      </div>

    </section>
  );
}

export default SearchFilter;
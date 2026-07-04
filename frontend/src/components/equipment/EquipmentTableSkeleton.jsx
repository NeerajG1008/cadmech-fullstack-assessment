import Skeleton from "../common/Skeleton";

function EquipmentTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Header Skeleton */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <div className="flex-1">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-7 w-20" variant="button" />
        </div>

        {/* Search & Filter Toolbar Skeleton */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Skeleton className="h-9 flex-1" variant="button" />
          <Skeleton className="h-9 w-full md:w-44" variant="button" />
          <Skeleton className="h-9 w-full md:w-44" variant="button" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" variant="button" />
            <Skeleton className="h-9 w-32" variant="button" />
          </div>
        </div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="text-left px-6 py-3">
                <Skeleton className="h-3 w-20" />
              </th>
              <th className="text-left px-4 py-3">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="text-left px-4 py-3">
                <Skeleton className="h-3 w-12" />
              </th>
              <th className="text-left px-4 py-3">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="text-right px-6 py-3">
                <Skeleton className="h-3 w-14" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-9 h-9 flex-shrink-0" variant="default" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1.5" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3.5">
                  <Skeleton className="h-6 w-20" variant="button" />
                </td>
                <td className="px-4 py-3.5">
                  <Skeleton className="h-4 w-28" />
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <Skeleton className="w-9 h-9" variant="default" />
                    <Skeleton className="w-9 h-9" variant="default" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="md:hidden divide-y divide-slate-100">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <Skeleton className="w-10 h-10" variant="default" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-6 w-24 mb-3" variant="button" />
            <Skeleton className="h-6 w-20 mb-4" variant="button" />
            <Skeleton className="h-4 w-40 mb-5" />
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1" variant="button" />
              <Skeleton className="h-9 flex-1" variant="button" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default EquipmentTableSkeleton;

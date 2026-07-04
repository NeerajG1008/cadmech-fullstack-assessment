import Skeleton from "../common/Skeleton";

function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="w-10 h-10" variant="default" />
          </div>
          <Skeleton className="h-8 w-16 mb-2" variant="title" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export default DashboardCardsSkeleton;

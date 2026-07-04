function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-5
        py-4
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-600
            transition
            group-hover:bg-blue-50
            group-hover:text-blue-600
          "
        >
          <Icon
            size={20}
            strokeWidth={2}
          />
        </div>

      </div>
    </div>
  );
}

export default StatCard;
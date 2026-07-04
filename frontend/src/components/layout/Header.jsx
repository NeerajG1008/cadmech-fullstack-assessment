import { Building2, ShieldCheck } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            text-white
            shadow-md
            shadow-blue-500/20
          "
        >
          <Building2 size={24} strokeWidth={2.2} />
        </div>

        {/* Title */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              SmartLab Equipment Manager
            </h1>

          

          </div>

          <p className="mt-1 text-sm text-slate-500">
            CADMech Engineering Pvt. Ltd.
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="block sm:inline">
              Equipment Management Dashboard
            </span>
          </p>

        </div>

      </div>
    </header>
  );
}

export default Header;
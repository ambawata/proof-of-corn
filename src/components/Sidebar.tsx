import Link from 'next/link';
import { Home, Layers, Filter, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex-col hidden md:flex flex-shrink-0">
      <div className="p-4 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
          J
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Jira Clone</h2>
          <p className="text-xs text-gray-500">Software project</p>
        </div>
      </div>

      <div className="px-4 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase">
        Navigation
      </div>

      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        <Link href="#" className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
          <Home size={18} />
          Your work
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <Layers size={18} />
          Projects
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <Filter size={18} />
          Filters
        </Link>
        <Link href="#" className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <LayoutDashboard size={18} />
          Dashboards
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">You&apos;re in a team-managed project</p>
      </div>
    </aside>
  );
}
import { Search, Bell, HelpCircle, Settings, Grid, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 border-b border-gray-200 flex items-center justify-between px-2 sm:px-4 bg-white flex-shrink-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded md:hidden">
          <Menu size={20} />
        </button>
        <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded hidden sm:block md:hidden">
          <Grid size={20} />
        </button>
        <div className="font-semibold text-lg text-gray-800 tracking-tight flex items-center gap-2">
          <span className="text-blue-600 bg-blue-100 p-1 rounded-sm shadow-sm inline-block leading-none">
            &#9650;
          </span>
          <span className="hidden sm:inline-block">Jira</span>
        </div>
        <nav className="hidden lg:flex space-x-1 ml-4 text-sm font-medium text-gray-600">
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Your work</button>
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Projects</button>
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Filters</button>
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Dashboards</button>
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Teams</button>
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded">Apps</button>
          <button className="ml-2 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors shadow-sm">Create</button>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full md:w-64 pl-10 pr-3 py-1.5 border border-gray-300 rounded-md text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          <button className="p-1.5 hover:bg-gray-100 rounded-full md:hidden">
            <Search size={20} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full hidden sm:block">
            <Bell size={20} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full hidden sm:block">
            <HelpCircle size={20} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full hidden sm:block">
            <Settings size={20} />
          </button>
        </div>

        <div className="w-8 h-8 bg-purple-600 rounded-full text-white flex items-center justify-center text-sm font-medium cursor-pointer ring-2 ring-transparent hover:ring-gray-300 flex-shrink-0">
          A
        </div>
      </div>
    </header>
  );
}
import {
  HomeIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Aside = () => {
  const { role } = useContext(AuthContext)
  const navClass = ({ isActive }) =>
    `group relative flex items-center gap-3 px-4 py-2.5 rounded-md transition-all
     ${isActive
      ? "bg-red-600 text-white shadow"
      : "text-red-100 hover:bg-red-700/60"
    }`;
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-red-700 via-red-800 to-red-900 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-red-600">
        <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
          🩸 <span>Blood Admin</span>
        </h1>
        <p className="text-xs text-red-200 mt-1">Management Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-2 text-xs uppercase tracking-wider text-red-300">
          Menu
        </p>

        <NavLink to="/dashboard/main" className={navClass}>
          <HomeIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/add-request" className={navClass}>
          <ClipboardDocumentListIcon className="h-5 w-5" />
          <span>Add Request</span>
        </NavLink>
        <NavLink to="/dashboard/my-request" className={navClass}>
          <ClipboardDocumentListIcon className="h-5 w-5" />
          <span>My Request</span>
        </NavLink>

        <NavLink to="/dashboard/mange-product" className={navClass}>
          <ClipboardDocumentListIcon className="h-5 w-5" />
          <span>Manage Product</span>
        </NavLink>

        { role=='admin'&&
          <NavLink to="/dashboard/all-users" className={navClass}>
            <UsersIcon className="h-5 w-5" />
            <span>All Users</span>
          </NavLink>
        }

        <NavLink to="/users" className={navClass}>
          <UsersIcon className="h-5 w-5" />
          <span>Users</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-red-600">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-md
                     text-white bg-red-600 hover:bg-red-500 transition"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </aside>
  );
};

export default Aside;

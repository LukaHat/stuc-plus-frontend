import { Link } from "react-router";
import {
  HomeIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserCircleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useUIStore from "../../../stores/uiStore";

export default function MobileNav() {
  const { mobileMenuOpen, closeMobileMenu } = useUIStore();
  if (!mobileMenuOpen) return null;
  return (
    <div className="md:hidden fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/30" onClick={closeMobileMenu} />
      <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-4 flex flex-col gap-4">
        <button className="self-end p-1 rounded-md" onClick={closeMobileMenu}>
          <XMarkIcon className="w-6 h-6" />
        </button>
        <nav className="flex flex-col gap-2 mt-2">
          <Link
            to="/dashboard"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 no-underline"
          >
            <HomeIcon className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/jobs"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 no-underline"
          >
            <BriefcaseIcon className="w-5 h-5" />
            Jobs
          </Link>
          <Link
            to="/goals"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 no-underline"
          >
            <ChartBarIcon className="w-5 h-5" />
            Goals
          </Link>
          <Link
            to="/profile"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 no-underline"
          >
            <UserCircleIcon className="w-5 h-5" />
            Profile
          </Link>
          <Link
            to="/jobs/new"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 no-underline"
          >
            <PlusIcon className="w-5 h-5" />
            Add Job
          </Link>
        </nav>
      </div>
    </div>
  );
}

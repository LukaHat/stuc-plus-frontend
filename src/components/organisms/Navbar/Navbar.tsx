import {
  HomeIcon,
  BriefcaseIcon,
  ChartBarIcon,
  PlusIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import Button from "../../atoms/Button/Button";
import NavBrand from "../../molecules/NavBrand/NavBrand";
import NavLinkItem from "../../molecules/NavLinkItem/NavLinkItem";
import MobileNav from "../../molecules/MobileNav/MobileNav";
import useScrollPosition from "../../../hooks/useScrollPosition";
import useUIStore from "../../../stores/uiStore";

export default function Navbar() {
  const isScrolled = useScrollPosition();
  const { toggleMobileMenu } = useUIStore();
  return (
    <>
      <header
        className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-200 ${
          isScrolled ? "shadow-md" : "border-b border-gray-200"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-content mx-auto h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <NavBrand />
              <nav className="hidden md:flex items-center gap-6">
                <NavLinkItem
                  to="/dashboard"
                  icon={<HomeIcon className="w-[20px] h-[20px]" />}
                  label="Dashboard"
                />
                <NavLinkItem
                  to="/jobs"
                  icon={<BriefcaseIcon className="w-[20px] h-[20px]" />}
                  label="Jobs"
                />
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="p-2 rounded-md">
                  <Bars3Icon className="w-6 h-6" />
                </button>
              </div>
              <Link to="/jobs/new" className="no-underline">
                <Button
                  variant="primary"
                  size="sm"
                  className="hidden sm:inline-flex text-black hover:cursor-pointer"
                >
                  <PlusIcon className="w-[20px] h-[20px] mr-2" />
                  Add Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <MobileNav />
    </>
  );
}

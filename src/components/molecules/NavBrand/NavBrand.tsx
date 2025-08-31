import { Link } from "react-router";

export default function NavBrand() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-xl font-bold text-primary-600 no-underline hover:text-primary-700 transition-colors"
    >
      <span className="hidden sm:block">Stuc+</span>
    </Link>
  );
}

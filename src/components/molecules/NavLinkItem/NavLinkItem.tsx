import { Link, useLocation } from "react-router";

type Props = {
  to: string;
  icon?: React.ReactNode;
  label?: string;
  compact?: boolean;
};
export default function NavLinkItem({ to, icon, label, compact }: Props) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
        active
          ? "text-primary-600 bg-primary-50"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      {label && !compact ? (
        <span className="hidden sm:block">{label}</span>
      ) : null}
    </Link>
  );
}

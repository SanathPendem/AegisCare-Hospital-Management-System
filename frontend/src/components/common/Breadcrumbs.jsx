import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-2 px-10 pt-6">
      <Link to="/" className="hover:text-sky-700 flex items-center transition">
        <Home size={14} className="mr-1" />
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = value.replace(/-/g, ' ').toUpperCase();

        return (
          <React.Fragment key={to}>
            <ChevronRight size={12} className="text-slate-300 shrink-0" />
            {isLast ? (
              <span className="text-sky-900 font-bold tracking-wide">{formattedName}</span>
            ) : (
              <Link to={to} className="hover:text-sky-700 transition">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const enlaces = [
  { to: '/', label: 'Inicio', icono: '🏠' },
  { to: '/inscribirme', label: 'Inscribirme', icono: '🎓' },
  { to: '/kardex', label: 'Mi Kardex', icono: '📋' },
  { to: '/docentes', label: 'Mis Docentes', icono: '👤' },
  { to: '/horarios', label: 'Horarios', icono: '🗓️' },
  { to: '/perfil', label: 'Perfil', icono: '👤' },
];

export default function Layout({ children }) {
  const { estudiante, logout } = useAuth();
  const navigate = useNavigate();

  function cerrarSesion() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-umss-navy text-white flex flex-col shrink-0">
        <div className="px-5 py-6 text-xl font-bold tracking-wide border-b border-white/10">
          UMSS
        </div>
        <nav className="flex-1 py-4">
          {enlaces.map((e) => (
            <NavLink
              key={e.to}
              to={e.to}
              end={e.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 border-l-4 border-umss-red text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span>{e.icono}</span>
              {e.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={cerrarSesion}
          className="flex items-center gap-3 px-5 py-4 text-sm font-medium text-red-300 hover:bg-white/5 border-t border-white/10"
        >
          🚪 Cerrar Sesión
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-umss-navy">Sistema de Inscripciones</h1>
          {estudiante && (
            <div className="text-sm text-gray-600">
              {estudiante.nombres} {estudiante.apellidos} · <span className="text-gray-400">{estudiante.cod_sis}</span>
            </div>
          )}
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

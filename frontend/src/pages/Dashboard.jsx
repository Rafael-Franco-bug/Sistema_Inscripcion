import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { estudiante } = useAuth();

  return (
    <div>
      <h2 className="text-xl font-semibold text-umss-navy mb-1">
        ¿Qué deseas hacer hoy, {estudiante?.nombres}?
      </h2>
      <p className="text-gray-500 mb-8">Selecciona una opción para continuar.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <TarjetaAccion
          to="/inscribirme"
          icono="🎓"
          titulo="Inscribirme"
          descripcion="Inscribirme a materias del periodo vigente"
        />
        <TarjetaAccion
          to="/kardex"
          icono="📋"
          titulo="Mi Kardex"
          descripcion="Ver mi rendimiento académico"
        />
        <TarjetaAccion
          to="/horarios"
          icono="🗓️"
          titulo="Horarios"
          descripcion="Ver mi horario semanal de clases"
        />
        <TarjetaAccion
          to="/docentes"
          icono="👤"
          titulo="Mis Docentes"
          descripcion="Ver los docentes de mis materias"
        />
        <TarjetaAccion
          to="/perfil"
          icono="🪪"
          titulo="Perfil"
          descripcion="Ver y editar mis datos personales"
        />
      </div>
    </div>
  );
}

function TarjetaAccion({ to, icono, titulo, descripcion }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-umss-navy/30 transition-all flex items-start gap-4"
    >
      <div className="text-3xl">{icono}</div>
      <div>
        <div className="font-semibold text-gray-800">{titulo}</div>
        <div className="text-sm text-gray-500">{descripcion}</div>
      </div>
    </Link>
  );
}

import { useEffect, useState } from 'react';
import api from '../api/client';

export default function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get('/docentes/mis-docentes')
      .then(({ data }) => setDocentes(data))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-umss-navy mb-1">Mis Docentes</h2>
      <p className="text-gray-500 mb-6">Docentes a cargo de las materias en las que estás inscrito.</p>

      {cargando ? (
        <p className="text-gray-500">Cargando...</p>
      ) : docentes.length === 0 ? (
        <p className="text-gray-400">Aún no tienes docentes asignados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docentes.map((d, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="w-10 h-10 rounded-full bg-umss-navy text-white flex items-center justify-center font-semibold mb-3">
                {d.nombre_docente[0]}
                {d.apellido_docente[0]}
              </div>
              <div className="font-medium text-gray-800">
                {d.nombre_docente} {d.apellido_docente}
              </div>
              <div className="text-sm text-gray-500">{d.nombre_materia}</div>
              <div className="text-xs text-gray-400 mt-2">{d.correo}</div>
              {d.telefono && <div className="text-xs text-gray-400">{d.telefono}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

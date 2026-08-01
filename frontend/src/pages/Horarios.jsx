import { useEffect, useState } from 'react';
import api from '../api/client';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default function Horarios() {
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get('/horarios/mio')
      .then(({ data }) => setClases(data))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-umss-navy mb-1">Mis Horarios</h2>
      <p className="text-gray-500 mb-6">Horario semanal de las materias en las que estás inscrito.</p>

      {cargando ? (
        <p className="text-gray-500">Cargando...</p>
      ) : clases.length === 0 ? (
        <p className="text-gray-400">No tienes materias inscritas en el periodo vigente.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIAS.map((dia) => {
            const clasesDelDia = clases
              .filter((c) => c.dia === dia)
              .sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio));
            if (clasesDelDia.length === 0) return null;
            return (
              <div key={dia} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-umss-navy text-white px-4 py-2 font-semibold">{dia}</div>
                <div className="divide-y divide-gray-100">
                  {clasesDelDia.map((c, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="font-medium text-gray-800">{c.nombre_materia}</div>
                      <div className="text-sm text-gray-500">
                        {c.hora_inicio.slice(0, 5)} – {c.hora_fin.slice(0, 5)} · {c.codigo_grupo}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {c.edificio} {c.num_aula} · {c.nombre_docente} {c.apellido_docente}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

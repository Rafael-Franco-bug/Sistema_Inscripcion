import { useEffect, useState } from 'react';
import api from '../api/client';

export default function Kardex() {
  const [historial, setHistorial] = useState([]);
  const [resumen, setResumen] = useState({ totalCreditosAprobados: 0, promedio: null });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/kardex')
      .then(({ data }) => {
        setHistorial(data.historial);
        setResumen(data.resumen);
      })
      .catch(() => setError('No se pudo cargar el kardex.'))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-umss-navy mb-1">Mi Kardex</h2>
      <p className="text-gray-500 mb-6">Historial académico completo.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Metrica label="Materias cursadas" valor={historial.length} />
        <Metrica label="Créditos aprobados" valor={resumen.totalCreditosAprobados} />
        <Metrica label="Promedio general" valor={resumen.promedio ?? '—'} />
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {cargando ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-umss-navy text-white">
              <tr>
                <Th>Gestión</Th>
                <Th>Periodo</Th>
                <Th>Materia</Th>
                <Th>Grupo</Th>
                <Th>Créditos</Th>
                <Th>Nota</Th>
                <Th>Estado</Th>
              </tr>
            </thead>
            <tbody>
              {historial.map((h, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <Td>{h.gestion}</Td>
                  <Td>{h.nombre_periodo}</Td>
                  <Td>{h.nombre_materia}</Td>
                  <Td>{h.codigo_grupo}</Td>
                  <Td>{h.creditos}</Td>
                  <Td>{h.nota_final ?? '—'}</Td>
                  <Td>
                    <Estado valor={h.estado} />
                  </Td>
                </tr>
              ))}
              {historial.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-8">
                    Aún no tienes materias en tu historial.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Metrica({ label, valor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
      <div className="text-2xl font-bold text-umss-navy">{valor}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function Th({ children }) {
  return <th className="text-left px-4 py-3 font-medium">{children}</th>;
}
function Td({ children }) {
  return <td className="px-4 py-3">{children}</td>;
}

function Estado({ valor }) {
  const colores = {
    Aprobado: 'bg-green-100 text-green-700',
    Reprobado: 'bg-red-100 text-red-700',
    Inscrito: 'bg-blue-100 text-blue-700',
    Abandonado: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colores[valor] || 'bg-gray-100'}`}>
      {valor}
    </span>
  );
}

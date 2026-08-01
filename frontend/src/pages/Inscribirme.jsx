import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const SEMESTRES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Inscribirme() {
  const { estudiante } = useAuth();
  const [paso, setPaso] = useState(1);

  const [idCarrera, setIdCarrera] = useState(null);
  const [nombreCarrera, setNombreCarrera] = useState('');
  const [semestre, setSemestre] = useState(null);

  const [materias, setMaterias] = useState([]);
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);

  const [gruposPorMateria, setGruposPorMateria] = useState({});
  const [grupoElegido, setGrupoElegido] = useState({}); // { id_materia: id_grupo }

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(null);

  // Cargar la carrera del estudiante autenticado
  useEffect(() => {
    api.get('/estudiantes/perfil').then(({ data }) => {
      setIdCarrera(data.id_carrera);
      setNombreCarrera(data.nombre_carrera);
    });
  }, []);

  async function verMaterias() {
    setCargando(true);
    setError('');
    try {
      const { data } = await api.get(`/carreras/${idCarrera}/materias`);
      setMaterias(data.filter((m) => m.nivel === semestre));
      setPaso(3);
    } catch {
      setError('No se pudieron cargar las materias.');
    } finally {
      setCargando(false);
    }
  }

  function toggleMateria(id) {
    setMateriasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  async function continuarASeleccionGrupo() {
    if (materiasSeleccionadas.length === 0) {
      setError('Selecciona al menos una materia.');
      return;
    }
    setError('');
    setCargando(true);
    try {
      const entradas = await Promise.all(
        materiasSeleccionadas.map(async (idMateria) => {
          const { data } = await api.get(`/materias/${idMateria}/grupos`);
          return [idMateria, data];
        })
      );
      setGruposPorMateria(Object.fromEntries(entradas));
      setPaso(4);
    } catch {
      setError('No se pudieron cargar los grupos disponibles.');
    } finally {
      setCargando(false);
    }
  }

  function elegirGrupo(idMateria, idGrupo) {
    setGrupoElegido((prev) => ({ ...prev, [idMateria]: idGrupo }));
  }

  function irAConfirmar() {
    const faltan = materiasSeleccionadas.filter((id) => !grupoElegido[id]);
    if (faltan.length > 0) {
      setError('Selecciona un grupo para cada materia antes de continuar.');
      return;
    }
    setError('');
    setPaso(5);
  }

  async function confirmarInscripcion() {
    setCargando(true);
    setError('');
    try {
      const idGrupos = Object.values(grupoElegido);
      const { data } = await api.post('/inscripciones/confirmar', { id_grupos: idGrupos });
      setResultado(data);
      setPaso(6);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo completar la inscripción.');
    } finally {
      setCargando(false);
    }
  }

  function reiniciar() {
    setPaso(1);
    setSemestre(null);
    setMaterias([]);
    setMateriasSeleccionadas([]);
    setGruposPorMateria({});
    setGrupoElegido({});
    setResultado(null);
    setError('');
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Inscripción</span>
        {paso >= 2 && <span>→ Semestre</span>}
        {paso >= 3 && <span>→ Materias</span>}
        {paso >= 4 && <span>→ Grupo</span>}
        {paso >= 5 && <span>→ Confirmar</span>}
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      {paso === 1 && (
        <PasoCard titulo="Selecciona tu carrera">
          <div className="border border-gray-200 rounded-md px-4 py-3 mb-6 flex items-center gap-2 text-gray-700">
            🎓 {nombreCarrera || 'Cargando...'}
          </div>
          <BotonContinuar disabled={!idCarrera} onClick={() => setPaso(2)} />
        </PasoCard>
      )}

      {paso === 2 && (
        <PasoCard titulo="Selecciona el Semestre">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {SEMESTRES.map((s) => (
              <label
                key={s}
                className={`flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer text-sm ${
                  semestre === s ? 'border-umss-navy bg-umss-navy/5' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="semestre"
                  checked={semestre === s}
                  onChange={() => setSemestre(s)}
                />
                {s}° Semestre
              </label>
            ))}
          </div>
          <BotonContinuar disabled={!semestre || cargando} onClick={verMaterias} texto="Ver Materias" />
        </PasoCard>
      )}

      {paso === 3 && (
        <PasoCard titulo={`Materias Disponibles – ${semestre}° Semestre`}>
          {materias.length === 0 ? (
            <p className="text-gray-400 mb-6">No hay materias registradas para este semestre.</p>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-umss-navy text-white">
                  <tr>
                    <th className="px-4 py-2 text-left w-10"></th>
                    <th className="px-4 py-2 text-left">Materia</th>
                    <th className="px-4 py-2 text-left">Créditos</th>
                  </tr>
                </thead>
                <tbody>
                  {materias.map((m) => (
                    <tr key={m.id_materia} className="border-t border-gray-100">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={materiasSeleccionadas.includes(m.id_materia)}
                          onChange={() => toggleMateria(m.id_materia)}
                        />
                      </td>
                      <td className="px-4 py-2">{m.nombre_materia}</td>
                      <td className="px-4 py-2">{m.creditos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <BotonContinuar disabled={cargando} onClick={continuarASeleccionGrupo} />
        </PasoCard>
      )}

      {paso === 4 && (
        <PasoCard titulo="Seleccionar Grupo">
          <div className="space-y-6 mb-6">
            {materiasSeleccionadas.map((idMateria) => {
              const materia = materias.find((m) => m.id_materia === idMateria);
              const grupos = gruposPorMateria[idMateria] || [];
              return (
                <div key={idMateria}>
                  <div className="font-medium text-gray-800 mb-2">{materia?.nombre_materia}</div>
                  <div className="space-y-2">
                    {grupos.map((g) => (
                      <label
                        key={g.id_grupo}
                        className={`flex flex-col border rounded-md px-4 py-2 cursor-pointer ${
                          grupoElegido[idMateria] === g.id_grupo ? 'border-umss-navy bg-umss-navy/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`grupo-${idMateria}`}
                            checked={grupoElegido[idMateria] === g.id_grupo}
                            onChange={() => elegirGrupo(idMateria, g.id_grupo)}
                          />
                          <span className="font-medium">Grupo: {g.codigo_grupo}</span>
                          <span className="text-xs text-gray-400 ml-auto">
                            {g.cupos_disponibles} cupos disponibles
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 ml-6">
                          Docente: {g.nombre_docente} {g.apellido_docente}
                        </div>
                        <div className="text-xs text-gray-500 ml-6">
                          {(g.horarios || [])
                            .filter((h) => h.dia)
                            .map((h) => `${h.dia} ${h.hora_inicio?.slice(0, 5)}-${h.hora_fin?.slice(0, 5)}`)
                            .join(' · ')}
                        </div>
                      </label>
                    ))}
                    {grupos.length === 0 && (
                      <p className="text-sm text-gray-400">No hay grupos ofertados para esta materia.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <BotonContinuar onClick={irAConfirmar} texto="Agregar Materia" />
        </PasoCard>
      )}

      {paso === 5 && (
        <PasoCard titulo="Confirmar Inscripción">
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead className="bg-umss-navy text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Materia</th>
                  <th className="px-4 py-2 text-left">Grupo</th>
                  <th className="px-4 py-2 text-left">Créditos</th>
                </tr>
              </thead>
              <tbody>
                {materiasSeleccionadas.map((idMateria) => {
                  const materia = materias.find((m) => m.id_materia === idMateria);
                  const grupo = (gruposPorMateria[idMateria] || []).find(
                    (g) => g.id_grupo === grupoElegido[idMateria]
                  );
                  return (
                    <tr key={idMateria} className="border-t border-gray-100">
                      <td className="px-4 py-2">{materia?.nombre_materia}</td>
                      <td className="px-4 py-2">{grupo?.codigo_grupo}</td>
                      <td className="px-4 py-2">{materia?.creditos}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200 font-semibold">
                  <td className="px-4 py-2" colSpan={2}>
                    Total Créditos
                  </td>
                  <td className="px-4 py-2">
                    {materiasSeleccionadas.reduce((sum, id) => {
                      const m = materias.find((mm) => mm.id_materia === id);
                      return sum + (m ? Number(m.creditos) : 0);
                    }, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPaso(4)}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
            >
              ← Volver
            </button>
            <button
              onClick={confirmarInscripcion}
              disabled={cargando}
              className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-60"
            >
              {cargando ? 'Confirmando...' : '✓ Confirmar Inscripción'}
            </button>
          </div>
        </PasoCard>
      )}

      {paso === 6 && resultado && (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">¡Inscripción Exitosa!</h2>
          <p className="text-gray-500 mb-6">{resultado.mensaje}</p>
          <button
            onClick={reiniciar}
            className="bg-umss-navy text-white px-5 py-2 rounded-md text-sm hover:bg-umss-navydark"
          >
            🏠 Volver al Inicio
          </button>
        </div>
      )}
    </div>
  );
}

function PasoCard({ titulo, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-umss-navy mb-4">{titulo}</h2>
      {children}
    </div>
  );
}

function BotonContinuar({ onClick, disabled, texto = 'Continuar' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-umss-navy text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-umss-navydark disabled:opacity-50"
    >
      {texto} →
    </button>
  );
}

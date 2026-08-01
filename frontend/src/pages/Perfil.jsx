import { useEffect, useState } from 'react';
import api from '../api/client';

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirmar, setPasswordConfirmar] = useState('');
  const [mensajePassword, setMensajePassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  function cargarPerfil() {
    api.get('/estudiantes/perfil').then(({ data }) => {
      setPerfil(data);
      setTelefono(data.telefono || '');
      setCorreo(data.correo || '');
    });
  }

  useEffect(() => {
    cargarPerfil();
  }, []);

  async function guardarCambios(e) {
    e.preventDefault();
    setMensaje('');
    setError('');
    try {
      await api.put('/estudiantes/perfil', { telefono, correo });
      setMensaje('Datos actualizados correctamente.');
      setEditando(false);
      cargarPerfil();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo actualizar el perfil.');
    }
  }

  async function cambiarPassword(e) {
    e.preventDefault();
    setMensajePassword('');
    setErrorPassword('');
    if (passwordNueva !== passwordConfirmar) {
      setErrorPassword('Las contraseñas no coinciden.');
      return;
    }
    try {
      await api.put('/estudiantes/perfil/password', { passwordNueva });
      setMensajePassword('Contraseña actualizada correctamente.');
      setPasswordNueva('');
      setPasswordConfirmar('');
    } catch (err) {
      setErrorPassword(err.response?.data?.error || 'No se pudo cambiar la contraseña.');
    }
  }

  if (!perfil) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-umss-navy mb-1">Mi Perfil</h2>
      <p className="text-gray-500 mb-6">Tus datos personales y de contacto.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-umss-navy text-white flex items-center justify-center text-xl font-semibold">
            {perfil.nombres[0]}
            {perfil.apellidos[0]}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800">
              {perfil.nombres} {perfil.apellidos}
            </div>
            <div className="text-sm text-gray-500">{perfil.nombre_carrera}</div>
          </div>
        </div>

        {mensaje && <p className="text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 text-sm mb-4">{mensaje}</p>}
        {error && <p className="text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm mb-4">{error}</p>}

        {!editando ? (
          <div className="space-y-2 text-sm">
            <Dato label="Código SIS" valor={perfil.cod_sis} />
            <Dato label="C.I." valor={perfil.ci} />
            <Dato label="Correo" valor={perfil.correo} />
            <Dato label="Teléfono" valor={perfil.telefono} />
            <button
              onClick={() => setEditando(true)}
              className="mt-4 bg-umss-navy text-white text-sm px-4 py-2 rounded-md hover:bg-umss-navydark"
            >
              ✏️ Editar Datos
            </button>
          </div>
        ) : (
          <form onSubmit={guardarCambios} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-umss-navy text-white text-sm px-4 py-2 rounded-md hover:bg-umss-navydark">
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setEditando(false)}
                className="text-sm px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Cambiar Contraseña</h3>
        {mensajePassword && (
          <p className="text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 text-sm mb-4">{mensajePassword}</p>
        )}
        {errorPassword && (
          <p className="text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm mb-4">{errorPassword}</p>
        )}
        <form onSubmit={cambiarPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={passwordNueva}
              onChange={(e) => setPasswordNueva(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={passwordConfirmar}
              onChange={(e) => setPasswordConfirmar(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <button type="submit" className="bg-umss-navy text-white text-sm px-4 py-2 rounded-md hover:bg-umss-navydark">
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

function Dato({ label, valor }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{valor}</span>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function manejarSubmit(e) {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      await login(correo, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo iniciar sesión.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-umss-navy text-white flex-col items-center justify-center px-10">
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="text-3xl font-bold">UMSS</h1>
        <p className="mt-2 text-white/70 text-center">Universidad Mayor de San Simón</p>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <form onSubmit={manejarSubmit} className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-umss-navy mb-1">Bienvenido</h2>
          <p className="text-gray-500 mb-6">Ingrese a su cuenta</p>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </div>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Institucional</label>
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tu.correo@est.umss.edu.bo"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-umss-navy"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-umss-navy"
          />

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-umss-navy text-white font-medium py-2.5 rounded-md hover:bg-umss-navydark transition-colors disabled:opacity-60"
          >
            {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>

          <p className="text-xs text-gray-400 mt-6">
            Prueba con: rafael.franco@est.umss.edu.bo / Estudiante123!
          </p>
        </form>
      </div>
    </div>
  );
}

import { createContext, useContext, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [estudiante, setEstudiante] = useState(() => {
    const guardado = localStorage.getItem('estudiante');
    return guardado ? JSON.parse(guardado) : null;
  });

  async function login(correo, password) {
    const { data } = await api.post('/auth/login', { correo, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('estudiante', JSON.stringify(data.estudiante));
    setEstudiante(data.estudiante);
    return data.estudiante;
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('estudiante');
    setEstudiante(null);
  }

  return (
    <AuthContext.Provider value={{ estudiante, login, logout, isAuthenticated: !!estudiante }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

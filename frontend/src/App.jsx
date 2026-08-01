import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inscribirme from './pages/Inscribirme';
import Kardex from './pages/Kardex';
import Horarios from './pages/Horarios';
import Docentes from './pages/Docentes';
import Perfil from './pages/Perfil';
import RutaProtegida from './components/RutaProtegida';
import Layout from './components/Layout';

function ConLayout({ children }) {
  return (
    <RutaProtegida>
      <Layout>{children}</Layout>
    </RutaProtegida>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ConLayout><Dashboard /></ConLayout>} />
      <Route path="/inscribirme" element={<ConLayout><Inscribirme /></ConLayout>} />
      <Route path="/kardex" element={<ConLayout><Kardex /></ConLayout>} />
      <Route path="/horarios" element={<ConLayout><Horarios /></ConLayout>} />
      <Route path="/docentes" element={<ConLayout><Docentes /></ConLayout>} />
      <Route path="/perfil" element={<ConLayout><Perfil /></ConLayout>} />
    </Routes>
  );
}

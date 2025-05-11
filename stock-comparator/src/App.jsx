import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Acciones from './pages/Acciones';
import Bonos from './pages/Bonos';
import './App.css';

function App() {
  return (
    <div className="barra_superior">
      <nav>
        <Link to="/Inicio"> Inicio </Link>
        <Link to="/Acciones"> Acciones </Link>
        <Link to="/Bonos"> Bonos </Link>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Acciones" element={<Acciones />} />
          <Route path="/Bonos" element={<Bonos />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
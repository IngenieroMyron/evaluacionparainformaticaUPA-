import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const HomePage: React.FC = () => {

  useEffect(() => {
    // Mostrar el alert al cargar la página
    Swal.fire({
      title: 'Bienvenido',
      text: 'Ahorros. Prestamos. Y Más',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }, []);

  return (
    <div>
      <header style={{ color: 'white' }}>
        <h1 className="welcome-text">Bienvenido a Cooperativa UPA.</h1>
      </header>

      <nav className="navbar">
        <div className="navbar-menu">
          <h3>
            <Link to="/form" className="navbar-link" style={{ color: 'white' }}>
              Formularios
            </Link>
            <Link to="/reports" className="navbar-link" style={{ color: 'white' }}>
              Reportes
            </Link>
          </h3>
        </div>
      </nav>

      <div className="Contenedor-Imagen">
        <img src="../public/images/Logotipo.png" alt="Imagen responsiva" />
      </div>
    </div>
  );
};

export default HomePage;

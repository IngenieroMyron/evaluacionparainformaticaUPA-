import React, { useState, useEffect } from 'react';

const Table = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:3000/ejecutar_reporte') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false); 
      });
  }, []); 
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Fecha Creación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {}
                <td>{user.Nombre}</td>
                <td>{new Date(user.Fecha).toLocaleDateString()}</td>
                <td>{user.Telefono}</td>
                <td>{user.Correo}</td>
                <td>{new Date(user.Creacion).toLocaleDateString()}</td>
                <td>{user.Titulo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay usuarios disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  
const app = express();
const port = 3000;
const connection = require('./db'); 

app.use(cors({
  origin: 'http://localhost:5173'  
}));

app.use(bodyParser.json());

app.post('/guardar_usuario/submit', (req, res) => {
  const { Nombre, Fecha,Telefono, Correo } = req.body;

  if (!Nombre || !Fecha || !Telefono || !Correo) {
    return res.status(400).json({ success: false, message: 'Todos los campos son requeridos.' });
  }

  const query = 'INSERT INTO USUARIO (Nombre, Fecha, Telefono, Correo, Creacion, EstadoUsuarioId) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [Nombre, Fecha, Telefono, Correo, '2024-11-29', '1'], (err, results) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      return res.status(500).json({ success: false, message: 'Error al guardar los datos.' });
    }

    res.status(200).json({ success: true, message: 'Datos guardados exitosamente' });
  });
});

app.get('/ejecutar_reporte', (req, res) => {
  let query = ' SELECT T0.Id, T0.Nombre,T0.Fecha,T0.Telefono,T0.Correo,T0.Creacion,T1.Titulo FROM USUARIO T0 '+
              ' INNER JOIN EstadoUsuario T1'+
              ' ON T0.EstadoUsuarioId=T1.Id';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener los datos.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'No se encontraron resultados.' });
    }
    res.status(200).json({ success: true, data: results });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

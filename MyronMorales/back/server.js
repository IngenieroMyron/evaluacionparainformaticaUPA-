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

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

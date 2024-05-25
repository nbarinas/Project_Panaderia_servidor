const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json()); // Agregar para parsear el cuerpo de las solicitudes
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'panaderia_v1'
});

app.post('/create', (req, res) => {
    const email = req.body.email;
    const contrasena = req.body.contrasena; // Corregido el nombre de la columna
    const usuario = req.body.usuario;

    db.query('INSERT INTO users (email, contrasena, usuario) VALUES (?, ?, ?)', [email, contrasena, usuario], 
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error en el servidor al insertar los valores"); // Enviar un mensaje de error al cliente
        } else {
            res.send("Valores insertados correctamente");
        }
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

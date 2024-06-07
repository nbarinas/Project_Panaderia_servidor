<<<<<<< HEAD
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'panaderia_v1'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/create', (req, res) => {
    const { email, contrasena, usuario } = req.body;

    db.query('INSERT INTO users (email, contrasena, usuario) VALUES (?, ?, ?)', [email, contrasena, usuario], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ exito: false, error: "Error en el servidor al insertar los valores" });
        } else {
            res.status(200).json({ exito: true, mensaje: "Valores insertados correctamente" });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, contrasena } = req.body;

    db.query('SELECT * FROM users WHERE email = ? AND contrasena = ?', [email, contrasena], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ exito: false, error: "Error en el servidor" });
        } else if (results.length > 0) {
            const user = results[0];
            res.status(200).json({ exito: true, usuario: { email: user.email, usuario: user.usuario } });
        } else {
            res.status(401).json({ exito: false, error: "Credenciales incorrectas" });
        }
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
=======
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json()); // Agregar para parsear el cuerpo de las solicitudes
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "panaderia_v1",
  port: "3307"
});

app.post("/create", (req, res) => {
  const email = req.body.email;
  const contrasena = req.body.contrasena; // Corregido el nombre de la columna
  const usuario = req.body.usuario;

  db.query(
    "INSERT INTO users (email, contrasena, usuario) VALUES (?, ?, ?)",
    [email, contrasena, usuario],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error en el servidor al insertar los valores"); // Enviar un mensaje de error al cliente
      } else {
        res.send("Valores insertados correctamente");
      }
    }
  );
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
>>>>>>> 968622758cdfab37b142dad789102994818e3d40

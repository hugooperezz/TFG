const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//  Conexión MySQL
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "TheHuX076",
  database: "Guia_de_la_noche",
});

//  Verificar conexión
connection.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// Crear usuario (POST)
app.post("/api/usuarios", (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  // 🔍 Verificar si el usuario ya existe por correo
  const checkQuery = "SELECT * FROM usuarios WHERE correo = ?";
  connection.query(checkQuery, [correo], (checkErr, results) => {
    if (checkErr) {
      console.error("❌ Error al verificar usuario:", checkErr);
      return res.status(500).json({ error: "Error al verificar usuario" });
    }

    if (results.length > 0) {
      // 🛑 Usuario ya existe
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    // ✅ Insertar nuevo usuario
    const insertQuery =
      "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)";
    connection.query(insertQuery, [nombre, correo, password], (err, result) => {
      if (err) {
        console.error("❌ Error al insertar usuario:", err);
        return res.status(500).json({ error: "Error al insertar usuario" });
      }

      res.status(201).json({ mensaje: "Usuario creado", id: result.insertId });
    });
  });
});

app.post("/api/usuarios", (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const query = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
  connection.query(query, [correo, password], (err, results) => {
    if (err) {
      console.error("❌ Error al buscar usuario:", err);
      return res.status(500).json({ error: "Error interno" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = results[0];
    res.status(200).json({ mensaje: "Login exitoso", usuario });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
});

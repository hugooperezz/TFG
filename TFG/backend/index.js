const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000; // Este es el puerto HTTP de tu servidor Express, NO de MySQL

app.use(cors());
app.use(bodyParser.json());

// 🔗 Conexión MySQL
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "TheHuX076", // Asegúrate de que esta contraseña sea la correcta
  database: "Guia_de_la_noche",
});

// ✅ Verificar conexión
connection.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// 📍 Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// ✅ Crear usuario (POST)
app.post("/api/usuarios", (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const query =
    "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)";
  connection.query(query, [nombre, correo, password], (err, result) => {
    if (err) {
      console.error("❌ Error al insertar usuario:", err);
      return res.status(500).json({ error: "Error al insertar usuario" });
    }

    res.status(201).json({ mensaje: "Usuario creado", id: result.insertId });
  });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
});

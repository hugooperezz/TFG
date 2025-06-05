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

/*Login */

app.post("/api/login", (req, res) => {
  const { correo, password } = req.body;

  console.log("Datos recibidos:", req.body); // ← Añade esto para depuración

  if (!correo || !password) {
    console.log("Faltan datos"); // ← Depuración
    return res.status(400).json({ error: "Faltan datos" });
  }

  const query = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
  connection.query(query, [correo, password], (err, results) => {
    if (err) {
      console.error("❌ Error al buscar usuario:", err);
      return res.status(500).json({ error: "Error interno" });
    }

    console.log("Resultados de la consulta:", results); // ← Depuración

    if (results.length === 0) {
      console.log("Credenciales incorrectas"); // ← Depuración
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = results[0];
    console.log("Usuario encontrado:", usuario); // ← Depuración
    res.status(200).json({ mensaje: "Login exitoso", usuario });
  });
});

// Obtener todos los comentarios (GET)
app.get("/api/com", (req, res) => {
  const query =
    "SELECT id, texto, usuario, fecha FROM comentarios ORDER BY fecha DESC";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener comentarios:", err);
      return res.status(500).json({ error: "Error al obtener comentarios" });
    }

    // Formatear la fecha para que sea legible
    const comentarios = results.map((comentario) => ({
      ...comentario,
      fecha: new Date(comentario.fecha).toLocaleString(),
    }));

    res.status(200).json(comentarios);
  });
});

// Añadir nuevo comentario (POST)
app.post("/api/com", (req, res) => {
  const { texto, usuario } = req.body;

  // Validar que se reciban los campos obligatorios
  if (!texto || !usuario) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const query = "INSERT INTO comentarios (texto, usuario) VALUES (?, ?)";
  connection.query(query, [texto, usuario], (err, result) => {
    if (err) {
      console.error("❌ Error al insertar comentario:", err);
      return res.status(500).json({ error: "Error al guardar comentario" });
    }

    res.status(201).json({
      mensaje: "Comentario añadido correctamente",
      id: result.insertId,
      usuario,
      texto,
      fecha: new Date().toISOString(),
    });
  });
});

// Obtener comentarios de una discoteca
app.get("/api/discotecas/:id/comentarios", (req, res) => {
  const discotecaId = parseInt(req.params.id);

  const query =
    "SELECT * FROM comentarios_discotecas WHERE discoteca_id = ? ORDER BY fecha DESC";
  connection.query(query, [discotecaId], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener comentarios:", err);
      return res.status(500).json({ error: "Error al obtener comentarios" });
    }
    res.json(results);
  });
});

// Añadir nuevo comentario
app.post("/api/discotecas/:id/comentarios", (req, res) => {
  const discotecaId = parseInt(req.params.id);
  const { usuario, texto, valoracion } = req.body;

  if (!usuario || !texto || !valoracion) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const query =
    "INSERT INTO comentarios_discotecas (discoteca_id, usuario, texto, valoracion) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [discotecaId, usuario, texto, valoracion],
    (err, result) => {
      if (err) {
        console.error("❌ Error al insertar comentario:", err);
        return res.status(500).json({ error: "Error al guardar comentario" });
      }
      res
        .status(201)
        .json({ mensaje: "Comentario añadido", id: result.insertId });
    }
  );
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
});

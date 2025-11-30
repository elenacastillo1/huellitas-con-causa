const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.static("public"));

// ✅ Conexión a MongoDB Atlas o local
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/huellitasDB")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// ✅ Configuración de sesiones
app.use(
  session({
    secret: "huellitas-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Middleware para exponer usuario y rol en todas las vistas
app.use((req, res, next) => {
  res.locals.usuario = req.session?.nombre;
  res.locals.rol = req.session?.rol;
  next();
});

// ✅ Configuración de EJS y body-parser
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// ✅ Importar rutas
const tiendaRoutes = require("./routes/tienda");
const adminRoutes = require("./routes/admin");
const usuarioRoutes = require("./routes/usuario");
const authRoutes = require("./routes/auth");

// ✅ Activar rutas
app.use("/tienda", tiendaRoutes);
app.use("/admin", adminRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);

// ✅ Ruta principal
app.get("/", (req, res) => {
  res.redirect("/tienda");
});

// ✅ Manejo de errores 404
app.use((req, res) => {
  res.status(404).send("Página no encontrada 🐾");
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");

// ✅ GET Registro
router.get("/register", (req, res) => {
  res.render("register", { error: null, success: null, nombre: "", email: "" });
});

// ✅ POST Registro
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.render("register", {
        error: "Ese correo ya está registrado 🐾",
        success: null,
        nombre,
        email,
      });
    }

    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();

    res.render("login", {
      success: "🎉 Registro exitoso, ahora inicia sesión 🐾",
      error: null,
      email,
    });
  } catch (err) {
    console.error("❌ Error al registrar:", err);
    res.status(500).render("register", {
      error: "Error interno al registrar 🐾 Intenta más tarde",
      success: null,
      nombre,
      email,
    });
  }
});

// ✅ GET Login
router.get("/login", (req, res) => {
  res.render("login", { error: null, success: null, email: "" });
});

// ✅ POST Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, password });

    if (usuario) {
      req.session.nombre = usuario.nombre;
      req.session.rol = usuario.rol;
      return res.redirect("/tienda");
    }

    res.status(401).render("login", {
      error: "Credenciales inválidas 🐾",
      success: null,
      email,
    });
  } catch (err) {
    console.error("❌ Error al iniciar sesión:", err);
    res.status(500).render("login", {
      error: "Error interno al iniciar sesión 🐾",
      success: null,
      email,
    });
  }
});

// ✅ Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;

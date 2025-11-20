const express = require("express");
const router = express.Router();
const MascotaRegistrada = require("../models/mascotaRegistrada");

// ✅ Mostrar mascotas confirmadas del usuario
router.get("/mis-mascotas", async (req, res) => {
  if (!req.session.nombre) {
    return res.redirect("/auth/login");
  }

  try {
    const registros = await MascotaRegistrada.find({
      usuario: req.session.nombre,
      confirmado: true,
    });

    res.render("misMascotas", { registros });
  } catch (err) {
    console.error("❌ Error al cargar mascotas del usuario:", err);
    res.status(500).send("Error al cargar tus mascotas");
  }
});

module.exports = router;

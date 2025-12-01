const express = require("express");
const router = express.Router();
const MascotaRegistrada = require("../models/mascotaRegistrada");

// ✅ Bloqueo de acceso para usuarios no admin
router.use((req, res, next) => {
  if (req.session.rol !== "admin") {
    return res.redirect("/tienda");
  }
  next();
});

// ✅ Mostrar panel con todas las compras
router.get("/", async (req, res) => {
  try {
    const registros = await MascotaRegistrada.find().sort({ fecha: -1 });

    res.render("admin", {
      registros,
      usuario: req.session.nombre || "admin",
      rol: req.session.rol || "admin",
    });
  } catch (err) {
    console.error("❌ Error al cargar panel de administración:", err);
    res.status(500).send("Error al cargar el panel");
  }
});

// ✅ Confirmar pago y generar QR bonito
router.post("/confirmar/:id", async (req, res) => {
  try {
    const registro = await MascotaRegistrada.findById(req.params.id);
    if (!registro) {
      return res.status(404).send("Registro no encontrado");
    }

    // Marcar como confirmado
    registro.confirmado = true;

    // Generar URL pública con BASE_URL
    const base = process.env.BASE_URL;
    registro.qrCode = `${base}/pedido/${registro._id}`;

    await registro.save();

    // Renderizar la vista bonita con datos y QR
    res.render("confirmacionBonita", {
      mascota: registro,
      usuario: req.session.nombre || "admin",
      rol: req.session.rol || "admin",
    });
  } catch (err) {
    console.error("❌ Error al confirmar pago:", err);
    res.status(500).send("Error al confirmar el pago");
  }
});

module.exports = router;

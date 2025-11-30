const express = require("express");
const router = express.Router();
const MascotaRegistrada = require("../models/mascotaRegistrada");

// Vista pública del QR
router.get("/:id", async (req, res) => {
  try {
    const registro = await MascotaRegistrada.findById(req.params.id).lean();
    if (!registro) {
      return res.status(404).send("Mascota no encontrada");
    }

    res.render("vistaQR", { mascota: registro });
  } catch (err) {
    console.error("❌ Error al cargar vista QR:", err);
    res.status(500).send("Error al cargar la vista QR");
  }
});

module.exports = router;

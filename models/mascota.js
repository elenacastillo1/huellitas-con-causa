const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  contacto: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,
    required: true,
    trim: true,
  },
  dueñoNombre: {
    type: String,
    required: true,
    trim: true,
  },
  dueñoEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  qrCodeId: {
    type: String,
    default: null, // se puede llenar cuando generes el QR
  },
});

// ✅ Exportar modelo
module.exports = mongoose.model("Mascota", mascotaSchema);

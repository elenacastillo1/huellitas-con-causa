const mongoose = require("mongoose");

const mascotaRegistradaSchema = new mongoose.Schema({
  nombreMascota: {
    type: String,
    required: true,
  },
  nombreDueno: {
    type: String,
    required: true,
  },
  telefonoDueno: {
    type: String,
    required: true,
  },
  direccionDueno: {
    type: String,
    required: true,
  },
  talla: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
  usuario: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MascotaRegistrada", mascotaRegistradaSchema);

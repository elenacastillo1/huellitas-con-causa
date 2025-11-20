const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
  productoNombre: String,
  precio: Number,
  nombreDueño: String,
  telefono: String,
  direccion: String,
  mascota: String,
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Compra", compraSchema);

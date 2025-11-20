const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  talla: {
    type: String,
    enum: ["XS", "S", "M", "XXL"], // ✅ solo las tallas que manejas
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  kilos: {
    type: String, // Ejemplo: "1–3 kg"
    required: true,
  },
  imagen: {
    type: String, // Ruta de la imagen en /public/images
    default: "/images/chaleco.png",
  },
});

module.exports = mongoose.model("Producto", productoSchema);

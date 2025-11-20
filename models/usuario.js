const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "usuario",
  },
});

// ✅ Aquí es donde se crea el modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

// ✅ Aquí es donde se exporta correctamente
module.exports = Usuario;

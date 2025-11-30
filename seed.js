require("dotenv").config();
const mongoose = require("mongoose");
const Producto = require("./models/producto");

// ✅ Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// ✅ Productos a insertar
const productos = [
  {
    nombre: "Chaleco talla XS",
    talla: "XS",
    precio: 180,
    kilos: "1–3 kg",
    imagen: "chaleco-xs.png",
  },
  {
    nombre: "Chaleco talla S",
    talla: "S",
    precio: 200,
    kilos: "4–7 kg",
    imagen: "chaleco-s.png",
  },
  {
    nombre: "Chaleco talla M",
    talla: "M",
    precio: 220,
    kilos: "8–15 kg",
    imagen: "chaleco-m.png",
  },
  {
    nombre: "Chaleco talla XXL",
    talla: "XXL",
    precio: 250,
    kilos: "16–25 kg",
    imagen: "chaleco-xxl.png",
  },
];

// ✅ Insertar productos si la colección está vacía
async function insertar() {
  try {
    const existentes = await Producto.find({});
    if (existentes.length === 0) {
      await Producto.insertMany(productos);
      console.log("✅ Productos insertados correctamente");
    } else {
      console.log("ℹ️ La colección ya tiene productos, no se insertó nada");
    }
  } catch (err) {
    console.error("❌ Error al insertar productos:", err);
  } finally {
    mongoose.connection.close();
  }
}

insertar();

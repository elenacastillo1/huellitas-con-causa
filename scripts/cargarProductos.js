// scripts/cargarProductos.js
const mongoose = require("mongoose");
const Producto = require("../models/producto"); // ajusta la ruta según tu carpeta

// Conexión a MongoDB Atlas o local
mongoose.connect("mongodb://localhost:27017/huellitas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productos = [
  {
    nombre: "Chaleco rojo XS",
    talla: "XS",
    precio: 180,
    kilos: "1–3 kg",
    imagen: "/images/chaleco-rojo-xs.png", // ✅ tu imagen personalizada
  },
  {
    nombre: "Chaleco azul M",
    talla: "M",
    precio: 220,
    kilos: "8–15 kg",
    imagen: "/images/chaleco-azul-m.png",
  },
  {
    nombre: "Chaleco negro XL",
    talla: "XL",
    precio: 250,
    kilos: "15–25 kg",
    imagen: "/images/chaleco-negro-xl.png",
  },
];

async function cargar() {
  try {
    await Producto.insertMany(productos);
    console.log("✅ Productos insertados correctamente");
  } catch (err) {
    console.error("❌ Error al insertar productos:", err);
  } finally {
    mongoose.connection.close();
  }
}

cargar();

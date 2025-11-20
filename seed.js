const mongoose = require("mongoose");
const Producto = require("./models/producto");

mongoose
  .connect("mongodb://127.0.0.1:27017/huellitasDB")
  .then(() => console.log("✅ Conectado a Mongo local"))
  .catch((err) => console.error("❌ Error de conexión:", err));

const productos = [
  {
    nombre: "Chaleco talla XS",
    talla: "XS",
    precio: 180,
    kilos: "1–3 kg",
    imagen: "/images/chaleco-xs.png",
  },
  {
    nombre: "Chaleco talla S",
    talla: "S",
    precio: 200,
    kilos: "4–7 kg",
    imagen: "/images/chaleco-s.png",
  },
  {
    nombre: "Chaleco talla M",
    talla: "M",
    precio: 220,
    kilos: "8–15 kg",
    imagen: "/images/chaleco-m.png",
  },
  {
    nombre: "Chaleco talla XXL",
    talla: "XXL",
    precio: 250,
    kilos: "16–25 kg",
    imagen: "/images/chaleco-xxl.png",
  },
];

async function insertar() {
  try {
    await Producto.deleteMany({});
    await Producto.insertMany(productos);
    console.log("✅ Productos insertados correctamente");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error al insertar productos:", err);
  }
}

insertar();

const mongoose = require("mongoose");
const Producto = require("../models/producto");

mongoose
  .connect("mongodb://localhost:27017/huellitasDB")
  .then(async () => {
    await Producto.insertMany([
      { nombre: "Chaleco talla S", precio: 300 },
      { nombre: "Chaleco talla M", precio: 350 },
      { nombre: "Chaleco talla L", precio: 400 },
    ]);
    console.log("✅ Productos insertados");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Error:", err));

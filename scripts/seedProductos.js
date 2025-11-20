const mongoose = require("mongoose");
const Producto = require("../models/producto");

mongoose.connect("mongodb://localhost:27017/huellitas");

const productos = [
  { nombre: "Chaleco talla S", precio: 300 },
  { nombre: "Chaleco talla M", precio: 350 },
  { nombre: "Chaleco talla L", precio: 400 },
];

Producto.insertMany(productos)
  .then(() => {
    console.log("Productos insertados");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error al insertar productos:", err);
  });

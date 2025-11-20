const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");
const MascotaRegistrada = require("../models/mascotaRegistrada");
const QRCode = require("qrcode");
const path = require("path");

// ✅ Bloqueo de acceso a tienda para admin
router.use((req, res, next) => {
  if (req.session.rol === "admin") {
    return res.redirect("/admin");
  }
  next();
});

// ✅ Mostrar productos disponibles
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();

    const productosDefault = [
      {
        _id: "1",
        nombre: "Chaleco talla XS",
        talla: "XS",
        precio: 180,
        kilos: "1–3 kg",
        imagen: "/images/chaleco-xs.png",
      },
      {
        _id: "2",
        nombre: "Chaleco talla S",
        talla: "S",
        precio: 200,
        kilos: "4–7 kg",
        imagen: "/images/chaleco-s.png",
      },
      {
        _id: "3",
        nombre: "Chaleco talla M",
        talla: "M",
        precio: 220,
        kilos: "8–15 kg",
        imagen: "/images/chaleco-m.png",
      },
      {
        _id: "4",
        nombre: "Chaleco talla XXL",
        talla: "XXL",
        precio: 250,
        kilos: "16–25 kg",
        imagen: "/images/chaleco-xxl.png",
      },
    ];

    res.render("tienda", {
      productos: productos.length ? productos : productosDefault,
      usuario: req.session.nombre || "invitado",
      rol: req.session.rol || "invitado",
    });
  } catch (err) {
    console.error("❌ Error al cargar productos:", err);
    res.status(500).send("Error al cargar la tienda");
  }
});

// ✅ Mostrar formulario de compra
router.get("/comprar/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("comprar", {
      producto,
      usuario: req.session.nombre || "invitado",
      rol: req.session.rol || "invitado",
    });
  } catch (err) {
    console.error("❌ Error al cargar formulario:", err);
    res.status(500).send("Error al mostrar el formulario");
  }
});

// ✅ Procesar compra y generar QR
router.post("/comprar", async (req, res) => {
  const {
    productoId,
    nombreDueno,
    telefonoDueno,
    direccionDueno,
    nombreMascota,
  } = req.body;

  try {
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    const nuevoRegistro = new MascotaRegistrada({
      nombreMascota,
      nombreDueno,
      telefonoDueno,
      direccionDueno,
      talla: producto.nombre,
      precio: producto.precio,
      fecha: new Date(),
      confirmado: false,
      usuario: req.session.nombre || "invitado",
    });

    await nuevoRegistro.save();

    // ✅ QR apunta a la vista escaneable
    const qrData = `http://localhost:3000/tienda/confirmacion/${nuevoRegistro._id}`;
    const qrPath = path.join(
      __dirname,
      "../public/qr",
      `${nuevoRegistro._id}.png`
    );
    await QRCode.toFile(qrPath, qrData);

    // ✅ Enlace directo a WhatsApp
    const numeroDestino = "5218134198292";
    const mensajeWhatsApp = `
Nueva compra registrada:
Mascota: ${nombreMascota}
Dueño: ${nombreDueno}
Teléfono: ${telefonoDueno}
Dirección: ${direccionDueno}
Talla: ${producto.nombre}
Precio: $${producto.precio} MXN
ID único: ${nuevoRegistro._id}
`;
    const enlaceWhatsApp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;

    res.render("confirmacion", {
      mascota: nuevoRegistro,
      producto,
      enlaceWhatsApp,
      usuario: req.session.nombre || "invitado",
      rol: req.session.rol || "invitado",
    });
  } catch (err) {
    console.error("❌ Error al procesar compra:", err);
    res.status(500).send("Error al registrar la compra");
  }
});

// ✅ Mostrar confirmación bonita por ID (vista escaneable)
router.get("/confirmacion/:id", async (req, res) => {
  try {
    const registro = await MascotaRegistrada.findById(req.params.id);
    if (!registro) {
      return res.status(404).send("Mascota no encontrada");
    }

    res.render("confirmacionBonita", {
      mascota: registro,
      usuario: req.session.nombre || "invitado",
      rol: req.session.rol || "invitado",
    });
  } catch (err) {
    console.error("❌ Error al mostrar confirmación:", err);
    res.status(500).send("Error al cargar la confirmación");
  }
});

module.exports = router;

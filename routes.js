const express = require('express');
const router = express.Router();
const connection = require('./LiftTogether/LiftTogether/db');

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
    const { correo, nombre, fechaNacimiento, contraseña, tipo } = req.body;

    if (!correo || !nombre || !fechaNacimiento || !contraseña || !tipo) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Consulta SQL para insertar el usuario
    const query = `
        INSERT INTO Usuario (correo, nombre, fechaNacimiento, contraseña, tipo, suscripción)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Por defecto, la suscripción será 1 (puedes ajustar según tu lógica)
    connection.query(query, [correo, nombre, fechaNacimiento, contraseña, tipo, 1], (err) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    });
});

module.exports = router;

//comentario
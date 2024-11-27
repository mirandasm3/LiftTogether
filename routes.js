const express = require('express');
const router = express.Router();
const db = require('./LiftTogether/db');

router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const result = await db.query(`
            SELECT id, nombre, tipo
            FROM Usuario
            WHERE correo = ? AND contraseña = ?
        `, [correo, contraseña]);

        if (result.length > 0) {
            req.session.userId = result[0].id;
            res.status(200).send({ success: true, nombre: result[0].nombre, tipo: result[0].tipo, id: result[0].id });
        } else {
            res.status(401).send({ success: false, message: 'Correo o contraseña incorrectos.' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send({ success: false, message: 'Error al iniciar sesión.' });
    }
});

router.post('/register', async (req, res) => {
    const { correo, nombre, fechaNacimiento, contraseña, tipo } = req.body;

    try {
        await db.query(`
            INSERT INTO Usuario (correo, nombre, fechaNacimiento, contraseña, tipo, suscripción)
            VALUES (?, ?, ?, ?, ?, 1)
        `, [correo, nombre, fechaNacimiento, contraseña, tipo]);

        res.status(200).send({ message: 'Cuenta creada con éxito.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).send({ message: 'Este correo ya está asociado a otra cuenta.' });
        } else {
            console.error('Error al crear la cuenta:', error);
            res.status(500).send({ message: 'Error al crear la cuenta.' });
        }
    }
});

router.post('/updatePlan', async (req, res) => {
    const { plan, userId } = req.body;
    
    if (!userId) {
        return res.status(401).send({ message: 'Usuario no autenticado.' });
    }

    try {
        await db.query(`
            UPDATE Usuario
            SET suscripción = ?
            WHERE id = ?
        `, [plan, userId]);

        res.status(200).send({ message: 'Plan actualizado con éxito.' });
    } catch (error) {
        console.error('Error al actualizar el plan:', error);
        res.status(500).send({ message: 'Error al actualizar el plan.' });
    }
});


router.get('/getUserInfo', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).send({ message: 'Falta el ID de usuario.' });
    }

    try {
        const [result] = await db.query(`
            SELECT nombre, suscripción
            FROM Usuario
            WHERE id = ?
        `, [userId]);

        if (result) {
            res.status(200).send({ nombre: result.nombre, suscripción: result.suscripción });
        } else {
            console.log('No se encontró el usuario con id:', userId);
            res.status(404).send({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        res.status(500).send({ message: 'Error al obtener la información del usuario.' });
    }
});


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: 'Error al cerrar sesión.' });
        }
        res.status(200).send({ message: 'Sesión cerrada.' });
    });
});

module.exports = router;

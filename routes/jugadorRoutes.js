const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugadorController');

/**
 * @swagger
 * tags:
 *   name: Jugadores
 *   description: API para gestionar jugadores
 */

/**
 * @swagger
 * /api/jugadores:
 *   get:
 *     summary: Obtiene todos los jugadores
 *     tags: [Jugadores]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/', jugadorController.getAllJugadores);

/**
 * @swagger
 * /api/jugadores/{id}:
 *   get:
 *     summary: Obtiene un jugador por ID
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador encontrado
 *       404:
 *         description: Jugador no encontrado
 */
router.get('/:id', jugadorController.getJugadorById);

/**
 * @swagger
 * /api/jugadores:
 *   post:
 *     summary: Crea un nuevo jugador
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               DNI:
 *                 type: string
 *               fecha_inscripcion:
 *                 type: string
 *                 format: date
 *               id_tutor:
 *                 type: integer
 *               id_categoria:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Jugador creado
 */
router.post('/', jugadorController.createJugador);

/**
 * @swagger
 * /api/jugadores/{id}:
 *   put:
 *     summary: Actualiza un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Jugador actualizado
 */
router.put('/:id', jugadorController.updateJugador);

/**
 * @swagger
 * /api/jugadores/{id}:
 *   delete:
 *     summary: Elimina un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador eliminado
 */
router.delete('/:id', jugadorController.deleteJugador);

module.exports = router;

const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

/**
 * @swagger
 * tags:
 *   name: Asistencias
 *   description: API para gestionar asistencias
 */

/**
 * @swagger
 * /api/asistencias:
 *   get:
 *     summary: Obtiene todas las asistencias
 *     tags: [Asistencias]
 *     responses:
 *       200:
 *         description: Lista de asistencias
 */
router.get('/', asistenciaController.getAllAsistencias);

/**
 * @swagger
 * /api/asistencias/{id}:
 *   get:
 *     summary: Obtiene una asistencia por ID
 *     tags: [Asistencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asistencia encontrada
 *       404:
 *         description: Asistencia no encontrada
 */
router.get('/:id', asistenciaController.getAsistenciaById);

/**
 * @swagger
 * /api/asistencias/jugador/{id_jugador}:
 *   get:
 *     summary: Obtiene las asistencias de un jugador
 *     tags: [Asistencias]
 *     parameters:
 *       - in: path
 *         name: id_jugador
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de asistencias
 */
router.get('/jugador/:id_jugador', asistenciaController.getAsistenciasByJugador);

/**
 * @swagger
 * /api/asistencias/fecha/{fecha}:
 *   get:
 *     summary: Obtiene las asistencias de una fecha
 *     tags: [Asistencias]
 *     parameters:
 *       - in: path
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de asistencias
 */
router.get('/fecha/:fecha', asistenciaController.getAsistenciasByFecha);

/**
 * @swagger
 * /api/asistencias:
 *   post:
 *     summary: Crea una nueva asistencia
 *     tags: [Asistencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_jugador:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               presente:
 *                 type: boolean
 *               observaciones:
 *                 type: string
 *     responses:
 *       201:
 *         description: Asistencia creada
 */
router.post('/', asistenciaController.createAsistencia);

/**
 * @swagger
 * /api/asistencias/{id}:
 *   put:
 *     summary: Actualiza una asistencia
 *     tags: [Asistencias]
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
 *         description: Asistencia actualizada
 */
router.put('/:id', asistenciaController.updateAsistencia);

/**
 * @swagger
 * /api/asistencias/{id}:
 *   delete:
 *     summary: Elimina una asistencia
 *     tags: [Asistencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asistencia eliminada
 */
router.delete('/:id', asistenciaController.deleteAsistencia);

module.exports = router;

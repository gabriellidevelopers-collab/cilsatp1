const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

/**
 * @swagger
 * tags:
 *   name: Tutores
 *   description: API para gestionar tutores
 */

/**
 * @swagger
 * /api/tutores:
 *   get:
 *     summary: Obtiene todos los tutores
 *     tags: [Tutores]
 *     responses:
 *       200:
 *         description: Lista de tutores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', tutorController.getAllTutores);

/**
 * @swagger
 * /api/tutores/{id}:
 *   get:
 *     summary: Obtiene un tutor por ID
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tutor encontrado
 *       404:
 *         description: Tutor no encontrado
 */
router.get('/:id', tutorController.getTutorById);

/**
 * @swagger
 * /api/tutores/{id}/jugadores:
 *   get:
 *     summary: Obtiene los jugadores de un tutor
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/:id/jugadores', tutorController.getJugadoresByTutor);

/**
 * @swagger
 * /api/tutores:
 *   post:
 *     summary: Crea un nuevo tutor
 *     tags: [Tutores]
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
 *               DNI:
 *                 type: string
 *               telefono:
 *                 type: string
 *               correo:
 *                 type: string
 *               parentesco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tutor creado
 */
router.post('/', tutorController.createTutor);

/**
 * @swagger
 * /api/tutores/{id}:
 *   put:
 *     summary: Actualiza un tutor
 *     tags: [Tutores]
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
 *         description: Tutor actualizado
 */
router.put('/:id', tutorController.updateTutor);

/**
 * @swagger
 * /api/tutores/{id}:
 *   delete:
 *     summary: Elimina un tutor
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tutor eliminado
 */
router.delete('/:id', tutorController.deleteTutor);

module.exports = router;

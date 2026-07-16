const express = require('express');
const router = express.Router();
const entrenadorController = require('../controllers/entrenadorController');

/**
 * @swagger
 * tags:
 *   name: Entrenadores
 *   description: API para gestionar entrenadores
 */

/**
 * @swagger
 * /api/entrenadores:
 *   get:
 *     summary: Obtiene todos los entrenadores
 *     tags: [Entrenadores]
 *     responses:
 *       200:
 *         description: Lista de entrenadores
 */
router.get('/', entrenadorController.getAllEntrenadores);

/**
 * @swagger
 * /api/entrenadores/{id}:
 *   get:
 *     summary: Obtiene un entrenador por ID
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrenador encontrado
 *       404:
 *         description: Entrenador no encontrado
 */
router.get('/:id', entrenadorController.getEntrenadorById);

/**
 * @swagger
 * /api/entrenadores/{id}/categorias:
 *   get:
 *     summary: Obtiene las categorías de un entrenador
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/:id/categorias', entrenadorController.getCategoriasByEntrenador);

/**
 * @swagger
 * /api/entrenadores:
 *   post:
 *     summary: Crea un nuevo entrenador
 *     tags: [Entrenadores]
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
 *               especialidad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Entrenador creado
 */
router.post('/', entrenadorController.createEntrenador);

/**
 * @swagger
 * /api/entrenadores/{id}:
 *   put:
 *     summary: Actualiza un entrenador
 *     tags: [Entrenadores]
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
 *         description: Entrenador actualizado
 */
router.put('/:id', entrenadorController.updateEntrenador);

/**
 * @swagger
 * /api/entrenadores/{id}:
 *   delete:
 *     summary: Elimina un entrenador
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrenador eliminado
 */
router.delete('/:id', entrenadorController.deleteEntrenador);

module.exports = router;

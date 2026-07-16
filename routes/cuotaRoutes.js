const express = require('express');
const router = express.Router();
const cuotaController = require('../controllers/cuotaController');

/**
 * @swagger
 * tags:
 *   name: Cuotas
 *   description: API para gestionar cuotas
 */

/**
 * @swagger
 * /api/cuotas:
 *   get:
 *     summary: Obtiene todas las cuotas
 *     tags: [Cuotas]
 *     responses:
 *       200:
 *         description: Lista de cuotas
 */
router.get('/', cuotaController.getAllCuotas);

/**
 * @swagger
 * /api/cuotas/pendientes:
 *   get:
 *     summary: Obtiene las cuotas pendientes
 *     tags: [Cuotas]
 *     responses:
 *       200:
 *         description: Lista de cuotas pendientes
 */
router.get('/pendientes', cuotaController.getCuotasPendientes);

/**
 * @swagger
 * /api/cuotas/{id}:
 *   get:
 *     summary: Obtiene una cuota por ID
 *     tags: [Cuotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cuota encontrada
 *       404:
 *         description: Cuota no encontrada
 */
router.get('/:id', cuotaController.getCuotaById);

/**
 * @swagger
 * /api/cuotas/jugador/{id_jugador}:
 *   get:
 *     summary: Obtiene las cuotas de un jugador
 *     tags: [Cuotas]
 *     parameters:
 *       - in: path
 *         name: id_jugador
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de cuotas
 */
router.get('/jugador/:id_jugador', cuotaController.getCuotasByJugador);

/**
 * @swagger
 * /api/cuotas:
 *   post:
 *     summary: Crea una nueva cuota
 *     tags: [Cuotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_jugador:
 *                 type: integer
 *               mes:
 *                 type: string
 *               monto:
 *                 type: number
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *                 enum: [pendiente, pagado, vencido]
 *     responses:
 *       201:
 *         description: Cuota creada
 */
router.post('/', cuotaController.createCuota);

/**
 * @swagger
 * /api/cuotas/{id}:
 *   put:
 *     summary: Actualiza una cuota
 *     tags: [Cuotas]
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
 *         description: Cuota actualizada
 */
router.put('/:id', cuotaController.updateCuota);

/**
 * @swagger
 * /api/cuotas/{id}/pagar:
 *   patch:
 *     summary: Paga una cuota
 *     tags: [Cuotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_pago:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Cuota pagada
 */
router.patch('/:id/pagar', cuotaController.pagarCuota);

/**
 * @swagger
 * /api/cuotas/{id}:
 *   delete:
 *     summary: Elimina una cuota
 *     tags: [Cuotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cuota eliminada
 */
router.delete('/:id', cuotaController.deleteCuota);

module.exports = router;

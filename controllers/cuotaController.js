const Cuota = require('../models/Cuota');
const Jugador = require('../models/Jugador');

exports.getAllCuotas = async (req, res) => {
    try {
        const cuotas = await Cuota.findAll();
        res.json({ success: true, data: cuotas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCuotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const cuota = await Cuota.findByPk(id);
        if (!cuota) {
            return res.status(404).json({ success: false, message: 'Cuota no encontrada' });
        }
        const jugador = await Jugador.findByPk(cuota.id_jugador);
        res.json({ success: true, data: { ...cuota.toJSON(), jugador } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCuotasByJugador = async (req, res) => {
    try {
        const { id_jugador } = req.params;
        const cuotas = await Cuota.findAll({ where: { id_jugador } });
        res.json({ success: true, data: cuotas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCuotasPendientes = async (req, res) => {
    try {
        const cuotas = await Cuota.findAll({ where: { estado: 'pendiente' } });
        res.json({ success: true, data: cuotas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCuota = async (req, res) => {
    try {
        const { id_jugador, mes, monto, fecha_vencimiento, estado } = req.body;

        if (!id_jugador || !mes || !monto) {
            return res.status(400).json({ success: false, message: 'id_jugador, mes y monto son obligatorios' });
        }

        const jugador = await Jugador.findByPk(id_jugador);
        if (!jugador) {
            return res.status(400).json({ success: false, message: 'El jugador no existe' });
        }

        // Evitar duplicado por jugador y mes
        const existing = await Cuota.findOne({ where: { id_jugador, mes } });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Ya existe una cuota para este jugador en ese mes' });
        }

        const newCuota = await Cuota.create({
            id_jugador,
            mes,
            monto,
            fecha_vencimiento,
            estado: estado || 'pendiente'
        });

        res.status(201).json({ success: true, data: newCuota });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCuota = async (req, res) => {
    try {
        const { id } = req.params;
        const { monto, fecha_vencimiento, estado } = req.body;

        const existing = await Cuota.findByPk(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Cuota no encontrada' });
        }

        await existing.update({ monto, fecha_vencimiento, estado });
        res.json({ success: true, data: existing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.pagarCuota = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha_pago } = req.body;

        const existing = await Cuota.findByPk(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Cuota no encontrada' });
        }

        if (existing.estado === 'pagado') {
            return res.status(400).json({ success: false, message: 'La cuota ya fue pagada' });
        }

        await existing.update({ 
            estado: 'pagado', 
            fecha_pago: fecha_pago || new Date().toISOString().split('T')[0] 
        });
        res.json({ success: true, data: existing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCuota = async (req, res) => {
    try {
        const { id } = req.params;
        const cuota = await Cuota.findByPk(id);
        if (!cuota) {
            return res.status(404).json({ success: false, message: 'Cuota no encontrada' });
        }

        await cuota.destroy();
        res.json({ success: true, message: 'Cuota eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

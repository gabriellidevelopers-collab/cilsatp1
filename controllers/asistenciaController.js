const Asistencia = require('../models/Asistencia');
const Jugador = require('../models/Jugador');

exports.getAllAsistencias = async (req, res) => {
    try {
        const asistencias = await Asistencia.findAll();
        res.json({ success: true, data: asistencias });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAsistenciaById = async (req, res) => {
    try {
        const { id } = req.params;
        const asistencia = await Asistencia.findByPk(id);
        if (!asistencia) {
            return res.status(404).json({ success: false, message: 'Asistencia no encontrada' });
        }
        const jugador = await Jugador.findByPk(asistencia.id_jugador);
        res.json({ success: true, data: { ...asistencia.toJSON(), jugador } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAsistenciasByJugador = async (req, res) => {
    try {
        const { id_jugador } = req.params;
        const asistencias = await Asistencia.findAll({ where: { id_jugador } });
        res.json({ success: true, data: asistencias });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAsistenciasByFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const asistencias = await Asistencia.findAll({ where: { fecha } });
        res.json({ success: true, data: asistencias });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createAsistencia = async (req, res) => {
    try {
        const { id_jugador, fecha, presente, observaciones } = req.body;

        if (!id_jugador || !fecha) {
            return res.status(400).json({ success: false, message: 'id_jugador y fecha son obligatorios' });
        }

        const jugador = await Jugador.findByPk(id_jugador);
        if (!jugador) {
            return res.status(400).json({ success: false, message: 'El jugador no existe' });
        }

        // Evitar duplicados por jugador y fecha
        const existing = await Asistencia.findOne({ where: { id_jugador, fecha } });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Ya existe un registro de asistencia para este jugador en esa fecha' });
        }

        const newAsistencia = await Asistencia.create({
            id_jugador,
            fecha,
            presente: presente !== undefined ? presente : true,
            observaciones
        });

        res.status(201).json({ success: true, data: newAsistencia });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAsistencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { presente, observaciones } = req.body;

        const existing = await Asistencia.findByPk(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Asistencia no encontrada' });
        }

        await existing.update({ presente, observaciones });
        res.json({ success: true, data: existing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAsistencia = async (req, res) => {
    try {
        const { id } = req.params;
        const asistencia = await Asistencia.findByPk(id);
        if (!asistencia) {
            return res.status(404).json({ success: false, message: 'Asistencia no encontrada' });
        }

        await asistencia.destroy();
        res.json({ success: true, message: 'Asistencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

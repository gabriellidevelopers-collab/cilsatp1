const Tutor = require('../models/Tutor');
const Jugador = require('../models/Jugador');

exports.getAllTutores = async (req, res) => {
    try {
        const tutores = await Tutor.findAll();
        res.json({ success: true, data: tutores });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTutorById = async (req, res) => {
    try {
        const { id } = req.params;
        const tutor = await Tutor.findByPk(id);
        if (!tutor) {
            return res.status(404).json({ success: false, message: 'Tutor no encontrado' });
        }
        res.json({ success: true, data: tutor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getJugadoresByTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const jugadores = await Jugador.findAll({ where: { id_tutor: id } });
        res.json({ success: true, data: jugadores });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createTutor = async (req, res) => {
    try {
        const { nombre, apellido, DNI, telefono, correo, parentesco } = req.body;

        if (!nombre || !apellido || !DNI) {
            return res.status(400).json({ success: false, message: 'nombre, apellido y DNI son obligatorios' });
        }

        const existingByDni = await Tutor.findOne({ where: { DNI } });
        if (existingByDni) {
            return res.status(400).json({ success: false, message: 'El DNI ya está registrado' });
        }

        if (correo) {
            const existingByEmail = await Tutor.findOne({ where: { correo } });
            if (existingByEmail) {
                return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
            }
        }

        const newTutor = await Tutor.create({ nombre, apellido, DNI, telefono, correo, parentesco });
        res.status(201).json({ success: true, data: newTutor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, telefono, correo, parentesco } = req.body;

        const existingTutor = await Tutor.findByPk(id);
        if (!existingTutor) {
            return res.status(404).json({ success: false, message: 'Tutor no encontrado' });
        }

        if (correo && correo !== existingTutor.correo) {
            const existingByEmail = await Tutor.findOne({ where: { correo } });
            if (existingByEmail) {
                return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
            }
        }

        await existingTutor.update({ nombre, apellido, telefono, correo, parentesco });
        res.json({ success: true, data: existingTutor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const tutor = await Tutor.findByPk(id);
        if (!tutor) {
            return res.status(404).json({ success: false, message: 'Tutor no encontrado' });
        }

        const jugadores = await Jugador.count({ where: { id_tutor: id } });
        if (jugadores > 0) {
            throw new Error('No se puede eliminar el tutor porque tiene jugadores asociados');
        }

        await tutor.destroy();
        res.json({ success: true, message: 'Tutor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

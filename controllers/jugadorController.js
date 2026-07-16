const Jugador = require('../models/Jugador');
const Tutor = require('../models/Tutor');
const Categoria = require('../models/Categoria');
const Asistencia = require('../models/Asistencia');
const Cuota = require('../models/Cuota');

exports.getAllJugadores = async (req, res) => {
    try {
        const jugadores = await Jugador.findAll();
        const jugadoresConInfo = await Promise.all(jugadores.map(async (jugador) => {
            const tutor = await Tutor.findByPk(jugador.id_tutor);
            const categoria = await Categoria.findByPk(jugador.id_categoria);
            return { ...jugador.toJSON(), tutor, categoria };
        }));
        res.json({ success: true, data: jugadoresConInfo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getJugadorById = async (req, res) => {
    try {
        const { id } = req.params;
        const jugador = await Jugador.findByPk(id);
        if (!jugador) {
            return res.status(404).json({ success: false, message: 'Jugador no encontrado' });
        }

        const tutor = await Tutor.findByPk(jugador.id_tutor);
        const categoria = await Categoria.findByPk(jugador.id_categoria);
        const asistencias = await Asistencia.findAll({ where: { id_jugador: id } });
        const cuotas = await Cuota.findAll({ where: { id_jugador: id } });

        res.json({
            success: true,
            data: { ...jugador.toJSON(), tutor, categoria, asistencias, cuotas }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createJugador = async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento, DNI, fecha_inscripcion, id_tutor, id_categoria } = req.body;

        if (!nombre || !apellido || !DNI || !id_tutor || !id_categoria) {
            return res.status(400).json({ success: false, message: 'nombre, apellido, DNI, id_tutor e id_categoria son obligatorios' });
        }

        const existingByDni = await Jugador.findOne({ where: { DNI } });
        if (existingByDni) {
            return res.status(400).json({ success: false, message: 'El DNI ya está registrado' });
        }

        const tutor = await Tutor.findByPk(id_tutor);
        if (!tutor) {
            return res.status(400).json({ success: false, message: 'El tutor no existe' });
        }

        const categoria = await Categoria.findByPk(id_categoria);
        if (!categoria) {
            return res.status(400).json({ success: false, message: 'La categoría no existe' });
        }

        const newJugador = await Jugador.create({
            nombre, apellido, fecha_nacimiento, DNI,
            fecha_inscripcion: fecha_inscripcion || new Date().toISOString().split('T')[0],
            id_tutor, id_categoria
        });

        res.status(201).json({ success: true, data: newJugador });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, fecha_nacimiento, id_tutor, id_categoria } = req.body;

        const existingJugador = await Jugador.findByPk(id);
        if (!existingJugador) {
            return res.status(404).json({ success: false, message: 'Jugador no encontrado' });
        }

        if (id_tutor) {
            const tutor = await Tutor.findByPk(id_tutor);
            if (!tutor) {
                return res.status(400).json({ success: false, message: 'El tutor no existe' });
            }
        }

        if (id_categoria) {
            const categoria = await Categoria.findByPk(id_categoria);
            if (!categoria) {
                return res.status(400).json({ success: false, message: 'La categoría no existe' });
            }
        }

        await existingJugador.update({ nombre, apellido, fecha_nacimiento, id_tutor, id_categoria });
        res.json({ success: true, data: existingJugador });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const jugador = await Jugador.findByPk(id);
        if (!jugador) {
            return res.status(404).json({ success: false, message: 'Jugador no encontrado' });
        }

        await jugador.destroy();
        res.json({ success: true, message: 'Jugador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

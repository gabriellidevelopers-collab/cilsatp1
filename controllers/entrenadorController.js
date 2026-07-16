const Entrenador = require('../models/Entrenador');
const Categoria = require('../models/Categoria');

exports.getAllEntrenadores = async (req, res) => {
    try {
        const entrenadores = await Entrenador.findAll();
        res.json({ success: true, data: entrenadores });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getEntrenadorById = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenador = await Entrenador.findByPk(id);
        if (!entrenador) {
            return res.status(404).json({ success: false, message: 'Entrenador no encontrado' });
        }
        res.json({ success: true, data: entrenador });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCategoriasByEntrenador = async (req, res) => {
    try {
        const { id } = req.params;
        const categorias = await Categoria.findAll({ where: { id_entrenador: id } });
        res.json({ success: true, data: categorias });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createEntrenador = async (req, res) => {
    try {
        const { nombre, apellido, DNI, telefono, correo, especialidad } = req.body;

        if (!nombre || !apellido || !DNI) {
            return res.status(400).json({ success: false, message: 'nombre, apellido y DNI son obligatorios' });
        }

        const existing = await Entrenador.findOne({ where: { DNI } });
        if (existing) {
            return res.status(400).json({ success: false, message: 'El DNI ya está registrado' });
        }

        const newEntrenador = await Entrenador.create({ nombre, apellido, DNI, telefono, correo, especialidad });
        res.status(201).json({ success: true, data: newEntrenador });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateEntrenador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, telefono, correo, especialidad } = req.body;

        const existing = await Entrenador.findByPk(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Entrenador no encontrado' });
        }

        await existing.update({ nombre, apellido, telefono, correo, especialidad });
        res.json({ success: true, data: existing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteEntrenador = async (req, res) => {
    try {
        const { id } = req.params;
        const entrenador = await Entrenador.findByPk(id);
        if (!entrenador) {
            return res.status(404).json({ success: false, message: 'Entrenador no encontrado' });
        }

        const categorias = await Categoria.count({ where: { id_entrenador: id } });
        if (categorias > 0) {
            throw new Error('No se puede eliminar el entrenador porque tiene categorías asociadas');
        }

        await entrenador.destroy();
        res.json({ success: true, message: 'Entrenador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

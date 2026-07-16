const Categoria = require('../models/Categoria');
const Entrenador = require('../models/Entrenador');
const Jugador = require('../models/Jugador');

exports.getAllCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json({ success: true, data: categorias });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        const entrenador = await Entrenador.findByPk(categoria.id_entrenador);
        const jugadores = await Jugador.findAll({ where: { id_categoria: id } });
        res.json({ success: true, data: { ...categoria.toJSON(), entrenador, jugadores } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getJugadoresByCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const jugadores = await Jugador.findAll({ where: { id_categoria: id } });
        res.json({ success: true, data: jugadores });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCategoria = async (req, res) => {
    try {
        const { nombre, anio_nacimiento, id_entrenador } = req.body;

        if (!nombre) {
            return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
        }

        if (id_entrenador) {
            const entrenador = await Entrenador.findByPk(id_entrenador);
            if (!entrenador) {
                return res.status(400).json({ success: false, message: 'El entrenador no existe' });
            }
        }

        const newCategoria = await Categoria.create({ nombre, anio_nacimiento, id_entrenador });
        res.status(201).json({ success: true, data: newCategoria });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, anio_nacimiento, id_entrenador } = req.body;

        const existing = await Categoria.findByPk(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        if (id_entrenador) {
            const entrenador = await Entrenador.findByPk(id_entrenador);
            if (!entrenador) {
                return res.status(400).json({ success: false, message: 'El entrenador no existe' });
            }
        }

        await existing.update({ nombre, anio_nacimiento, id_entrenador });
        res.json({ success: true, data: existing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        await categoria.destroy();
        res.json({ success: true, message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

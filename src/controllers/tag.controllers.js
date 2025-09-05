import TagModel from "../models/tag.model.js";

//POST /api/tags: crear un nuevo estudiante
export const createTag = async (req, res) => {
    try {
        let {name} = req.body;
        const tagCreated = await TagModel.create(req.body);
        res.status(201).json({message: "Estudiante creado correctamente:"})
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/tags: listar todos las tags
export const listAllTag = async (req, res) => {
    try {
        const listedTags = await TagModel.findAll()
        res.json(listedTags)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/tags/:id: obtener una tag por ID
export const listTagById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedTagsID = await TagModel.findByPk(id);
        if (listedTagsID) {
            res.status(200).json(listedTagsID);
        } else {
            res.status(404).json({ message: 'La tag buscada no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE /api/tags/:id: eliminar una tag
export const deleteTag = async (req, res) => {
    const { id } = req.params;
    try {
        const findTag = await TagModel.findByPk(id);
        if (findTag) {
            await findTag.destroy()
            res.json({ message: 'Estudiante eliminado correctamente' })
        } else {
            res.status(404).json({ message: 'La tag que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//PUT /api/tags/:id: actualizar una tag existente 
export const updateTag = async (req, res) => {
    const { id } = req.params;
    let {name} = req.body;
    try {
        const findTag = await TagModel.findByPk(id);

        if (findTag) {
            await findTag.update({name}, {where: {id}});
            res.status(200).json(findTag);
        } else {
            res.status(404).json({ error: 'La tag que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};
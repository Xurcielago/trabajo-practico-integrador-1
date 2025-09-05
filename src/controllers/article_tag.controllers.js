import ArticleTagModel from "../models/article_tag.model.js";

//POST /api/articleTags: crear un tipo de asistencia
export const createArticleTag = async (req, res) => {
    try {
        let {article_id, tag_id} = req.body;

        const attendanceCreated = await ArticleTagModel.create(req.body)
        res.status(201).json(attendanceCreated)
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/articleTags: listar todos los tipos de asistencia
export const listAllArticleTag = async (req, res) => {
    try {
        const listedArticleTag = await ArticleTagModel.findAll()
        res.json(listedArticleTag)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }

};

//GET /api/articleTags/:id: obtener un tipo de artículo por ID
export const listArticleTagById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedArticleTagID = await ArticleTagModel.findByPk(id);
        if (listedArticleTagID) {
            res.status(200).json(listedAttendancetID);
        } else {
            res.status(404).json({ message: 'Tabla intermedia buscada no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE /api/articleTags/:id: eliminar un tipo de artículo
export const deleteArticleTag = async (req, res) => {
    const { id } = req.params;
    try {
        const listedArticleTag = await ArticleTagModel.findByPk(id);
        if (listedArticleTag) {
            await listedArticleTag.destroy()
            res.json({ message: 'Artículo eliminada correctamente' })
        } else {
            res.status(404).json({ message: 'La tabla intermedia que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//PUT /api/articleTags/:id: actualizar un tipo de artículo existente 
export const updateArticleTag = async (req, res) => {
    const { id } = req.params;
    let {article_id, tag_id} = req.body;
    try {
        const listedArticleTag = await ArticleTagModel.findByPk(id);

        if (listedArticleTag) {
            await listedArticleTag.update({title, content, excerpt, user_id}, {where: {id}});
            res.status(200).json(listedArticleTag);
        } else {
            res.status(404).json({ error: 'La tabla intermedia que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};


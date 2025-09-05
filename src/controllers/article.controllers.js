import ArticleModel from "../models/article.model.js";

//POST /api/articles: crear un tipo de asistencia
export const createArticle = async (req, res) => {
    try {
        let {title, content, excerpt, user_id} = req.body;

        const articleCreated = await ArticleModel.create(req.body)
        res.status(201).json(articleCreated)
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/articles: listar todos los tipos de asistencia
export const listAllArticle = async (req, res) => {
    try {
        const listedArticle = await ArticleModel.findAll()
        res.json(listedArticle)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }

};

//GET /api/articles/:id: obtener un tipo de artículo por ID
export const listArticleById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedArticleID = await ArticleModel.findByPk(id);
        if (listedArticleID) {
            res.status(200).json(listedAttendancetID);
        } else {
            res.status(404).json({ message: 'Artículo buscado no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE /api/articles/:id: eliminar un tipo de artículo
export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const listedArticle = await ArticleModel.findByPk(id);
        if (listedArticle) {
            await listedArticle.destroy()
            res.json({ message: 'Artículo eliminada correctamente' })
        } else {
            res.status(404).json({ message: 'El artículo que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//PUT /api/articles/:id: actualizar un tipo de artículo existente 
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    let {title, content, excerpt, user_id} = req.body;
    try {
        const listedArticle = await ArticleModel.findByPk(id);

        if (listedArticle) {
            await listedArticle.update({title, content, excerpt, user_id}, {where: {id}});
            res.status(200).json(listedArticle);
        } else {
            res.status(404).json({ error: 'El artículo que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};



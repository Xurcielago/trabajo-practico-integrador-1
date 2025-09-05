import ProfileModel from "../models/profile.model.js";

//POST /api/profile: crear un nuevo perfiles
export const createProfile = async (req, res) => {
    try {
       let {first_name, last_name, biography, avatar_url, birth_date} = req.body;
       const profileCreated = await ProfileModel.create(req.body)
       res.status(201).json(profileCreated)
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/profile: listar todos los perfiles
export const listAllProfile = async (req, res) => {
    try {
        const listedProfiles = await ProfileModel.findAll(
            //{
            // attributes: {
            // exclude: ["student_id"],
            // },
            // include: [
            // {
            //     model: StudentModel,
            //     as: "student",
            // },
            // ],
        //}
    );
        res.json(listedProfiles)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/profile/:id: obtener un perfil por ID
export const listProfileById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedProfileID = await ProfileModel.findByPk(id
            //, {
            // attributes: {
            // exclude: ["student_id"],
            // },
            // include: [
            // {
            //     model: StudentModel,
            //     as: "student",
            // },
            // ],
    //    }
    );
        if (listedProfileID) {
            res.status(200).json(listedProfileID);
        } else {
            res.status(404).json({ message: 'El perfil buscado no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE /api/users/:id: eliminar un perfil
export const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const findProfile = await ProfileModel.findByPk(id);
        if (findProfile) {
            await findProfile.destroy()
            res.json({ message: 'Perfil eliminado correctamente' })
        } else {
            res.status(404).json({ message: 'El perfil que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//PUT /api/users/:id: actualizar un perfil existente
export const updateProfile = async (req, res) => {
    const { id } = req.params;
    let {first_name, last_name, biography, avatar_url, birth_date} = req.body;
    try {
        const findProfile = await ProfileModel.findByPk(id);

        if (findProfile) {
            await findProfile.update({first_name, last_name, biography, avatar_url, birth_date}, {where: {id}});
            res.status(200).json(findProfile);
        } else {
            res.status(404).json({ error: 'El perfil que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

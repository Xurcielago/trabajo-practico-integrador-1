import StudentModel from "../models/student.model.js";
import UserModel from "../models/user.model.js";

//POST /api/users: crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
       let {name, email, password, student_id} = req.body;
       const userCreated = await UserModel.create(req.body)
       res.status(201).json(userCreated)
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
}

//GET /api/users: listar todos los usuarios
export const listAllUser = async (req, res) => {
    try {
        const listedUsers = await UserModel.findAll({
            attributes: {
            exclude: ["student_id"],
            },
            include: [
            {
                model: StudentModel,
                as: "student",
            },
            ],
        });
        res.json(listedUsers)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/users/:id: obtener un usuario por ID
export const listUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedUserID = await UserModel.findByPk(id, {
            attributes: {
            exclude: ["student_id"],
            },
            include: [
            {
                model: StudentModel,
                as: "student",
            },
            ],
        });
        if (listedUserID) {
            res.status(200).json(listedUserID);
        } else {
            res.status(404).json({ message: 'El usuario buscado no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE /api/users/:id: eliminar un usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await UserModel.findByPk(id);
        if (findUser) {
            await findUser.destroy()
            res.json({ message: 'Usuario eliminado correctamente' })
        } else {
            res.status(404).json({ message: 'El usuario que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
}

//PUT /api/users/:id: actualizar un usuario existente (con validaciones)
export const updateUser = async (req, res) => {
    const { id } = req.params;
    let {name, email, password, student_id} = req.body;
    try {
        const findUser = await UserModel.findByPk(id);

        if (findUser) {
            await findUser.update({name, email, password, student_id}, {where: {id}});
            res.status(200).json(findUser);
        } else {
            res.status(404).json({ error: 'El usuario que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};



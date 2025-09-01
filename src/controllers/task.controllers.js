import TaskModel from "../models/task.model.js";
import UserModel from "../models/user.model.js";
import StudentModel from "../models/student.model.js";

//POST /api/tasks: crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        let {title, description, is_complete, user_id} = req.body;

        //Validaciones para "title"
        let titleUnico = await TaskModel.findOne({ where: { title } })
        if (titleUnico) {
            return res.status(400).json({ message: "Error: Este título ya se encuentra registrado" })
        }
        const titleLength = await title.length
        if (title > 100) {
            return res.status(400).json({ message: "Error: Campo title no puede contener más de 100 caracteres" })
        }
        if (title.trim() === '') {
            return res.status(400).json({ message: "Error: Campo title no puede estar vacío" })
        }

        //Validaciones para "description"
        const descriptionLength = await description.length
        if (descriptionLength > 100) {
            return res.status(400).json({ message: "Error: Campo description no puede contener más de 100 caracteres" })
        }
        if (description.trim() === '') {
            return res.status(400).json({ message: "Error: Campo description no puede estar vacío" })
        }

        //Validaciones para "is_complete"
        if (typeof is_complete !== "boolean") {
            return res.status(400).json({ message: "Error: Campo is_complete debe ser de tipo booleano (true o false)" })
        }

        //Validaciones para "user_id"
        const usuarioExiste = await UserModel.findByPk(user_id)
        if (!usuarioExiste) {
            return res.status(404).json({ message: "Error: El usuario al que se intenta asignar esta tarea no existe" })
        }

        const taskCreated = await TaskModel.create(req.body)
        res.status(201).json(taskCreated)
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ' , error: err.message})
    }
}

//GET /api/tasks: listar todas las tareas (task)
export const listAllTask = async (req, res) => {
    try {
        const listedTasks = await TaskModel.findAll({
            attributes: {
            exclude: ["user_id"],
            },
            include: [
                {
                model: UserModel,
                as: "author",
                attributes: {
                    exclude: ["password", "student_id"],
                    },
                    include: [
                        {
                            model: StudentModel,
                            as: "student",
                        },
                    ],
                },
            ],
        });
        res.json(listedTasks)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }

};

//GET /api/tasks/:id: obtener una tarea por ID
export const listTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedTaskID = await TaskModel.findByPk(id, {
            attributes: {
            exclude: ["user_id"],
            },
            include: [
                {
                model: UserModel,
                as: "author",
                attributes: {
                    exclude: ["password", "person_id"],
                    },
                    include: [
                        {
                            model: StudentModel,
                            as: "student",
                        },
                    ],
                },
            ],
        });
        if (listedTaskID) {
            res.status(200).json(listedTaskID);
        } else {
            res.status(404).json({message: 'La tarea buscada no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};



//GET /api/author_task/:id obtener tarea por ID incluyendo la información del usuario autor
export const authorTask = async (req, res) => {
    const { id } = req.params;

    try {
        const listedTaskID = await tasksModel.findByPk(id,{
            attributes: {
                exclude: ["user_id"]
            },
            include: [
                {
                    Model: userModel,
                    as: "Author",
                    attributes: {
                        exclude: ["password", "person_id"],
                    }
                }
            ],
        }
    )
    } catch (err) {

    }
};

/*
const tasks = await tasksModel.findAll{{
    include [
        
    ]
}}
*/

//DELETE /api/tasks/:id: eliminar una tarea
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const findTask = await TaskModel.findByPk(id);
        if (findTask) {
            await findTask.destroy()
            res.json({ message: 'Tarea eliminada correctamente' })
        } else {
            res.status(404).json({ message: 'La tarea que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
}

//PUT /api/tasks/:id: actualizar una tarea (task) existente (con validaciones)
export const updateTask = async (req, res) => {
    const { id } = req.params;
    let {title, description, is_complete, user_id} = req.body;

    //Validaciones para "title"
    const titleActual = await TaskModel.findByPk(id);
    if (titleActual.title !== title) {
        let titleUnico = await TaskModel.findOne({ where: { title } })
        if (titleUnico) {
            return res.status(400).json({ message: titleActual })
        }
    }
    const titleLength = await title.length
    if (title > 100) {
        return res.status(400).json({ message: "Error: Campo title no puede contener más de 100 caracteres" })
    }
    if (title.trim() === '') {
        return res.status(400).json({ message: "Error: Campo title no puede estar vacío" })
    }

    //Validaciones para "description"
    const descriptionLength = await description.length
    if (descriptionLength > 100) {
        return res.status(400).json({ message: "Error: Campo description no puede contener más de 100 caracteres" })
    }
    if (description.trim() === '') {
        return res.status(400).json({ message: "Error: Campo description no puede estar vacío" })
    }

    //Validaciones para "is_complete"
    if (typeof is_complete !== "boolean") {
        return res.status(400).json({ message: "Error: Campo is_complete debe ser de tipo booleano (true o false)" })
    }

    //Validaciones para "user_id"
    const usuarioExiste = await UserModel.findByPk(user_id)
    if (!usuarioExiste) {
        return res.status(404).json({ message: "Error: El usuario al que se intenta asignar esta tarea no existe" })
    }    

    try {
        const findTask = await TaskModel.findByPk(id);

        if (findTask) {
            await findTask.update({title, description, is_complete}, {where: {id}});
            res.status(200).json(findTask);
        } else {
            res.status(404).json({ error: 'La tarea que se intenta actualizar no existe'});
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/author_task/:id obtener tarea por ID incluyendo la información del usuario autor
export const author2Task = async (req, res) => {
    const { id } = req.params;

    try {
        const listedTaskID = await tasksModel.findByPk(id,{
            attributes: {
                exclude: ["user_id"]
            },
            include: [
                {
                    Model: userModel,
                    as: "author",
                    through: { //Para no mostrar tablas intermedias
                        attributes: [],
                    }
                }
            ],
        }
    )
    } catch (err) {

    }
};
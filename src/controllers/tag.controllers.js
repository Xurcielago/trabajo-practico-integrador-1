import StudentModel from "../models/student.model.js";

//POST /api/students: crear un nuevo estudiante
export const createStudent = async (req, res) => {
    try {
        let {name, surname, gender} = req.body;
        const studentCreated = await StudentModel.create(req.body);
        res.status(201).json({message: "Estudiante creado correctamente:"})
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/students: listar todos los estudiantes
export const listAllStudent = async (req, res) => {
    try {
        const listedStudents = await StudentModel.findAll()
        res.json(listedStudents)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/students/:id: obtener un estudiante por ID
export const listStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedStudentID = await StudentModel.findByPk(id);
        if (listedStudentID) {
            res.status(200).json(listedStudentID);
        } else {
            res.status(404).json({ message: 'El estudiante buscado no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE /api/students/:id: eliminar un estudiante
export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const findStudent = await StudentModel.findByPk(id);
        if (findStudent) {
            await findStudent.destroy()
            res.json({ message: 'Estudiante eliminado correctamente' })
        } else {
            res.status(404).json({ message: 'El estudiante que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
}

//PUT /api/students/:id: actualizar un estudiante existente 
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    let {name, surname, gender} = req.body;
    try {
        const findStudent = await StudentModel.findByPk(id);

        if (findStudent) {
            await findStudent.update({name, surname, gender}, {where: {id}});
            res.status(200).json(findStudent);
        } else {
            res.status(404).json({ error: 'El estudiante que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};
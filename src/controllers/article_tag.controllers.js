import StudentAttendanceModel from "../models/studentAttendance.model.js";
import AttendanceModel from "../models/attendance.model.js";
import StudentModel from "../models/student.model.js";

//POST/api/studentAttendances
//Crear un nuevo registro de la tabla StundentAttendance
export const createStudentAttendance = async (req, res) => {
    try {
        let {student_id, attendance_id, attendance_date} = req.body;
        
        //Validaciones para student_id
        const studentExiste = await StudentModel.findByPk(student_id)
        if (!studentExiste) {
            return res.status(404).json({ message: "Error: El estudiante al que se intenta asignar no existe" })
        }

        //Validaciones para attendance_id
        const attendanceExiste = await AttendanceModel.findByPk(attendance_id)
        if (!attendanceExiste) {
            return res.status(404).json({ message: "Error: El tipo de asistencia que se intenta asignar no existe" })
        }
        
        //Validaciones para attendance_date
        const date = new Date(attendance_date);
        if (isNaN(date.getTime())) {
            return res.status(400).json({
            message: "La fecha ingresada no es válida, el formato aceptado es AAAA/MM/DD"
            });
        }

        const today = new Date();
        if (date > today) {
            return res.status(400).json({
            message: "La fecha no puede ser en el futuro"
            });
        }

        const studentAttendanceCreated = await StudentAttendanceModel.create(req.body)
        res.status(201).json(studentAttendanceCreated)

    } catch (err) {
        res.status(500).json({message: "Error del lado interno del servidor", error: err.message})
    }
};

//GET/api/studentAttendances
//Ver todos los registro de la tabla StundentAttendance
export const listAllStudentAttendance = async (req, res) => {
    try {
        const listedStudentAttendance = await StudentAttendanceModel.findAll({
            attributes: {
            exclude: ["student_id", "attendance_id"],
            },
            include: [
                {
                model: StudentModel,
                as: "student",
                },
                {
                model: AttendanceModel,
                as: "attendance",
                },
            ],         
        });
        res.json(listedStudentAttendance)
        
    } catch (err) {
        res.status(500).json({message: "Error interno del lado del servidor", error: err.message})
    }
};

//GET/api/studentAttendances/id:
//Obtiene un registro tabla StundentAttendance especificando el ID
export const listStudentAttendanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedStudentAttendance = await StudentAttendanceModel.findByPk(id, {
            attributes: {
            exclude: ["student_id", "attendance_id"],
            },
            include: [
                {
                model: StudentModel,
                as: "student",
                },
                {
                model: AttendanceModel,
                as: "attendance",
                },
            ],         
        });
        if (listedStudentAttendance) {
            res.status(200).json(listedStudentAttendance);
        } else {
            res.status(404).json({ message: 'El registro de asistencia buscado no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE/api/studentAttendances/id:
//Borra un registro de la tabla studentAttendance especificando el ID
export const deleteStudentAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        const findStudentAttendance = await StudentAttendanceModel.findByPk(id);
        if (findStudentAttendance) {
            await findStudentAttendance.destroy()
            res.json({ message: 'Registro de asistencia eliminado correctamente' })
        } else {
            res.status(404).json({ message: 'El registro de asistencia que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//PUT/api/studentAttendances/id:
//Actualiza un registro de la tabla studentAttendance especificando el ID
export const updateStudentAttendance = async (req, res) => {
    const { id } = req.params;
    let {attendance_date, student_id, attendance_id} = req.body;
    try {
        const findStudentAttendance = await StudentAttendanceModel.findByPk(id);

        if (findStudentAttendance) {
            await findStudentAttendance.update({attendance_date, student_id, attendance_id}, {where: {id}});
            res.status(200).json(findStudentAttendance);
        } else {
            res.status(404).json({ error: 'El registro de asistencia que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    } 
}
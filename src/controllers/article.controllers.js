import AttendanceModel from "../models/attendance.model.js";

//POST /api/attendances: crear un tipo de asistencia
export const createAttendance = async (req, res) => {
    try {
        let {status} = req.body;

        const attendanceCreated = await AttendanceModel.create(req.body)
        res.status(201).json(attendanceCreated)
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//GET /api/attendances: listar todos los tipos de asistencia
export const listAllAttendance = async (req, res) => {
    try {
        const listedAttendance = await AttendanceModel.findAll()
        res.json(listedAttendance)

    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }

};

//GET /api/attendances/:id: obtener un tipo de asistencia por ID
export const listAttendanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const listedAttendancetID = await AttendanceModel.findByPk(id);
        if (listedAttendancetID) {
            res.status(200).json(listedAttendancetID);
        } else {
            res.status(404).json({ message: 'El tipo de asistencia buscada no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};

//DELETE /api/attendances/:id: eliminar un tipo de asistencia
export const deleteAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        const findAttendance = await AttendanceModel.findByPk(id);
        if (findAttendance) {
            await findAttendance.destroy()
            res.json({ message: 'Tipo de asistencia eliminada correctamente' })
        } else {
            res.status(404).json({ message: 'El tipo de asistencia que se intenta eliminar no existe' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
}

//PUT /api/attendances/:id: actualizar un tipo de asistencia existente 
export const updateAttendance = async (req, res) => {
    const { id } = req.params;
    let {status} = req.body;
    try {
        const findAttendance = await AttendanceModel.findByPk(id);

        if (findAttendance) {
            await findAttendance.update({status}, {where: {id}});
            res.status(200).json(findAttendance);
        } else {
            res.status(404).json({ error: 'El tipo de asistencia que se intenta actualizar no existe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error del lado interno del servidor: ', error: err.message })
    }
};


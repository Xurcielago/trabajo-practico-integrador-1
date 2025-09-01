import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import StudentModel from "./student.model.js";
import AttendanceModel from "./attendance.model.js";


const StudentAttendanceModel = sequelize.define("studentAttendance", {
 id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  
  attendance_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  } 

},{
    timestamps: false,
})

//RELACIONES
AttendanceModel.belongsToMany(StudentModel, {
  through: StudentAttendanceModel,
  foreignKey: "attendance_id",
  as: "attendances",
});

StudentModel.belongsToMany(AttendanceModel, {
  through: StudentAttendanceModel,
  foreignKey: "student_id",
  as: "students",
});


StudentAttendanceModel.belongsTo(AttendanceModel, {
  foreignKey: "attendance_id",
  as: "attendance",
})

StudentAttendanceModel.belongsTo(StudentModel, {
  foreignKey: "student_id",
  as: "student",
})
export default StudentAttendanceModel
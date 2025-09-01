import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import StudentModel from "./student.model.js";

const UserModel = sequelize.define("user", {
    name: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(100), 
        allowNull:false
    }
},{
    timestamps: false,
})

UserModel.belongsTo(StudentModel, {
    foreignKey: "student_id", 
    as: "student"
 });
 
StudentModel.hasMany(UserModel, {
    foreignKey: "student_id"
});

export default UserModel

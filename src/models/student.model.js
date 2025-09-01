import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const StudentModel = sequelize.define("student", {
    name: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

    surname: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

    gender: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

},{
    timestamps: false,
})

export default StudentModel
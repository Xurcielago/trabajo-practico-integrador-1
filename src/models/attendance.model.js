import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const AttendanceModel = sequelize.define("attendance", {
    status: {
        type: DataTypes.STRING(100), 
        allowNull: false
    }
},{
    timestamps: false,
})

export default AttendanceModel
import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.model.js";

const TaskModel = sequelize.define("task", {
    title: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

    is_complete: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false, 
        allowNull: false
    }
},{
    timestamps: false,
})

// RELACIONES:
TaskModel.belongsTo(UserModel, {
    foreignKey: "user_id", 
    as: "author" 
});

UserModel.hasMany(TaskModel, {
    foreignKey: "user_id"
});

export default TaskModel
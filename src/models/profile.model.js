import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const ProfileModel = sequelize.define("profile", {
    first_name: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING(50), 
        allowNull: false
    },

    biography: {
        type: DataTypes.TEXT,
    },

    avatar_url: {
        type: DataTypes.STRING(255)
    },

    birth_date: {
        type: DataTypes.DATEONLY
    }
},{
    timestamps: true
})

export default ProfileModel
import { sequelize } from "../config/database.js";
import { DataTypes, ENUM } from "sequelize";
import ProfileModel from "./profile.model.js";

const UserModel = sequelize.define("user", {
    username: {
        type: DataTypes.STRING(100), 
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING(255), 
        allowNull:false
    },

    role: {
        type: ENUM('user','admin'),
        defaultValue: 'user', 
        allowNull:false
    }
})

UserModel.belongsTo(ProfileModel, {
    foreignKey: "profile_id", 
    as: "profile",
    onDelete: "CASCADE",
 });
 
ProfileModel.hasOne(UserModel, {
    foreignKey: "profile_id",
    as: "user"
});
/*
ProfileModel.addHook("afterDestroy", async (profile) => {
  const user = await UserModel.findOne({
    where: { person_id: profile.dataValues.id },
  })
});

  await user.destroy();
*/
export default UserModel

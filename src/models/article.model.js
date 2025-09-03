import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const ArticleModel = sequelize.define("article", {
    title: {
        type: DataTypes.STRING(200), 
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    excerpt: {
        type: DataTypes.STRING(500)
    }
},{
    timestamps: true,
});

ArticleModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
  onDelete: "CASCADE",
});

UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "articles" });

export default ArticleModel
import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import ArticleModel from "./article.model.js";
import TagModel from "./tag.model.js";


const ArticleTagModel = sequelize.define("Article_Tag", {
 id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
},{
    timestamps: true,
})

//RELACIONES
TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  as: "articles",
});

ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "tag_id",
  as: "tags",
});

ArticleTagModel.belongsTo(ArticleModel, {
  foreignKey: "article_id",
  as: "article",
});

ArticleTagModel.belongsTo(TagModel, {
  foreignKey: "tag_id",
  as: "tag",
});

export default ArticleTagModel
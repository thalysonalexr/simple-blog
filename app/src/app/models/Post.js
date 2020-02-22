import { Model, DataTypes } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING(255),
      tag: DataTypes.STRING(255),
      content: DataTypes.TEXT,
    }, {
      sequelize,
      hooks: {
        beforeCreate: (post, options) => {
          post.tag = post.title.toLowerCase().split(' ').join('-').substring(0, 255);
        },
        beforeSave: (post, options) => {
          post.tag = post.title.toLowerCase().split(' ').join('-').substring(0, 255);
        },
      }
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'author',  as: 'owner' });
    this.belongsTo(models.Category, { foreignKey: 'category', as: 'category_post' });
  }
}

export default Post;

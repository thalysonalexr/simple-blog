import { Model, DataTypes } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING(50),
      description: DataTypes.STRING(255),
    }, { sequelize });
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'category', as: 'posts_category' });
  }
}

export default Category;

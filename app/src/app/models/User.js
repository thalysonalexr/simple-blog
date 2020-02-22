import bcrypt from 'bcryptjs';
import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING(255),
      email: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      tag: DataTypes.STRING(255),
    }, {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 10);
          user.tag = user.name.toLowerCase().split(' ').join('-').substring(0, 255);
        },
        beforeSave: (user, options) => {
          user.tag = user.name.toLowerCase().split(' ').join('-').substring(0, 255);
        },
      },
      sequelize
    });
  }

  async validatePassword (password) {
    return await bcrypt.compare(password, this.password);
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'author', as: 'posts_author' });
  }
}

export default User;

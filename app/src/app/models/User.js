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
        }
      },
      sequelize
    });
  }

  async validatePassword (password) {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;

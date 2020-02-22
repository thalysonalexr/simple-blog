import Sequelize from 'sequelize';
import config from '../config/database';

import User from '../app/models/User';
import Post from '../app/models/Post';
import Category from '../app/models/Category';

const connection = new Sequelize(config[process.env.NODE_ENV]);

User.init(connection);
Post.init(connection);
Category.init(connection);

User.associate(connection.models);
Post.associate(connection.models);
Category.associate(connection.models);

export default connection;

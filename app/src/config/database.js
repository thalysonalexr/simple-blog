module.exports = {
  migrations: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'root',
    password: 'root',
    port: 5433,
    database: 'blog',
    define: {
      timestamps: true,
      underscored: true
    }
  },
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: 'blog',
    define: {
      timestamps: true,
      underscored: true
    }
  },
  production: {}
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'tag', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.removeColumn('users', 'tag');
  }
};

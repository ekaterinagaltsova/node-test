module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'googleId',
    {
      type: Sequelize.STRING,
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn(
    'Users',
    'googleId',
  ),
};

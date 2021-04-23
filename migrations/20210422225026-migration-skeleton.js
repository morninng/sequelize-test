'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Matters', 'matterTypeReferenceId', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'MatterTypeReferences',
            },
            key: 'id'
          },
        }, { transaction: t })
      ]);
    });




  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

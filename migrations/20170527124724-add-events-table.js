module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('events', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      aggregate_id: {type: Sequelize.UUID, allowNull: false},
      type: {type: Sequelize.STRING(255), allowNull: false},
      meta_data: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: false
      },
      payload: {
        type: Sequelize.JSON,
        defaultValue: {},
        allowNull: false
      },
      created_at: {type: Sequelize.DATE, allowNull: false}
    })
  }
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('addresses', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false
      },
      user_id: {type: Sequelize.STRING(255), allowNull: false},
      street_one: {type: Sequelize.STRING(255), allowNull: false},
      street_two: {type: Sequelize.STRING(255), allowNull: true},
      city: {type: Sequelize.STRING(255), allowNull: false},
      state_id: {
        type: Sequelize.STRING(2),
        allowNull: false,
        references: {model: 'states', key: 'id'}
      },
      zip_code: {type: Sequelize.STRING(9), allowNull: false},
      country_id: {type: Sequelize.STRING(2), defaultValue: 'US', allowNull: false},
      created_at: {type: Sequelize.DATE, allowNull: false},
      updated_at: {type: Sequelize.DATE, allowNull: false},
      deleted_at: {type: Sequelize.DATE}
    })
  }
}

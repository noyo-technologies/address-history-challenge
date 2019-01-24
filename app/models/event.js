const Sequelize = require('sequelize')

module.exports = db => {
  return db.define('event', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    aggregate_id: {type: Sequelize.UUID, allowNull: false},
    type: {type: Sequelize.STRING(255), allowNull: false},
    meta_data: {type: Sequelize.JSON, defaultValue: {}, allowNull: false},
    payload: {type: Sequelize.JSON, defaultValue: {}, allowNull: false}
  }, {
    paranoid: false,
    updatedAt: false,
    deletedAt: false
  })
}

exports.register = function (server, options, next) {
  const Sequelize = require('sequelize')
  const sequelize = new Sequelize(
    options.config.database, options.config.username, options.config.password, {
      host: options.config.host,
      port: options.config.port,
      dialect: options.config.dialect,
      define: {
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
      },
      logging: false
    })

  server.expose({
    sequelize: sequelize,
    models: options.models(sequelize)
  })

  sequelize.authenticate().asCallback(next)
}

exports.register.attributes = {
  name: 'db',
  version: '1.0.0'
}

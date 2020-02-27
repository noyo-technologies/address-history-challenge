const Sequelize = require('sequelize')

exports.register = (server, _, next) => {

  const Address = server.plugins.db.models.Address

  server.route([{
    method: 'GET',
    path: '/user_ids',
    config: {
      tags: ['api'],
      handler: (_, reply) => {
        Address.findAll({
          attributes: ['user_id'],
          group: ['user_id']
        })
        .then(addresses => {
          const userIds = addresses.map((address) => address.user_id);
          return userIds
        })
        .asCallback(reply)
      }
    }
  }])

  next()
}

exports.register.attributes = {
    name: 'user_ids',
    version: '1.0.0'
  }

const P = require('bluebird')

const uuid = require('uuid')

const seedOne = (server) => {
  const userId = uuid();

  let addressId;

  return server.inject({
    method: 'POST',
    url: '/addresses',
    payload: {
      user_id: userId,
      street_one: '123 Main Street',
      street_two: 'Apt 1',
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94103'
    }
  })
  .then(address => {
    addressId = address.result.id

    return server.inject({
      method: 'PATCH',
      url: `/addresses/${addressId}`,
      payload: {
        'street_two': 'Apt A'
      }
    })
  })
  .then(() => {
    return server.inject({
      method: 'PATCH',
      url: `/addresses/${addressId}`,
      payload: {
        street_one: '456 Fake Street',
        street_two: '',
        city: 'Oakland',
        zip_code: '94618'
      }
    })
  })
  .then(() => {
    return server.inject({
      method: 'DELETE',
      url: `/addresses/${addressId}`
    })
  })
  .then(() => {
      return server.inject({
      method: 'POST',
      url: `/addresses/${addressId}/restore`
    })
  })
  .then(() => userId)
}

const seedTwo = (server) => {
  const userId = uuid();

  let addressId;

  return server.inject({
    method: 'POST',
    url: '/addresses',
    payload: {
      user_id: userId,
      street_one: '456 Elm Ave',
      street_two: 'Apt 42',
      city: 'Houston',
      state: 'TX',
      zip_code: '77001'
   }
  })
  .then(address => {
    addressId = address.result.id

    return server.inject({
      method: 'PATCH',
      url: `/addresses/${addressId}`,
      payload: {
        'street_one': '456 Elm Avenue',
        'street_two': 'Apartment 42'
      }
    })
  })
  .then(() => {
    return server.inject({
      method: 'PATCH',
      url: `/addresses/${addressId}`,
      payload: {
        street_one: '9876 Oak Street',
        street_two: '',
        city: 'Dallas',
        state: 'TX',
        zip_code: '75001'
      }
    })
  })
  .then(() => {
    return server.inject({
      method: 'DELETE',
      url: `/addresses/${addressId}`
    })
  })
  .then(() => {
      return server.inject({
      method: 'POST',
      url: `/addresses/${addressId}/restore`
    })
  })
  .then(() => userId)
}


exports.register = (server, _, next) => {
  const Address = server.plugins.db.models.Address
  const Event = server.plugins.db.models.Event

  server.route([{
    method: 'POST',
    path: '/seed',
    config: {
      tags: ['api'],
      handler: (_, reply) => {
        P.all([
          Address.truncate(),
          Event.truncate()
        ]).then(() => {
          return P.all([
            seedOne(server),
            seedTwo(server)
          ])
        })
        .then(userIds => {
          return {
            user_ids: [userIds]
          }
        }).asCallback(reply)
      }
    }
  }])

  next()
}

exports.register.attributes = {
  name: 'seed',
  version: '1.0.0'
}

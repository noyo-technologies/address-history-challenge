const Boom = require('boom')

exports.register = (server, options, next) => {
  const errors = {
    invalidState: Boom.badRequest('state does not exist'),
    addressNotFound: Boom.notFound('address does not exist'),
    addressNotVerified: Boom.badRequest('address not verified')
  }

  server.expose(errors)

  next()
}

exports.register.attributes = {
  name: 'errors',
  version: '1.0.0'
}

exports.register = (server, options, next) => {
  server.register({
    register: require('hapi-bunyan'),
    options: {logger: options.logger, includeTags: true}
  }, next)
}

exports.register.attributes = {
  name: 'logging',
  version: '1.0.0'
}

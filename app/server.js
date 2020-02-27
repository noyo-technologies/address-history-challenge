const Hapi = require('hapi')
const Pkg = require('../package.json')

const Bunyan = require('bunyan')
const logger = Bunyan.createLogger({name: Pkg.name, level: 'debug'})
process.on('uncaughtException', err => {
  logger.error(err)
})

const server = new Hapi.Server({
  connections: {
    router: {stripTrailingSlash: true}
  }
})

server.connection({port: process.env.PORT || 5000, routes: {cors: true}})

server.register([
  {
    register: require('./services/logging'),
    options: {logger: logger}
  },
  require('./services/errors'),
  require('./services/schemas'),
  {
    register: require('./services/db'),
    options: {
      config: {
        database: process.env.DATABASE_DATABASE,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT || 5432,
        host: process.env.DATABASE_HOST,
        dialect: 'postgres'
      },
      models: require('./models')
    }
  },
  require('./services/documentation')
], err => {
  if (err) throw err
  server.register([
    {
      register: require('./event-handlers'),
      options: {events: require('./events')}
    },
    {
      register: require('./features/addresses'),
      options: {events: require('./events')}
    },
    {
      register: require('./features/user_ids'),
      options: {events: require('./events')}
    }
  ], err => {
    if (err) throw err
    server.start(err => {
      if (err) throw err
      console.log(`Server Running at: ${server.info.uri}`)
    })
  })
})

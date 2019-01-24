exports.register = (server, options, next) => {

  const Event = server.plugins.db.models.Event

  server.event('KB')

  server.on('KB', event => {
    Event.create({
      aggregate_id: event.aggregateId,
      type: event.type,
      payload: event.toJSON()
    })
  })

  next()
}

exports.register.attributes = {
  name: 'event-handlers',
  version: '1.0.0'
}

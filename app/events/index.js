'use strict'

const requireDirectory = require('require-directory')
const events = requireDirectory(module)
const eventsExport = {}

for (let key in events) {
  const evt = events[key]
  eventsExport[evt.type] = evt.event
}

module.exports = eventsExport

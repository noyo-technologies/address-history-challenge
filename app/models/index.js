const requireDirectory = require('require-directory')
const models = requireDirectory(module)

module.exports = function (db) {
  const modelsExport = {}

  Object.getOwnPropertyNames(models).map(model => {
    const key = model.split('-').map(split => {
      return split.charAt(0).toUpperCase() + split.slice(1)
    }).join('')

    modelsExport[key] = models[model](db)
  })

  modelsExport.Address.belongsTo(modelsExport.State, {foreignKey: 'state_id'})
  modelsExport.State.hasMany(modelsExport.Address, {foreignKey: 'state_id'})

  return modelsExport
}

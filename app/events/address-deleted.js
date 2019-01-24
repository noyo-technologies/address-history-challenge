'use strict';

const type = 'ADDRESS_DELETED';

module.exports.event = class AddressDeleted {
  constructor(id, deletedAt) {
    this._type = type
    this._id = id
    this._deleted_at = deletedAt || new Date()
  }

  toJSON() {
    return {
      deleted_at: this._deleted_at
    }
  }

  // Aggregate ID
  get aggregateId() {return this._id}

  // Basic Getters
  get id() {return this._id}
  get type() {return this._type}
  get deleted_at() {return this._deleted_at}
}

module.exports.type = type

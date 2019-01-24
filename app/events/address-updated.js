'use strict';

const type = 'ADDRESS_UPDATED'

module.exports.event = class AddressUpdated {
  constructor(id, args) {
    this._type = type
    this._id = id
    this._street_one = args.street_one
    this._street_two = args.street_two
    this._city = args.city
    this._state_id = args.state_id
    this._zip_code = args.zip_code
  }

  toJSON() {
    return {
      street_one: this._street_one,
      street_two: this._street_two,
      city: this._city,
      state_id: this._state_id,
      zip_code: this._zip_code
    }
  }

  // Aggregate ID
  get aggregateId() {return this._id}

  // Basic Getters
  get id() {return this._id}
  get type() {return this._type}
  get street_one() {return this._street_one}
  get street_two() {return this._street_two}
  get city() {return this._city}
  get state_id() {return this._state_id}
  get zip_code() {return this._zip_code}
}

module.exports.type = type

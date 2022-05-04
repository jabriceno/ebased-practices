const { InputValidation } = require('ebased/schema/inputValidation');

class CreateClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CREATE_CLIENT',
      specversion: 'v1.0.0',
      source: meta.source,
      payload: payload,
      schema: {
        dni: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dob: { type: Date, required: true },
      },
    })
  }
}

module.exports = { CreateClientValidation };
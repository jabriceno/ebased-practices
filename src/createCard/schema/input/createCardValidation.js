const { InputValidation } = require("ebased/schema/inputValidation");

class CreateCardValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: "CARD.CREATE_CARD",
      specversion: "v1.0.0",
      source: meta.source,
      payload: payload,
      schema: {
        dni: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dob: { type: Date, required: true },
        age: { type: Number, required: true },
      }
    });
  }
}

module.exports = { CreateCardValidation };

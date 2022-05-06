const { InputValidation } = require("ebased/schema/inputValidation");

class CreateGiftValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: "GIFT.CREATE_GIFT",
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

module.exports = { CreateGiftValidation };

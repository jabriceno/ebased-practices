"use strict";

const { DownstreamEvent } = require("ebased/schema/downstreamEvent");

class CreateGiftEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: "CLIENT.CREATE_GIFT",
      specversion: "v1.0.0",
      payload,
      meta,
      schema: {
        dni: { type: String, required: true },
        dob: { type: Date, required: true },
      },
    });
  }
}

module.exports = { CreateGiftEvent };

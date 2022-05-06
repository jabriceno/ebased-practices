"use strict";

const { DownstreamEvent } = require("ebased/schema/downstreamEvent");

class ClientCreatedEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: "CLIENT.CREATE",
      specversion: "v1.0.0",
      payload,
      meta,
      schema: {
        dni: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dob: { type: Date, required: true },
        age: { type: Number, required: true },
      },
    });
  }
}

module.exports = { ClientCreatedEvent };

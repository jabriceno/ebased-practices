'use strict';

const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class CreateCardEvent extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CREATE_CARD',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        dni: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        age: {type: Number, required: false},
      },
    });
  }
}

module.exports = {CreateCardEvent};

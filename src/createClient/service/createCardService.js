"use strict";

const sqs = require("ebased/service/downstream/sqs");

async function emitClientCreated(clientCreatedEvent) {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  await sqs.send(
    {
      QueueUrl: process.env.CREATE_CARD_QUEUE,
      MessageBody: eventPayload,
    },
    eventMeta
  );
}

module.exports = { emitClientCreated };

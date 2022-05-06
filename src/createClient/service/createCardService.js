"use strict";

const sqs = require("ebased/service/downstream/sqs");

async function emitClientCreatedForCard(clientCreatedEvent) {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  await sqs.send(
    {
      QueueUrl: process.env.CREATE_CARD_QUEUE,
      MessageBody: eventPayload,
    },
    eventMeta
  );
}

async function emitClientCreatedForGift(clientCreatedEvent) {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  await sqs.send(
    {
      QueueUrl: process.env.CREATE_GIFT_QUEUE,
      MessageBody: eventPayload,
    },
    eventMeta
  );
}

module.exports = { emitClientCreatedForCard, emitClientCreatedForGift };

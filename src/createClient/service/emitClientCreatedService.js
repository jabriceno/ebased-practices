"use strict";

const sns = require("ebased/service/downstream/sns");

async function emitClientCreated(clientCreatedEvent) {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  const snsPublishParams = {
    TopicArn: process.env.CLIENT_CREATED_TOPIC,
    Message: eventPayload,
  };
  await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { emitClientCreated };

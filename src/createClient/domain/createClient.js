"use strict";

const { ErrorHandled } = require("ebased/util/error");
const logger = require("ebased/_helper/logger");

const {
  CreateClientValidation,
} = require("../schema/input/createClientValidation");
const { canOpenAccountByAge, calculateAge } = require("./helper/utils");
const { createClient } = require("../service/createClientService");
const { ClientCreatedEvent } = require("../schema/event/clientCreatedEvent");
const { emitClientCreated } = require("../service/emitClientCreatedService");

module.exports = async (commandPayload, commandMeta) => {
  const validatedPayload = new CreateClientValidation(
    commandPayload,
    commandMeta
  ).get();
  logger.info(validatedPayload);

  const { dni, name, lastName, dob } = validatedPayload;

  if (!canOpenAccountByAge(dob)) {
    logger.error("invalid range of age", dob);
    throw new ErrorHandled("AGE_VALIDATION_FAILS", {
      code: 422,
      layer: "CREATE_CLIENT_ERROR_DOMAIN",
    });
  }

  logger.info("Trying to create client");
  try {
    await createClient({ dni, name, lastName, dob });

    const emitMessage = { dni, name, lastName, dob, age: calculateAge(dob) };
    await emitClientCreated(new ClientCreatedEvent(emitMessage, commandMeta));

    return {
      body: {
        message: "Account created",
        name,
        lastName,
      },
    };
  } catch (err) {
    logger.error("error in account creation");
    throw new ErrorHandled("ACCOUNT_CREATION_FAILS", {
      code: 500,
      layer: "CREATE_CLIENT_ERROR_DOMAIN",
    });
  }
};

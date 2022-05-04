"use strict";

const { ErrorHandled } = require("ebased/util/error");
const logger = require("ebased/_helper/logger");

const {
  CreateCardValidation,
} = require("../schema/input/createCardValidation");
const { createCard } = require("../service/createCardService");

module.exports = async (commandPayload, commandMeta) => {
  const validatedPayload = new CreateCardValidation(
    commandPayload,
    commandMeta
  ).get();

  try {
    logger.info("Trying to create card");

    const { dni, name, lastName } = validatedPayload;

    // logica de creacion de la tarjeta
    const cardInfo = {
      dni,
      name,
      lastName,
      type: "VISA",
      number: "66020919388101177",
      valid: "01/28",
      secret: "660",
    };

    await createCard(cardInfo);

    // TODO: should this function return something?
    return {
      body: {
        message: cardInfo,
      },
    };
  } catch (err) {
    logger.error("error in card creation");
    throw new ErrorHandled("CARD_CREATION_FAILS", {
      code: 500,
      layer: "CREATE_CARD_ERROR_DOMAIN",
    });
  }
};

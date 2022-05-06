"use strict";

const { ErrorHandled } = require("ebased/util/error");
const logger = require("ebased/_helper/logger");

const {
  CreateGiftValidation,
} = require("../schema/input/createGiftValidation");
const { generateGift } = require("./helper/utils");
const { getGift, createGift } = require("../service/createGiftService");

module.exports = async (commandPayload, commandMeta) => {
  const validatedPayload = new CreateGiftValidation(
    commandPayload,
    commandMeta
  ).get();

  try {
    logger.info("Trying to create gift");
    logger.info(validatedPayload);
    const { dni, dob } = validatedPayload;

    let gift = await getGift(dni);

    if (!gift) {
      const generatedGift = generateGift(dob);
      const newGift = {
        dni,
        dob,
        gift: generatedGift,
      };

      await createGift(newGift);
      gift = newGift;
    }

    // TODO: should this function return something?
    return {
      body: {
        message: gift,
      },
    };
  } catch (err) {
    logger.error("error in gift creation");
    throw new ErrorHandled("GIFT_CREATION_FAILS", {
      code: 500,
      layer: "CREATE_GIFT_ERROR_DOMAIN",
    });
  }
};

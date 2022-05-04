'use strict';

const { ErrorHandled } = require('ebased/util/error');
const logger = require('ebased/_helper/logger');

const { CreateClientValidation } = require('../schema/input/createClientValidation');
const { canOpenAccountByAge } = require('./helper/utils');
const { createClient } = require('../service/createClientService');
const { CreateCardEvent } = require('../schema/event/createCardEvent');
const { emitClientCreated } = require('../service/createCardService');

module.exports = async (commandPayload, commandMeta) => {

  const validatedPayload = new CreateClientValidation(commandPayload, commandMeta).get();
  logger.info(validatedPayload);

  const { dni, name, lastName, dob } = validatedPayload;

  if (!canOpenAccountByAge(dob)) {
    logger.error('invalid date of birth', dob);
    throw new ErrorHandled('AGE_VALIDATION_FAILS', {
      code: 422,
      layer: 'CREATE_CLIENT_ERROR_DOMAIN',
    });
  }

  logger.info('Trying to create client');
  try {
    await createClient({dni, name, lastName, dob});
    
    const cardMessage = {dni, name, lastName};
    await emitClientCreated(new CreateCardEvent(cardMessage, commandMeta));

    return {
      body: {
        message: 'a message for ', name, lastName
      }
    };
  } catch (err) {
    logger.error('error in account creation');
    throw new ErrorHandled('ACCOUNT_CREATION_FAILS', {
      code: 500,
      layer: 'CREATE_CLIENT_ERROR_DOMAIN',
    });
  }
}

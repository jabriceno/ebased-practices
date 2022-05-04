const dynamo = require("ebased/service/storage/dynamo");
const CARDS_TABLE = process.env.CARDS_TABLE;

const createCard = async (card) => {
  return await dynamo.putItem({
    TableName: CARDS_TABLE,
    Item: card,
  });
};

module.exports = { createCard };

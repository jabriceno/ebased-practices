const dynamo = require("ebased/service/storage/dynamo");
const GIFTS_TABLE = process.env.GIFTS_TABLE;

const getGift = async (dni) => {
  const { Item } = await dynamo.getItem({
    TableName: GIFTS_TABLE,
    Key: { dni: dni },
  });Í
  return Item;
};

const createGift = async (gift) => {
  return await dynamo.putItem({
    TableName: GIFTS_TABLE,
    Item: gift,
  });
};

module.exports = { getGift, createGift };

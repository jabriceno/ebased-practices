const dynamo = require('ebased/service/storage/dynamo');
const CLIENTS_TABLE = process.env.CLIENTS_TABLE;

const createClient = async (client) => {
  return await dynamo.putItem({
    TableName: CLIENTS_TABLE,
    Item: client,
  });
};

module.exports = {createClient};

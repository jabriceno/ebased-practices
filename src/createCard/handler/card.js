const { batchEventMapper } = require("ebased/handler");
const inputMode = require("ebased/handler/input/batchEventQueue");
const outputMode = require("ebased/handler/output/batchEventConfirmation");

const createCardDomain = require("../domain/createCard");

module.exports.handler = async (events, context) => {
  return batchEventMapper(
    { events, context },
    inputMode,
    createCardDomain,
    outputMode
  );
};

// 'use strict';

// const AWS = require('aws-sdk');
// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// module.exports.create = async (event) => {

//   try {
//     console.log(event);
//     // const body = event.Records[0].body;
//     // console.log("text: ",JSON.parse(body));

//     // const { dni, name, lastName } = JSON.parse(body)

//     // // logica de creacion de la tarjeta
//     // const cardInfo = {
//     //   dni,
//     //   number: "66020919388101177",
//     //   valid: "01/28",
//     //   secret: "660"
//     // }

//     // const newCardInfo = {
//     //   TableName: process.env.CARDS_TABLE,
//     //   Item: {...cardInfo},
//     // };

//     // // move to a service and import
//     // await dynamoDb.put(newCardInfo).promise().catch(e => console.log(e.message));
//   } catch (error) {
//     console.error(error);
//   }
// };

// const twilio = require('twilio');
require('dotenv').config()


const handler = async (event) => {
  try {
    const to = event.queryStringParameters.to;
    const text = event.queryStringParameters.text;

    const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const response = await twilio.messages.create({
      body: text,
      from: "Storedash",
      to,
      messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
    });

    if (response.sid) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "SMS Sent",
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: response.errorMessage,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

const twilio = require("twilio");

const { TWILLIO_ACCOUNT_SID, TWILLIO_TOKEN } = process.env;
const client = twilio(TWILLIO_ACCOUNT_SID, TWILLIO_TOKEN);

async function sendWhatsAppMessage(errorMessage) {
  client.messages
    .create({
      body: `${errorMessage}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+923339679626",
    })
    .then((message) => console.log(`WhatsApp message sent: ${message.sid}`))
    .catch((err) => console.error(err));
}

// // Example usage: Call sendWhatsAppMessage() on server crash
// process.on('uncaughtException', (err) => {
//   console.error('Server crashed due to an uncaught exception:', err);
//   sendWhatsAppMessage(err.message); // Send WhatsApp alert with the error message
//   process.exit(1); // Optionally, exit the process
// });

module.exports = { sendWhatsAppMessage };

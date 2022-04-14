const { createTransport } = require('nodemailer');

const transporter = createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
        clientId: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        refreshToken: process.env.AUTH_REFRESH_TOKEN,
    },
});

function getMailOptions(recipientEmail, subject, content) {
    return {
        from: process.env.AUTH_USER,
        to: recipientEmail,
        subject: subject,
        html: content,
    };
}

module.exports = { transporter, getMailOptions };

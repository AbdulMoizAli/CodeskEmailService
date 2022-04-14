const express = require('express');
const { transporter, getMailOptions } = require('./config/transport');

const app = express();

app.get('/', (req, res) => {
    res.send('<center><h1>Codesk RESTful Email Service</h1></center>');
});

app.get('/sendEmail', async (req, res) => {
    try {
        await transporter.sendMail(getMailOptions());
        res.status(200).json({ message: 'Email Sent Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server running...'));

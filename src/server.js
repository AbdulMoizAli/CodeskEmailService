const express = require('express');
const { transporter, getMailOptions } = require('./config/transport');
const {
    getEmailTemplate,
    emailTemplateMapping,
} = require('./config/emailTemplate');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<center><h1>Codesk RESTful Email Service</h1></center>');
});

app.post('/api/sendEmail', async (req, res) => {
    try {
        const templatePath = emailTemplateMapping[req.body.type].templatePath;

        const content = await getEmailTemplate(templatePath, req.body.link);

        await transporter.sendMail(
            getMailOptions(
                req.body.email,
                emailTemplateMapping[req.body.type].subject,
                content
            )
        );

        res.status(200).json({ message: 'Email Sent Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server running...'));

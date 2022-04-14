const fs = require('fs');
const path = require('path');

async function getEmailTemplate(templatePath, link) {
    const content = await fs.promises.readFile(templatePath);
    const result = content.toString().replace(/@Model.Link/g, link);
    return result;
}

const emailTemplateMapping = {
    confirmation: {
        subject: 'Email Confirmation - Codesk',
        templatePath: './src/emailTemplates/emailConfirmation.html',
    },
    reset: {
        subject: 'Password Reset - Codesk',
        templatePath: './src/emailTemplates/passwordReset.html',
    },
};

module.exports = { getEmailTemplate, emailTemplateMapping };

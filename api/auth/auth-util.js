const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendHelp = (userInNeed, userName, berry) => {
  const msg = {
    to: userInNeed,
    from: "alluvia.app@outlook.com",
    subject: "Copy that...Team Alluvia Over...",
    text: "Verification",
    templateId: process.env.EMAIL_TEMPLATE,
    dynamic_template_data: {
      firstName: userName,
      unique_key: berry,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendHelp,
};

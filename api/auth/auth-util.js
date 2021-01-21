const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendHelp = (userInNeed) => {
  const msg = {
    to: userInNeed, // Change to your recipient
    from: "alluvia.app@outlook.com", // Change to your verified sender
    subject: "Copy that..Team Alluvia",
    text: "verification code will come.",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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

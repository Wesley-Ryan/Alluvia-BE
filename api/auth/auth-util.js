const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendHelp = (userInNeed, berry) => {
  const msg = {
    to: userInNeed, // Change to your recipient
    from: "alluvia.app@outlook.com", // Change to your verified sender
    subject: "Copy that...Team Alluvia Over...",
    text: "Verification",
    html: `<strong>${berry} </strong>`,
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

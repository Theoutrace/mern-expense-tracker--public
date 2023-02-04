const User = require("../models/user");
const SendGrid = require("@sendgrid/mail");
require("dotenv").config();

exports.postForgotPassword = async (req, res, next) => {
  try {
    const emailApi = process.env.EMAIL_SERVICE_KEY;
    const { email } = req.body;
    const user = await User.findAll({ where: { email: email } });
    if (user.length > 0) {
      SendGrid.setApiKey(emailApi);
      const msg = {
        to: email, // Change to your recipient
        from: "prakashkumar.imw@gmail.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };

      SendGrid.send(msg)
        .then(() => {
          return res.status(200).json({
            message:
              "A link to generate password has been sent to the provided mail id, Kindly check",
          });
        })
        .catch((error) => {
          console.log("Issue number 01 here: ", error);
        });
    } else {
      res.status(400).json({
        message:
          "We didn't find any associated account, please check the provided mail id!",
      });
    }
  } catch (error) {}
};

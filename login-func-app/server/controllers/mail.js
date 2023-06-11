import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

let nodeconfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD,
  }, // generated ethereal password
};
let transporter = nodemailer.createTransport(nodeconfig);

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  let email = {
    body: {
      name: username,
      intro: text || 'Welcome to Logit',
      outro: 'Need more help contact me',
    },
  };

  let emailbody = MailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || 'SignUp Successfull',
    html: emailbody,
  };
  try {
    await transporter.sendMail(message);
    return res
      .status(200)
      .send({ msg: 'You should receive an email from us.' });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

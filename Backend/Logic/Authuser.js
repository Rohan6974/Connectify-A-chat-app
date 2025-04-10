const nodemailer = require("nodemailer");

const Authuser = async (req, res) => {
  const {email} = req.body
const otp = Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "connectify83@gmail.com",
    pass: "scpf qqis epde bidf",
  },
});

async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"connectify" <connectify83@gmail.com>',
    to: `${email}`,
    subject: `your verification code ${otp}`, 
    text: `your verification code ${otp}`,
  });
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
main().catch(console.error);
res.json({otp})

}

module.exports = Authuser;
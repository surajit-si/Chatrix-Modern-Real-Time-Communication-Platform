import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMail = async (to, sub, html) => {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: html,
  });
};

export { sendMail };

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "vinaykanna367@gmail.com",
    pass: "ushd fkor ngng rvnw",
  },
});

export { transporter };

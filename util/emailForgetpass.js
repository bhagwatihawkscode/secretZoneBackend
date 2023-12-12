import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "SecretZone.Team@gmail.com",
    pass: process.env.pass,
  },
});

const sendPasswordResetEmail = (to, token) => {
  const uniqueLink = ` http://localhost:3000/reset-password/${token} `;
  const mailOptions = {
    attachDataUrls: true,
    encoding: "base64",

    to,
    subject: "Password Reset Email",
    html: `
    <html>
      <head>
      <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      header {
        text-align: center;
        margin-bottom: 20px;
        padding: 20px;
        background-color: rgba(199, 157, 21, 0.3); /* Updated background color */
        border-radius: 10px; /* Added border-radius */
      }

      header img {
        max-width: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #c79d15;
      }

      h2 {
        color: #333;
      }

      p {
        color: #666;
        line-height: 1.6;
      }

      .content {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin-top: 20px;
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
      }

      footer {
        text-align: center;
        color: #888;
        margin-top: 20px;
      }
    </style>
      </head>
      <body>
      <div class="container">
      <header>
      <img src="https://res.cloudinary.com/dsvlrlr51/image/upload/v1700462488/lsscgyzcwcfbz0wecypp.png" alt="Secret Zone Logo" />
      <h1>Hello! &#128515;</h1>
      <p><strong><i>Password Reset Mail</i></strong></p>
    </header>
  
      <div class="content">
        <h2Click the following link to reset your password :</h2>
        <a href="${uniqueLink}">${uniqueLink}</a>
        <p>This Link Valid For Only 10 min</p>
           
  </div>
  <footer>
  <p>Best regards,<br>Secret Zone Team</p>
</footer>
</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendPasswordResetEmail;

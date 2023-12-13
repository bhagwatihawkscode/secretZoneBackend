import FileCollection from "../Model/FileModal.js";
import axios from "axios";
import JSZip from "jszip";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../Model/userModel.js";

dotenv.config();

const MailShareZip = async (req, res) => {
  try {
    let nameuser = await User.findById(global.user_id);
    let name = nameuser.name;
    const emaildata = req.body.querystring;
    let reciver = emaildata.email;
    let senddataId = emaildata.childId;

    const files = await FileCollection.findById(senddataId);

    // Use the existing zip file path and name from the database

    const FileName = files.FileName;
    const megaLink = files.megaLink;

    // Make a request to Mega to get the file content
    // const megaFileResponse = await axios.get(megaLink, {
    //   responseType: "arraybuffer",
    // });

    // // Check if the response data is empty or corrupted
    // if (!megaFileResponse.data || megaFileResponse.data.byteLength === 0) {
    //   throw new Error("Empty or corrupted Mega file");
    // }

    // // Create a ZIP archive using jszip
    // const zip = new JSZip();
    // zip.file(files.FileName, megaFileResponse.data);

    // // Generate the ZIP file as a Buffer
    // const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "SecretZone.Team@gmail.com",
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      to: reciver,
      subject: ` Secret Files from ${name}`,
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
        <p><strong><i>${name} wants to share a secret Files with you.</i></strong></p>
      </header>
    
      <div class="content">
      <h2>Title: ${files.Title}</h2>
      <p>Content: ${FileName} </p>
      <p>Download Link: <a href="${megaLink}">${megaLink}</a></p>
    </div>
          <footer>
          <p>Best regards,<br>Secret Zone Team</p>
        </footer>
        </body>
      </html>
    `,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    res.json({ message: "Email sent successfully", statusCode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default MailShareZip;

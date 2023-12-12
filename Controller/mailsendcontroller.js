import TodoCollection from "../Model/TodoModel.js";
import User from "../Model/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// function extractImageData(inputString) {
//   const imgTagRegex = /<img.*?src=["'](data:image\/\w+;base64,.*?)["'].*?>/g;
//   const match = imgTagRegex.exec(inputString);

//   if (match && match[1]) {
//     const imageData = match[1];

//     // Remove the matched <img> tag from the input string
//     const stringWithoutImgTag = inputString.replace(match[0], "");

//     return { image: imageData, stringWithoutImgTag };
//   } else {
//     console.error("Base64 image data not found in the input string.");
//     return null;
//   }
// }

const sendmail = async (req, res) => {
  try {
    const obj = req.body;
    const dataobj = obj.querystring;
    let useraccess = "";
    if (dataobj.accessuser !== "") {
      const user = await User.findById(dataobj.accessuser);
      useraccess = user.token;
    }

    // Find the secret in the database by its ID and update it
    const secret = await TodoCollection.findByIdAndUpdate(
      dataobj.id, // Assuming 'id' is the field in dataobj that contains the document ID
      {
        $set: {
          permission: dataobj.permission,
          accessuser: useraccess,
        },
      }, // Specify the fields you want to update
      { new: true } // This option returns the modified document
    );

    if (!secret) {
      return res.status(404).json({ error: "Secret not found" });
    }

    // Generate a unique link with the updated document's data
    const uniqueLink = `${process.env.baseUrl}/${secret._id}`;
    let reciver = dataobj.email;
    let nameuser = await User.findById(global.user_id);

    let name = nameuser.name;

    // let result = extractImageData(HtmlData.Content);
    // console.log(image);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "SecretZone.Team@gmail.com",
        pass: process.env.pass,
      },
    });

    // Update mailOptions to include the base64 image as an attachment
    const mailOptions = {
      attachDataUrls: true,
      encoding: "base64",
      to: reciver,
      subject: ` Secret from  ${name}`,

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
        <p><strong><i>${name} wants to share a secret with you.</i></strong></p>
      </header>
    
        <div class="content">
          <h2>Check On Secret Zone Using This Link</h2>
    `,
    };

    // if (result) {
    //   const { image, stringWithoutImgTag } = result;
    //   mailOptions.html += `<p>Content: ${stringWithoutImgTag}</p>`;

    //   mailOptions.attachments = [
    //     {
    //       filename: "image.png",
    //       encoding: "base64",
    //       content: image.split(";base64,").pop(),
    //     },
    //   ];
    // } else {
    mailOptions.html += `<a href="${uniqueLink}">${uniqueLink}</a>`;
    // }

    // Add the signature
    mailOptions.html += `
           
          </div>
          <footer>
          <p>Best regards,<br>Secret Zone Team</p>
        </footer>
        </body>
      </html>
    `;

    const info = await transporter.sendMail(mailOptions);

    if (info) {
      res.send({
        statusCode: 200,

        message: "Mail Send Successfully",
      });
    } else {
      res.send({ message: "Not Sent" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default sendmail;

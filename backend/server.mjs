import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import jokes from "daddy-jokes";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from "console";
import handlebars from "handlebars"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const joke=require("gpt-joke-generator");
dotenv.config({ path: __dirname + '/.env' });

const OAuth2 = google.auth.OAuth2;
// joke.generate({
//     apiKey: process.env.API_KEY,
//     keyword: process.env.keyword,
// })
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
const app = express();
app.use(express.json());  
app.use(cors({
    origin: "http://localhost:5173"
}));

const port = process.env.PORT || 3000;

// Creating a transporter
const createTransporter = async () => {
    try {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });
        const accessToken = await oauth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.MAIL_USERNAME,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token
            }
        });
        return transporter;
    } catch (error) {
        console.log("Error creating transporter:", error);
        throw error;
    }
};
const template=handlebars.compile('<p>{{content}}</p>');
const context={
    content:jokes()
};
const output=template(context);

const sendMail = async (to, subject, text) => {
    try {
        const content=jokes();
        const template=handlebars.compile('<p>{{content}}</p>');
        const context={
            content:content
        }
        const output=template(context);
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: to,
            subject: subject,
            html:output
        };
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.post("/", async (req, res) => {
    try {
        console.log("request received");
        const to=req.body.to;
        const subject=req.body.subject;
        await sendMail(to ,subject);
        console.log("mail sent!");
        res.status(200).json({"Message": "Email sent successfully!"})
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({"Message": "Error sending the mail", "Error": error.message})
    }
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
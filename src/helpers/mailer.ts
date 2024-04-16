import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs"
import { use } from 'react';

export const sendMail = async ({ email, emailtype, userid }:any) => {
    try {
        console.log(userid);
        const hashToken = await bcrypt.hash(userid.toString(),10);
        if(emailtype === "VERIFY") {
            console.log("verify section");
            const update=await User.findByIdAndUpdate(userid,
                {verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000},
                {new:true}); 
            console.log("update",update);
        }else if(emailtype === 'RESET') {
            await User.findByIdAndUpdate(userid, {
                $set:{
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry:Date.now()+3600000
                }
            });
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d1bb3f5bc4f4db",
              pass: "b453da127c0d41"
            }
          });
        const mailOptions = {
            from: 'pranay@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailtype === 'VERIFY' ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD", // Subject line
            html: `<p><a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">Click Here</a> to ${emailtype==='VERIFY' ? "Verify your Email":"Reset your Password"} or copy and paste link below in your browser <br/>
            ${process.env.DOMAIN}/verifyemail?token=${hashToken}
            </p>`, // html body
        }
        const mailResponse= await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
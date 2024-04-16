import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel.js';
import { NextRequest,NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import { sendMail } from "@/helpers/mailer"



export async function POST(request: NextRequest){
    await connect();
    try {
        const reqbody = await request.json();
        const {username, password,email} = reqbody;
        console.log(reqbody);
        const user = await User.findOne({username});
        if(user){
            return NextResponse.json({message: "User already exists"},{status: 400})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const saveUser= await newUser.save();
        console.log(saveUser);
        //send verification mail
        await sendMail({email,emailtype:"VERIFY", userid:saveUser._id});
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            data: saveUser
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}
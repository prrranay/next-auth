import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel.js';
import bcrypt from "bcryptjs"
import { NextRequest,NextResponse} from "next/server"
import jwt from "jsonwebtoken"


export async function POST(request: NextRequest){
    await connect();
    try {
        const reqbody = await request.json();
        const {password,email} = reqbody;
        console.log(reqbody);
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User doesnt exist"},{status: 500})
        }
        console.log(user);
        const validPass=await bcrypt.compare(password, user.password);
        if(!validPass){
            return NextResponse.json({error: "Invalid password"},{status: 500})
        }
        const tokendata={
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token=await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{ expiresIn: '1d' })

        const response=NextResponse.json({message:"user logged in successfully",succes:true})
        response.cookies.set("token",token,{httpOnly:true})
        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
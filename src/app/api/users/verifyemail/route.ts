import {connect} from "@/dbConfig/dbConfig"
import { verify } from "crypto";
import { NextRequest,NextResponse} from "next/server"
import User from '@/models/userModel.js';

export async function POST(request: NextRequest){
    await connect();
    try {
        const reqbody = await request.json();
        const {token}=reqbody;
        console.log(token);

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
        if(!user){
            return NextResponse.json({message: "Invalid token",success:true},{status: 400})
        }
        console.log(user);
        user.isVerfied=true;//todo:spell change isVerfied to isVerified
        user.verifyToken=null;
        user.verifyTokenExpiry=null;
        await user.save();
        return NextResponse.json({message: "Email verified"},{status: 200})
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}
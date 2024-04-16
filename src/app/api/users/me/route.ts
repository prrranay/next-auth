import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel.js';
import { NextRequest,NextResponse} from "next/server"
import {getDataFromToken} from "@/helpers/getDataFromToken"


export async function POST(request: NextRequest){
    await connect();
    // extract data from token
    const userid= await getDataFromToken(request);
    console.log(userid);
    const user = await User.findOne({_id:userid}).select("-password");
    console.log('user:',user);
    if(!user){
        return NextResponse.json({error: "User doesnt exist"},{status: 500})
    }
    return NextResponse.json({
        message: "User found",
        success: true,
        data: user
    })
}
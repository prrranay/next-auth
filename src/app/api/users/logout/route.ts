import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse} from "next/server"


export async function GET(request: NextRequest){
    await connect();
    try {
        const response = NextResponse.json({
            message: "user logged out successfully",
            success: true,
        })
        response.cookies.set("token", "",{
            expires: new Date(0),
            httpOnly: true,
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
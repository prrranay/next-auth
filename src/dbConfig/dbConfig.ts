import mongoose from "mongoose";


export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
        const connection = mongoose.connection;
        connection.on("connected", () =>{
            console.log('connected to MongoDB');
        })
        connection.on("error", (err) => {
            console.log("connection error: " + err);
        })
    }catch(e) {
        console.log("something went wrong while connecting to MongoDB")
        console.log(e)
    }
}
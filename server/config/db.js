import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Connected to database ${conn.connection.host}`.bgYellow.black);
    } catch (error) {
        console.log(`Error in connecting database ${error}`.bgRed.black)
    }
};

export default connectDB;
import mongoose from "mongoose";
import config from "../configs";
const DB_URL = config.MONGOURL;

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    return handler(req, res);
};

export default connectDB;

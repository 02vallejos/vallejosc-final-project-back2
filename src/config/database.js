import mongoose from "mongoose";
import { config } from "./config.js";

const mongoIrl = config.MONGO_URL;

mongoose.connect(mongoIrl)
.then((result) => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error("Error connecting to DB", err);
});

// dbConnect.helper.js
import { connect } from "mongoose";

const dbConnect = async (link) => {
  try {
    await connect(link);
    console.log("connect to Mongo db");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
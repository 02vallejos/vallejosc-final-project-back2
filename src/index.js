import express from "express";
import __dirname from "./utils.js";
// import "./config/database.js";
import env from "./helpers/env.helper.js";
import path from "path";
// import { config } from "./config/config.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import pathHandler from "./middlewares/pathHandler.mid.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import indexRouter from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
// import session from "express-session";
// import MongoStore from "connect-mongo";
import argvsHelper from "./helpers/argvs.helper.js";
import dbConnect from "./helpers/dbConnect.helper.js";

// SERVER
const server = express();
const PORT = env.PORT;
const ready = async () => {
  console.log(`Listennig to port ${PORT} and mode: ${argvsHelper.mode}`);
  if(env.PERSISTENCE === "mongo") {
    await dbConnect(env.MONGO_URL);
  }
};
//LISTENER
server.listen(PORT, ready);

// MIDDLEWARE
server.use(cookieParser(env.SECRET_COOKIE));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "..", "public")));
server.use(morgan("dev"));

//MIDDLEWARE SESSION
// server.use(session({
//     secret: env.SECRET_SESSION,
//     resave: true,
//     saveUninitialized: true,
//     /*cookie: { maxAge: 7 * 24 * 60 * 60 * 1000}*/
//     cookie: { maxAge: 60 * 1000},
//     store: new MongoStore({
//         mongoUrl: env.MONGO_URL,
//         collectionName: "session"
//     })
// }))

// ENGINE SETTINGS
server.engine(
  "handlebars",
  engine({
    helpers: {
      eq: (a, b) => a === b,
    },
  })
);
server.set("view engine", "handlebars");
// server.set('views', __dirname + 'src/views');
server.set("views", path.join(__dirname, "views"));

// ROUTER
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

// console.log(listEndpoints(app));


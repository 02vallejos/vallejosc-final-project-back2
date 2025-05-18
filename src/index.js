import express from "express";
import __dirname from "./utils.js";
import "./config/database.js";
import path from "path";
import { config } from "./config/config.js";
import morgan from 'morgan';
import { engine } from "express-handlebars";
import pathHandler from "./middlewares/pathHandler.mid.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import indexRouter from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"

// SERVER
const server = express();
const PORT = config.PORT;

// MIDDLEWARE
server.use(cookieParser(config.SECRET_COOKIE));
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname,"..", "public")));
server.use(morgan("dev"));

//MIDDLEWARE SESSION
server.use(session({
    secret: config.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    /*cookie: { maxAge: 7 * 24 * 60 * 60 * 1000}*/
    cookie: { maxAge: 60 * 1000},
    store: new MongoStore({
        mongoUrl: config.MONGO_URL,
        collectionName: "session"
    })
}))

// ENGINE SETTINGS
server.engine('handlebars', engine({
    helpers: {
        eq: (a, b) => a === b
    }
}));
server.set('view engine', 'handlebars');
// server.set('views', __dirname + 'src/views');
server.set('views', path.join(__dirname, 'views'));

// ROUTER
server.use("/", indexRouter)
server.use(errorHandler);   
server.use(pathHandler);


// console.log(listEndpoints(app));
//LISTENER
server.listen(PORT, () => {
    console.log(`Listennig to port ${PORT}`);
});
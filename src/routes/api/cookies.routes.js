import { Router } from "express";
import { createCb, createSignedCb, readCb, readSignedCb, clearCb } from "../../controllers/cookies.controller.js";

const cookieRouter = Router ();

cookieRouter.get("/create", createCb)
cookieRouter.get("/create-signed", createSignedCb);
cookieRouter.get("/read", readCb);
cookieRouter.get("/read-signed", readSignedCb);
cookieRouter.get("/clear", clearCb);
cookieRouter.get("/read-signed", readSignedCb);



export default cookieRouter
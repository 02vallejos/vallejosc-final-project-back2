import { Router } from "express";
// import { createCb, createSignedCb, readCb, readSignedCb, clearCb } from "../../controllers/cookies.controller.js";
import cookiesController from "../../controllers/cookies.controller.js"

const cookieRouter = Router ();

cookieRouter.get("/create", cookiesController.createCb)
cookieRouter.get("/create-signed", cookiesController.createSignedCb);
cookieRouter.get("/read", cookiesController.readCb);
cookieRouter.get("/read-signed", cookiesController.readSignedCb);
cookieRouter.get("/clear", cookiesController.clearCb);
cookieRouter.get("/read-signed", cookiesController.readSignedCb);

export default cookieRouter
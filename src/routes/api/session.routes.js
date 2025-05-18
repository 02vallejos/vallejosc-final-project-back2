import { Router } from "express";
import { createCb, destroyCb, readCb } from "../../controllers/session.controller.js";

const sessionRouter = Router ();

sessionRouter.get("/create", createCb);
sessionRouter.get("/read", readCb);
sessionRouter.get("/destroy", destroyCb);

export default sessionRouter;
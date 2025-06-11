//session.routes.js

import { Router } from "express";
// import { createCb, destroyCb, readCb } from "../../controllers/sessions.controller.js";
import SessionsController from "../../controllers/sessions.controller.js"

const sessionRouter = Router ();

sessionRouter.get("/create", SessionsController.createCb);
sessionRouter.get("/read", SessionsController.readCb);
sessionRouter.get("/destroy", SessionsController.destroyCb);

export default sessionRouter;
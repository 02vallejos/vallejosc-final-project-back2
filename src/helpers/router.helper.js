import { Router } from "express"
import setupResponses from "../middlewares/setupResponses.mid.js";
import setupPolicies from "../middlewares/setupPolicies.mid.js"

class RouterHelper {
    constructor() {
        this.router = Router();
        this.use(setupResponses);
    };
    getRouter = () => this.router;
    applyMiddlewares = (middlewares) => middlewares.map(
        (mid) => async (req, res, next) => {
            try {
                await mid(req, res, next);
            } catch (error) {
                next(error);
            };
        });

    apllyMiddlewareToRender = (middlewares) => middlewares.map(
        (mid) => async (req, res, next) => {
            try {
                await mid(req, res, next);
            } catch (error) {
                res.status(error.statusCode || 500).render("error", { error })
            };
        });

    create = (path, policies, ...middlewares) =>
        this.router.post(
            path,
            setupPolicies(policies),
            this.applyMiddlewares(middlewares)
        );
    read = (path, policies, ...middlewares) =>
        this.router.get(
            path,
            setupPolicies(policies),
            this.applyMiddlewares(middlewares)
        );
    update = (path, policies, ...middlewares) =>
        this.router.put(
            path,
            setupPolicies(policies),
            this.applyMiddlewares(middlewares)
        );
    destroy = (path, policies, ...middlewares) =>
        this.router.delete(
            path,
            setupPolicies(policies),
            this.applyMiddlewares(middlewares)
        );
    // 1) Método use sin politicas
    // use = (path, ...middlewares) =>
    //     this.router.use(
    //         path,
    //         this.applyMiddlewares(middlewares)
    //     );       

    // 2) Método con politicas ejemplo de la plataforma
    use = (path, policies, ...middlewares) =>
        this.router.use(
            path,
            setupPolicies(policies),
            this.applyMiddlewares(middlewares)
        );

    // 3) Método de politicas opcionales en las rutas Chatgpt
    // use = (path, policies = [], ...middlewares) => {
    //     if (policies.length > 0) {
    //         console.log("entra e le length");
    //         // console.log(policies);
    //         this.router.use(path, setupPolicies(policies), ...this.applyMiddlewares(middlewares));
    //     } else {
    //         this.router.use(path, ...this.applyMiddlewares(middlewares));
    //     }
    // };



    // render = (path, ...middlewares) =>
    //     this.router.get(
    //         path,
    //         this.apllyMiddlewareToRender(middlewares)
    //     );

    render = (path, policies, ...middlewares) =>
        this.router.get(
            path,
            setupPolicies(policies),
            this.apllyMiddlewareToRender(middlewares)
        );
};

export default RouterHelper; 

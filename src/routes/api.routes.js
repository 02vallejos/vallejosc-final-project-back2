import productsRouter from "./api/products.routes.js";
import cartsRouter from "./api/carts.routes.js";
import usersRouter from "./api/users.routes.js";
import cookieRouter from "./api/cookies.routes.js"
import sessionRouter from "./api/session.routes.js"
import authRouter from "./api/auth.routes.js";
import RouterHelper from "../helpers/router.helper.js";

class ApiRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.use("/products", ["PUBLIC"], productsRouter);
        this.use("/carts", ["PUBLIC"], cartsRouter);
        this.use("/users", ["PUBLIC"], usersRouter);
        this.use("/cookies", ["PUBLIC"], cookieRouter);
        this.use("/session", ["PUBLIC"], sessionRouter);
        this.use("/auth", ["PUBLIC"], authRouter);
    }
};

const apiRouter = new ApiRouter().getRouter();
export default apiRouter;
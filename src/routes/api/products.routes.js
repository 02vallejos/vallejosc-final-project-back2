import { createOne, readAll, readById, updateById, destroyById } from "../../controllers/products.controller.js";
import passport from "../../middlewares/passport.mid.js";
import RouterHelper from "../../helpers/router.helper.js";

class ProductsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        // const optsForbidden = {
        //     session: false,
        //     failureRedirect: "/api/auth/forbidden"
        // };

        // this.create("/", passport.authenticate("admin", optsForbidden), createOne);
        // this.read("/", readAll);
        // this.read("/:id", readById);
        // this.update("/:id", passport.authenticate("admin", optsForbidden), updateById);
        // this.destroy("/:id", passport.authenticate("admin", optsForbidden), destroyById);

        this.create("/", ["ADMIN"], createOne);
        this.read("/", ["PUBLIC"], readAll);
        this.read("/:id", ["PUBLIC"], readById);
        this.update("/:id", ["ADMIN"], updateById);
        this.destroy("/:id", ["ADMIN"], destroyById);
    };
};

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;
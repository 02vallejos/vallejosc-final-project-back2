import RouterHelper from "../../helpers/router.helper.js";

class CartsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.create("/", ["ADMIN"], )
    }
}

const cartsRouter = (new CartsRouter()).getRouter();
export default cartsRouter;
import passport from "../../middlewares/passport.mid.js";
import { updateUserCb } from "../../controllers/user.controller.js" 
import RouterHelper from "../../helpers/router.helper.js";

class UserRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.update("/", passport.authenticate("user", { session: false }), updateUserCb);
    }
};

const usersRouter = new UserRouter().getRouter();
export default usersRouter;
import { detailView, indexView, loginView, profileView, registerView, updateUSerView } from "../controllers/views.controller.js";
import passport from "../middlewares/passport.mid.js"
import RouterHelper from "../helpers/router.helper.js";

class ViewsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.render("/", indexView);
        this.render("/register", registerView);
        this.render("/login", loginView);
        this.render("/details/:pid", detailView);
        this.render("/profile", passport.authenticate("user", { session: false }), profileView);
        this.render("/update-user", updateUSerView);
    }
};

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;
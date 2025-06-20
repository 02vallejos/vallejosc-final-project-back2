// views.routes.js

import viewsController from "../controllers/views.controller.js";
import passport from "../middlewares/passport.mid.js";
import RouterHelper from "../helpers/router.helper.js";

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", ["PUBLIC"], viewsController.indexView);
    this.render("/user/register", ["PUBLIC"], viewsController.registerView);
    this.render("/user/login", ["PUBLIC"], viewsController.loginView);
    this.render(
      "/user/profile",
      ["USER", "ADMIN"],
      passport.authenticate("user", { session: false }),
      viewsController.profileView
    );
    this.render(
      "/user/update-user",
      ["USER", "ADMIN"],
      viewsController.updateUSerView
    );
    this.render("/auth/verify/:email", ["PUBLIC"], viewsController.verifyView);
    this.render("/auth/reset/:email", ["PUBLIC"], viewsController.resetView);
    this.render(
      "/auth/recover",
      ["PUBLIC"],
      viewsController.forgotPasswordView
    );
    this.render(
      "/product/details/:pid",
      ["PUBLIC"],
      viewsController.detailView
    );
    this.render(
      "/product/add-product",
      ["ADMIN"],
      viewsController.addProductView
    );
    this.render(
      "/product/update-product/:id",
      ["ADMIN"],
      viewsController.updateProdcutView
    );
    this.render("/cart/cart", ["USER", "ADMIN"], viewsController.cartView);
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;

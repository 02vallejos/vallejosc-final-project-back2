// view.constrollers.js

import { cartsService, productsService } from "../services/service.js";

class ViewsController {
  indexView = async (req, res) => {
    const products = await productsService.readAll();
    res.status(200).render("index", { products });
  };
  registerView = async (req, res) => {
    res.status(200).render("user/register");
  };
  loginView = async (req, res) => {
    res.status(200).render("user/login");
  };
  detailView = async (req, res) => {
    const { pid } = req.params;
    const user = req.user
    console.log(user);
    const product = await productsService.readById(pid);
    res.status(200).render("product/details", { product });
  };
  profileView = async (req, res) => {
    const { user } = req;
    res.status(200).render("user/profile", { user });
  };
  updateUSerView = async (req, res) => {
    const { user } = req;
    res.status(200).render("user/update-user", { user });
  };
  verifyView = async (req, res) => {
    const { email } = req.params;
    res.status(200).render("auth/verify", { email });
  };
  resetView = async (req, res) => {
    const { email } = req.params;
    res.status(200).render("auth/reset", { email });
  };
 forgotPasswordView = async (req, res) => {
    const { email } = req.params;
    res.status(200).render("auth/recover", { email });
  };
  addProductView = async (req, res) => {
    res.status(200).render("product/add-product");
  };
  updateProdcutView = async (req, res) => {
    const { id } = req.params;
    res.status(200).render("product/update-product", { id });
  };
  cartView = async (req, res) => {
    const user = req.user;
    const cartItems = cartsService.readBy({
      user_id: user.user_id,
      state: "reserved"
    });

    console.log(cartItems);

    res.status(200).render("cart/cart", { user });
  }
}

const viewsController = new ViewsController();
export default viewsController;


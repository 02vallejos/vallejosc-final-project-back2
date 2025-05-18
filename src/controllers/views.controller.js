import { productManager } from "../managers/mongo/manager.mongo.js"

export const indexView = async (req, res) => {
        const products = await productManager.readAll();
        res.status(200).render("index", { products });
};

export const registerView = async (req, res) => {
        res.status(200).render("register");
};

export const loginView = async (req, res) => {
        res.status(200).render("login");
};

export const detailView = async (req, res) => {
        const { pid } = req.params;
        const product = await productManager.readById(pid);
        res.status(200).render("details", { product });
};

export const profileView = async (req, res) => {
        const { user } = req;
        res.status(200).render("profile", { user });
};

export const updateUSerView = async (req, res) => {
        const { user } = req;
        res.status(200).render("update-user", { user });
};
import { productManager } from "../managers/mongo/manager.mongo.js";

export const createOne = async (req, res, next) => {
        const data = req.body;
        data.owner_id = req.user._id;
        const response = await productManager.createOne(data);
        res.json201(response);
};

export const readAll = async (req, res, next) => {
        const filter = req.query
        const response = await productManager.readAll(filter);
        if (response.length === 0) {
                res.json404()
        }
        res.json200(response);
};

export const readById = async (req, res, next) => {
        const { id } = req.params;
        console.log(`Id is : ${id}`)
        const response = await productManager.readById(id);
        if (!response) {
                res.json404()
        };
         res.json200(response);
};

export const updateById = async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        const response = await productManager.updateById(id, data);
        if (!response) {
             res.json404()
        }
        res.json200(response);
};

export const destroyById = async (req, res, next) => {
        const { id } = req.params;
        console.log(`id : ${id}`);
        const response = await productManager.destroyById(id);
        if (!response) {
                res.json404()
        }
        res.json200(response);
};
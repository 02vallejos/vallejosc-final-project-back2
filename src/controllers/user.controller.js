import { userManager } from "../managers/mongo/manager.mongo.js";

export const updateUserCb = async (req, res, next) => {
        const data = req.body;
        const uid = req.user._id;
        const response = await userManager.updateById(uid, data);
        const { method, originalUrl: url } = req;
        res.status(200).json({ response, method, url })
};

export const registerCb = async (req, res, next) => {
        const { _id } = req.user
        res.json201(_id, "Registered");
};

export const loginCb = async (req, res, next) => {
        const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
        const { _id } = req.user;
        res.cookie("token", req.user.token, opts).json200(_id, "Logged in");
};

export const signoutCb = async (req, res, next) => {
        const { _id } = req;
        res.clearCookie("token").json200(_id, "Signout Ok")
};

export const onlineCb = async (req, res, next) => {
        res.json200(null, "Is Online")
};

export const badAuthCb = async (req, res, next) => {
       res.json401();
};

export const forbiddenCb = async (req, res, next) => {
        res.json403();
};

export const googleCb = async (req, res, next) => {
        res.json403();
};
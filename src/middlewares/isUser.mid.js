const isUser = (req, res, next) => {
    try {
        if(req.session._id) {
            const { use_id, email, role } = req.session; 
            req.user = {  use_id, email, role };
            next()
        } else {
            const error = new Error("Invalid Credential");
            error.statusCode = 401;
            throw error;
        } 
    } catch (error) {
        next(error);
    }
};

export default isUser;
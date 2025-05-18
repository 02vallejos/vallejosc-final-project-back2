import { verifyToken } from "../helpers/token.helper.js";
import { userManager } from "../managers/mongo/manager.mongo.js";

const setupPolicies = (policies) => async (req, res, next) => {
    try {
        
        policies = Array.isArray(policies) ? policies : [];
        console.log(policies);
        if(policies.includes("PUBLIC")) return next();
        const token = req?.cookies?.token; 
        if(!token) return res.json401();
        const data = verifyToken(token);
        const { user_id, email, role } = data;
        if(!user_id || !email || !role) return res.json401();
        const allowedRoles = {
            USER: policies.includes("USER"),
            ADMIN: policies.includes("ADMIN"),
        };  
        if(!allowedRoles[role]) return res.json401();
        const user = await userManager.readById(user_id);
        req.user = user;
        next();   
    } catch (error) {
        next(error);
    };
};

export default setupPolicies;
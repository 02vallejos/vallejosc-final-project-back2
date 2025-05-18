import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const createToken = (data) => {
    try {
        const token = jwt.sign(
            //informacion a tokenizar
            data,
            // clave secreta para encriptar
            config.SECRET_KEY,
            // objeto de configuracion de la firma
            { expiresIn: 7 * 24 * 60 * 60}
        );
      return token;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
};

export const verifyToken = (token) => {
    try {
        const data = jwt.verify(
            //token a destokenizar
            token,
            // clave secreta para destokenizar
            config.SECRET_KEY
        );
        return data
    } catch (error) {
        error.statusCode = 403;
        throw error;
    }
};

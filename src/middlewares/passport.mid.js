import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { userManager } from "../managers/mongo/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import "../config/config.js"
import { config } from "../config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const callbackURL = "http://localhost:3000/api/auth/google/redirect";

passport.use(
    // 1re parametro: Nombre de la estrategia de autenticacion/autorización.
    "register",
    // 2do parametro: la estrategia de autenticacion/autorizacion
    new LocalStrategy(
        // 1er parametro: Objeto de configuracion de la estrategia.
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        // 2do parametro: La callback con la logica necesaria para resolver la estrategia.
        async (req, email, password, done) => {
            try {
                const { city } = req.body;
                if (!city) {
                    const error = new Error("Invalid data");
                    error.statusCode = 400;
                    throw error;
                }
                let user = await userManager.readBy({ email })
                //Si lo encuentra no lo deja registrase
                if (user) {
                    // const error = new Error("Invalid credential");
                    // error.statusCode = 401;
                    // throw error;

                    done(null, null, { message: "Invalid Credential", statusCode: 401 })
                }
                req.body.password = createHash(password);
                user = await userManager.createOne(req.body);
                // el primer parametro es el error (si ocurre)
                // el sgundo parámetro son los datos del usuario que se guardan en el objeto req.
                // es decir a partir de que se aplica este middleware: existe req.user
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async (req, email, password, done) => {
            try {
                let user = await userManager.readBy({ email })
                //Si lo encuentra no lo deja registrase
                if (!user) {
                    const error = new Error("Invalid credential");
                    error.statusCode = 401;
                    throw error;
                }
                const verifyPass = compareHash(password, user.password);
                if (!verifyPass) {
                    // const error = new Error("Invalid credential");
                    // error.statusCode = 401;
                    // throw error;

                    done(null, null, { message: "Invalid Credential", statusCode: 401 })
                }
                // Crear el token y enviarlo al cliente
                /*no necesito session porque trabajamos con token*/
                //req.session.role = user.role;
                //req.session._id = user._id;
                //req.session.email = user.email;
                const data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role
                }
                const token = createToken(data);
                console.log(token);
                user.token = token;
                done(null, user)
            } catch (error) {
                done(error);
            }
        },
    )
);

passport.use(
    "user",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: config.SECRET_KEY
        },
        async (data, done) => {
            try {
                const { user_id, email, role, city } = data;
                const user = await userManager.readById({ _id: user_id, email, role });
                if (!user) {
                    // const error = new Error("Forbiden");
                    // error.statusCode = 403;
                    // throw error;

                    done(null, null, { message: "Forbiden", statusCode: 403 })
                };
                done(null, user);
            } catch (error) {
                done(error)
            }
        }
    )
);

passport.use(
    "admin",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: config.SECRET_KEY
        },
        async (data, done) => {
            try {
                console.log("data");
                console.log(data);
                const { user_id, email, role } = data;
                const user = await userManager.readById({ _id: user_id, email, role });
                if (!user || user.role !== "ADMIN") {
                    // const error = new Error("Forbbiden");
                    // error.statusCode = 403;
                    // throw error;

                    done(null, null, { message: "Forbiden", statusCode: 403 })
                };
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "google",
    new GoogleStrategy(
        { clientID: config.GOOGLE_ID, clientSecret: config.GOOGLE_SECRET, callbackURL },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                const { email, name, picture, id } = profile;
                let user = await userManager.readBy({ email: id })
                if (!user) {
                    user = {
                        email: id,
                        name: name.givenName,
                        password: createHash(email),
                        city: "Google"
                    }
                    user = await userManager.createOne(user);
                }
                const data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role
                }
                const token = createToken(data);
                console.log(token);
                user.token = token;

                done(null, done);
            } catch (error) {
                done(error)
            }
        }
    )
);

export default passport;
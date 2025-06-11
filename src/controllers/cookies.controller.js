// cookies.controller.js

class CookiesController {
  createCb = (req, res, next) => {
    try {
      const maxAge = 7 * 24 * 60 * 60 * 1000;
      const response = { messsge: "Cookie due 7 day" };
      return res
        .status(201)
        .cookie("mode", "dark", { maxAge })
        .cookie("role", "admin", { maxAge })
        .json(response);
    } catch (error) {
      next(error);
    }
  };
  createSignedCb = (req, res, next) => {
    try {
      const maxAge = 7 * 24 * 60 * 60 * 1000;
      const messsge = "Cookie due 7 day";
      return res
        .status(201)
        .cookie("user", "kbza", { maxAge, signed: true })
        .cookie("color", "blue", { maxAge, signed: true })
        .json({ messsge });
    } catch (error) {
      next(error);
    }
  };
  readCb = (req, res, next) => {
    try {
      const cookies = req.cookies;
      return res.status(200).json({ cookies });
    } catch (error) {
      next(error);
    }
  };
  readSignedCb = (req, res, next) => {
    try {
      const cookies = req.signedCookies;
      const messsge = "Cookie due 7 day";
      return res.status(200).json({ messsge, cookies });
    } catch (error) {
      next(error);
    }
  };
  clearCb = (req, res, next) => {
    try {
      const messsge = "Cookie deleted";
      return res
        .status(200)
        .clearCookie("mode")
        .clearCookie("color")
        .json({ messsge });
    } catch (error) {
      next(error);
    }
  };
}

const cookiesController = new CookiesController();
export default cookiesController;

// export const createCb = (req, res, next) => {
//     try {
//         const maxAge = 7 * 24 * 60 * 60 * 1000;
//         // const maxAge = 5 * 1000;
//         const response = {messsge: "Cookie due 7 day"};
//         return res
//             .status(201)
//             .cookie("mode", "dark", {maxAge})
//             .cookie("role", "admin", {maxAge})
//             .json(response);

//     } catch (error) {
//         next(error)
//     }
// };

// export const createSignedCb = (req, res, next) => {
//     try {
//         const maxAge = 7 * 24 * 60 * 60 * 1000;
//         // const maxAge = 5 * 1000;
//         const messsge = "Cookie due 7 day";
//         return res
//             .status(201)
//             .cookie("user", "kbza", {maxAge, signed: true})
//             .cookie("color", "blue", {maxAge, signed: true})
//             .json({messsge});

//     } catch (error) {
//         next(error)
//     }
// };

// export const readCb = (req, res, next) => {
//     try {
//         const cookies = req.cookies;
//         return res.status(200).json({cookies});
//     } catch (error) {
//         next(error)
//     }
// };

// export const readSignedCb = (req, res, next) => {
//     try {
//         const cookies = req.signedCookies;
//         const messsge = "Cookie due 7 day";
//         return res.status(200).json({messsge, cookies});

//     } catch (error) {
//         next(error)
//     }
// };

// export const clearCb = (req, res, next) => {
//     try {
//         const messsge = "Cookie deleted";
//         return res
//         .status(200)
//         .clearCookie("mode")
//         .clearCookie("color")
//         .json({messsge});
//     } catch (error) {
//         next(error)
//     }
// };

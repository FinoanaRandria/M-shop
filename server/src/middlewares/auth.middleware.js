const jwt = require("jsonwebtoken");

const { getUserById } = require("../controllers/auth.controllers.js");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization /*&& 
    req.headers.authorization.startsWith("Bearer") */
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.jwtkey);
      /* req.user = await User.findById(decoded.id).select("-password"); */
      req.user = decoded.user;

      next();
    } catch (error) {
      res.status(401);
      console.log(error)
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };

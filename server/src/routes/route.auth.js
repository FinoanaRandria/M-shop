const { Router } = require("express");
const router = Router();
const { login,loged,register,getUerRole,getAllUserData,deleteUser,getUserById } = require("../controllers/auth.controllers");
const { protect } = require("../middlewares/auth.middleware");

router.post("/login", login);

router.get("/user", getUserById);

router.post("/register", register);

router.get("/authorization",getUerRole)

router.get("/login",loged)

router.get('/alldata',getAllUserData) /* proteger */

router.delete('/deleteUser/:id',deleteUser )


module.exports = router;

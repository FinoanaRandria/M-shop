const { Router } = require("express");
const router = Router();
const { login,loged,register,getUerRole,getAllUserData,deleteUser } = require("../controllers/auth.controllers");

router.post("/login", login);

router.post("/register", register);

router.get("/authorization",getUerRole)

router.get("/login",loged)

router.get('/alldata',getAllUserData)

router.delete('/deleteUser/:id',deleteUser )


module.exports = router;

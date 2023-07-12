const { Router } = require("express");
const router = Router();
const { protect } = require("../middlewares/auth.middleware");
const { createFavoriteProduct, getFavoriteProduitOfUser } = require("../controllers/favorite.controller");

router.post("/:productId",protect,createFavoriteProduct);

router.get("/",protect,getFavoriteProduitOfUser);





module.exports = router;

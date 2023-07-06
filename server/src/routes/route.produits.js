const Router = require('express')

const router = Router();

const {  porduit} = require('../controllers/produit.controllers')



router.get(porduit)


module.exports = router
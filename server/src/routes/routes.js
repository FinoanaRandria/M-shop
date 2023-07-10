const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const produitController = require('../controllers/ProduitController');


router.route('/produit/getAll').get(produitController.getProduitControllerfn);

router.route('/produit/create').post(upload.single('image'), produitController.createproduitControllerFn);

router.route('/produit/update/:id').patch(produitController.updateproduitController);

router.route('/produit/delete/:id').delete(produitController.deleteproduitController);

module.exports = router;

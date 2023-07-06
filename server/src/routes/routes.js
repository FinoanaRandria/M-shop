const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const userController = require('../controllers/ProduitController');


router.route('/user/getAll').get(userController.getDataConntrollerfn);

router.route('/user/create').post(upload.single('image'), userController.createUserControllerFn);

router.route('/user/update/:id').patch(userController.updateUserController);

router.route('/user/delete/:id').delete(userController.deleteUserController);

module.exports = router;

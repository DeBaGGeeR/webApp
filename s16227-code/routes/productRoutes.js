const router  = require("express").Router();
const productCtrl = require('../controller/productCtrl')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

router.route('/products')
    .get(productCtrl.getProduct)
    .post(auth,authAdmin,productCtrl.createProduct)


router.route('/products/:id')
    .put(auth,authAdmin,productCtrl.updateProduct)
    .delete(auth,authAdmin,productCtrl.deleteProduct)

module.exports = router
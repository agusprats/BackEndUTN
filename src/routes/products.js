const router = require('express-promise-router')();

const {
    index,
    newProduct,
    getProduct,
    replaceProduct,
    deleteProduct,
    getProductsDetails,
    newProductDetail
} = require('../controllers/product');

router.get('/', index);
router.post('/', newProduct);
router.get('/:productId', getProduct);
router.put('/:productId', replaceProduct);
router.delete('/:productId', deleteProduct);
router.get('/:productId/details', getProductsDetails);
router.post('/:productId/details', newProductDetail);

module.exports = router; 
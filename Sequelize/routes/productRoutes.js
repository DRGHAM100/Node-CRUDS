const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');

const router = require('express').Router();

router.post('/addProduct', productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)



router.get('/allReviews', reviewController.getAllReviews)
router.post('/addReview/:id', reviewController.addReview)


router.get('/getProductReviews/:id', productController.getProductReviews)


router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router
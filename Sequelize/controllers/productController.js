const db = require('../models');

const Product = db.products;
const Review = db.reviews;

const addProduct = async (req,res) => {
    let info = {
        // image: req.file.path,
        image: '',
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info);

    res.status(201).json({
        msg: 'Product has been create successfully',
        product: product
    });
}

const getAllProducts = async (req,res) => {
    // const products = await Product.findAll({
    //     attributes: [
    //         'title',
    //         'details'
    //     ]
    // });

    const products = await Product.findAll({});

    res.status(200).json({
        msg: 'Products have been fetched successfully',
        products: products
    });
}

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    
    res.status(200).json({
        msg: 'Product has been fetched successfully',
        product: product
    });

}

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).json({
        msg: 'Product has been updated successfully',
        product: product
    });
   
}

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).json({
        msg: 'Product has been deleted successfully'
    });

}

const getPublishedProduct = async (req, res) => {

    const products =  await Product.findAll({ where: { published: true }})

    res.status(200).json({
        msg: 'Published Products has been fetched successfully',
        products: products
    });

}

const getProductReviews =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).json({data: data});

}


module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews
    
}
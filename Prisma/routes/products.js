const router = require('express').Router();
const {PrismaClient, Prisma} = require('@prisma/client')

const prisam = new PrismaClient();

router.get('/products', async (req,res) => {
    try {
        const products = await prisam.product.findMany({
            include: {category: true}
        });
        return res.status(200).json({products});
    } catch (error) {
        return console.log(error);
    }
});

router.get('/products/:id', async (req,res) => {
    const {id} = req.params
    try {
        const product = await prisam.product.findUnique({
            include: {category: true},
            where: {id: Number(id)}
        });
        return res.status(200).json({product});
    } catch (error) {
        return console.log(error);
    }
});

router.post('/products', async (req,res) => {
    const data = req.body;
    try {
        const product = await prisam.product.create({data:data}); 
        return res.status(200).json({product});
    } catch (error) {
        return console.log(error);
    }
});

router.patch('/products/:id', async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const product = await prisam.product.update({
            where: {id: Number(id)},
            data:data,
            include: {category: true}
        });
        return res.status(200).json({product});
    } catch (error) {
        return console.log(error);
    }
});

router.delete('/products/:id', async (req,res) => {
    const {id} = req.params
    try {
        const product = await prisam.product.delete({
            where: {id: Number(id)}
        });
        return res.status(200).json({product});
    } catch (error) {
        return console.log(error);
    }
});

module.exports = router;
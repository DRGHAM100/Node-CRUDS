const router = require('express').Router();
const {PrismaClient, Prisma} = require('@prisma/client')

const prisam = new PrismaClient();

router.get('/categories', async (req,res) => {
    try {
        const categories = await prisam.category.findMany({
            include: {products: true}
        });
        return res.status(200).json({categories});
    } catch (error) {
        return console.log(error);
    }
});

router.get('/categories/:id', async (req,res) => {

});

router.post('/categories', async (req,res) => {
    const data = req.body;
    try {
        const category = await prisam.category.create({data:data}); 
        return res.status(200).json({category});
    } catch (error) {
        return console.log(error);
    }
});

router.patch('/categories/:id', async (req,res) => {
    
});

router.delete('/categories/:id', async (req,res) => {
    
});

module.exports = router;
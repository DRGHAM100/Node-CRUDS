module.exports = (db) => {

    // one to Many Relation
    db.products.hasMany(db.reviews, {
        foreignKey: 'product_id',
        as: 'review'
    })
    
    db.reviews.belongsTo(db.products, {
        foreignKey: 'product_id',
        as: 'product'
    })
    
}
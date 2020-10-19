const db = require("../models");
const Product = db.products;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({message: "Product must have a title"});
        return;
    }
    if (!req.body.brand) {
        res.status(400).send({message: "Product must have a associated brand"});
        return;
    }
    if (!req.body.price) {
        res.status(400).send({message: "Product must have a price"});
        return;
    }
    if (!req.body.image) {
        res.status(400).send({message: "Product must have a associated image"});
        return;
    }
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    /*    switch (!req) {
            case (req.body.title) :
                res.status(400).send({message: "Product must have a title"});
                break;
            case (req.body.brand) :
                res.status(400).send({message: "Product must have a associated brand"});
                break;
            case (req.body.price) :
                res.status(400).send({message: "Product must have a price"});
                break;
            case (req.body.image) :
                res.status(400).send({message: "Product must have a associated image"});
                break;
            default:
                res.status(400).send({message: "Content can not be empty!"});
        }*/


    // Create a Product
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        image: req.body.image,
        size: req.body.size,
        ingredients: req.body.ingredients,
        featured: req.body.featured ? req.body.featured : false
    });

    // Save in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

// Retrieve all Products from the database - find by title.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};

    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Product with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message:
                        err.message || "Error retrieving Product with id=" + id
                });
        });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found.`
                });
            } else res.send({message: "Product was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found.`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Product.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Products."
            });
        });
};

// Find all published Products
exports.findAllPublished = (req, res) => {
    Product.find({published: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        });
};

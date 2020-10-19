module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: String,
            description: String,
            brand: String,
            price: Number,
            image: String,
            size: String,
            ingredients: String,
            featured: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Product = mongoose.model("product", schema);
    return Product;
};
import Category from "../models/category.js"
import Product from "../models/product.js";

export const addCategory = async (req, res) => {
    try {
        const categoryObj = {
            name: req.body.name,
            description: req.body.description
        };

        if (req.body.parentId) {
            categoryObj.parentId = req.body.parentId;
        }

        const category = new Category(categoryObj);
        const savedCategory = await category.save();
        res.status(200).json({ category: savedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
}

export const addProduct = async (req, res) => {

    try {
        const productObj = {
            productName: req.body.productName,
            brandName: req.body.brandName,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image
        };

        const product = await new Product(productObj);
        const savedProduct = await product.save();
        res.status(200).json({ product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
}

export const getSubCategories = async (req, res) => {
    const categoryId = req.params.id
    try {
        const subCategories = await Category.find({ parentId: categoryId })
        res.status(200).json(subCategories)
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
}
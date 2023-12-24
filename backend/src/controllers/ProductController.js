const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating } = req.body;

        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required."
            })
        } 

        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const data = req.body;

        const response = await ProductService.updateProduct(productID, data);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, filter} = req.query;
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const response = await ProductService.getDetailProduct(productID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const response = await ProductService.deleteProduct(productID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(200).json({
                status: "ERR",
                message: "The ids is required."
            })
        }
        const response = await ProductService.deleteManyProduct(ids);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getAllType,
    getDetailProduct,
    deleteProduct,
    deleteMany
}
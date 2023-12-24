const Product = require("../models/ProductModel");
const bcrypt = require('bcrypt');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "The name of product is already."
                })
            }

            const createdProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock, 
                rating
            });

            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not exist."
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count();

            if (filter) {
                const productsFilter = await Product.find({ [filter[0]]: {'$regex': filter[1]}}).limit(limit).skip(limit*page);
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: productsFilter,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct/limit)
                })
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const productsSort = await Product.find().limit(limit).skip(limit*page).sort(objectSort);
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: productsSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct/limit)
                })
            }
            
            const products = await Product.find().limit(limit).skip(limit*page);
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: products,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct/limit)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product === null) {
                resolve({
                    status: "OK",
                    message: "The product is not exist."
                })
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product
            })

        } catch (error) {
            reject(error)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not exist."
                })
            }

            await Product.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "Delete product success."
            })

        } catch (error) {
            reject(error)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: ids})

            resolve({
                status: "OK",
                message: "Delete product success."
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getAllType,
    getDetailProduct,
    deleteProduct,
    deleteManyProduct
}
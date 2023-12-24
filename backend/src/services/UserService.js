const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find()
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })

            if (user === null) {
                resolve({
                    status: "OK",
                    message: "The user is not exist."
                })
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            })

        } catch (error) {
            reject(error)
        }
    })
}

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "The email is already."
                })
            }

            //hash password
            const hash = bcrypt.hashSync(password, 10);

            const createdUser = await User.create({
                name, 
                email, 
                password: hash,
                phone
            });
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {email, password} = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "The user is not exist."
                })
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: "ERR",
                    message: "The password or user is incorrect."
                })
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token
            })

        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The userID is not exist."
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser
            })

        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not exist."
                })
            }

            await User.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "Delete user success."
            })

        } catch (error) {
            reject(error)
        }
    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({_id: ids})

            resolve({
                status: "OK",
                message: "Delete user success."
            })

        } catch (error) {
            reject(error)
        }
    })
}

const refreshTokenService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    return res.status(404).json({
                        status: "ERR",
                        message: "The authentication."
                    })
                }

                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })

                resolve({
                    status: "OK",
                    message: "SUCCESS.",
                    access_token
                })
            });
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllUser,
    getDetailsUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    deleteManyUser,
    refreshTokenService
}
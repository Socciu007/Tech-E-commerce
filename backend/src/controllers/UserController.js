const UserService = require("../services/UserService");

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userID = req.params.id
        const response = await UserService.getDetailsUser(userID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        //Validation email address
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password || !confirmPassword ) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required."
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is email."
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "The password is equal confirmPassword." 
            })
        }
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {  email, password } = req.body;
        //Validation email address
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required."
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is email."
            })
        } 
        const response = await UserService.loginUser(req.body);
        const {refresh_token, ...newResponse} = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newResponse, refresh_token})
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const data = req.body;
        const response = await UserService.updateUser(userID, data);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const response = await UserService.deleteUser(userID);
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
        const response = await UserService.deleteManyUser(ids);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            resolve({
                status: "OK",
                message: "The token is require."
            })
        }
        const response = await UserService.refreshTokenService(token);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: "OK",
            message: "Logout successfully"
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    getAllUser,
    getDetailsUser,
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    deleteMany,
    refreshToken
}
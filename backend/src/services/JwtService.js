const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const genneralAccessToken = (payload) => {
    //console.log('payload', payload);
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' })

    return access_token;
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN , { expiresIn: '365d' })

    return refresh_token;
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken
}


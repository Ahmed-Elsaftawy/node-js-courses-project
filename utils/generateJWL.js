import jwt from 'jsonwebtoken';

const createToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: "1d" });
    return token;
}

export { createToken };
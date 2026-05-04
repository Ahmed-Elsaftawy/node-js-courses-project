import jwt from 'jsonwebtoken';

const createToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: "1m" });
    return token;
}

export { createToken };
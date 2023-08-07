require('dotenv').config();

exports.jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
exports.db = process.env.DB;
exports.origin = process.env.ORIGIN;
const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ msg: 'Token not found' }); // 401 is standard for auth
    }

    // Extract token from "Bearer <token>"
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: 'Token not found' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    req.user = decoded; // attach user info to request
    next(); // continue to the protected route
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: 'Invalid or expired token' });
  }
};

const generateRefreshToken = (userInfo) =>{
    return jwt.sign(userInfo,
         process.env.JWT_REFRESH_SECRET_KEY,
         {expiresIn : "7d"});
}

const generateAccessToken = (userInfo) => {
    return jwt.sign(userInfo,
        process.env.JWT_ACCESS_SECRET_KEY,
        {expiresIn: "1m"}
    )
}


module.exports = {generateAccessToken, generateRefreshToken, jwtAuthMiddleware}
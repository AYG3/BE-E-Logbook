import jwt from "jsonwebtoken";
import User from "../models/User.js";


let token;
let decoded;
export const protect = async (req, res, next) => {

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('Token recieved: ', token)

      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Protect token decoded: ', decoded)
      console.log("req body user: ", req.body.user);

      req.user = await User.findById(decoded.id);
      console.log("Req decoded role: ", decoded.role);

      next();
    } catch (error) {
      console.log('Token verification failed',error)
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};


export const isAdmin = (req, res, next) => {
  if (decoded.role == 'admin'){
    next();
  }
  else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
}
import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('Token recieved: ', token)

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Protect token decoded: ', decoded)
      
      req.user = await User.findById(decoded.id).select('-password');
      console.log("Req.user: ", req.user)

      if (!req.user){
        console.log("!req.user") //My error
        return res.status(401).json({ message: 'Not authorized cuz protect didn\'t find user'})
      }
      next();
    } catch (error) {
      console.log('Token verification failed',error)
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.log('!token error: ', error)
    res.status(401).json({ message: "Not authorized, no token" });
  }
};




export const isAdmin = (req, res, next) => {
  if (req.user &&  req.user.role == 'admin'){
    next();
  }
  else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
}
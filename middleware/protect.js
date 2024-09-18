import jwt from "jsonwebtoken";
import User from "../models/User.js";


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
      console.log("req: ", req);

      // req.user = await User.findById(decoded.id);
      // console.log("Req user 2: ", req.user);

      // if (!req.user) {
      //   return res.status(401).json({ message: "Not authorized, user not found" });
      // }

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
  console.log("Request role: ", res.user.role);
  if (req.user &&  req.user.role == 'admin'){
    next();
  }
  else {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
}
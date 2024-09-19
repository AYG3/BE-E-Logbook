import Logbook from "../models/Logbook.js";
import User from "../models/User.js";

//Admin get all users
export const adminGetAllUsers = async (req, res) => {

    try {
      const users = await User.find({ role: {$ne: 'admin'}}).select('-password'); //try not addding select()
      
      res.status(200).json(users)
  
    } catch (error) {
      console.log(error);
        res.status(500).json({message: 'Error fetching users' })
    }
  };
  
  //Admin get a user's logbook
  export const adminGetUserLogbooks = async (req, res) => {
    const { userId } = req.params
  
    try {
      const userLogbooks = await Logbook.find({ user: userId });
  
      if (!userLogbooks.length){
        res.status(400).json({ message: 'User has not made any Logbooks/Entries'})
      }
  
      res.status(200).json(userLogbooks)
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error 500 cant get users entries or Logbooks'})
      
    }
  }
  
  //Admin's comment
  export const adminComment = async (req, res) => {
    const { entryId } = req.params;
    const { comment, approval } = req.body;
  
    try {
      const updateComment = await Logbook.findByIdAndUpdate(entryId, {comment, approval}, {new: true});    
  
      if(!updateComment){
        return res.status(404).json({ message: "User not found"})
      }
      
      return res.status(200).json(updateComment);
    } catch (error) {
      console.log("Error in admin comment: ", error);
    }
  }
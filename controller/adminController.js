import Logbook from "../models/Logbook.js";
import User from "../models/User.js";


//Admin get details
export const adminDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await User.find({ _id: id}).select('-password');

    if (!admin ){
      return res.status(404).json({message: 'admin not found'})
    }

    return res.status(200).json(admin);

  }  catch (error) {
    console.log("Error gettind admin details: ", error);
  }
}
//Admin get all users
export const adminGetAllUsers = async (req, res) => {

    try {
      const users = await User.find({ role: {$ne: 'admin'}}).select('-password'); 
      
      return res.status(200).json(users)
  
    } catch (error) {
      console.log(error);
        res.status(500).json({message: 'Error fetching users' })
    }
  };

  //Admin get a user
  export const adminGetUser = async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({message: 'User not found'})
      }

      return res.status(200).json(user)
    } catch (error) {
      console.log('Error from adminGetUser: ', error);
    }
  }
  
  //Admin delete user 
  export const adminDeleteUser = async (req, res) =>{
    const { userId } = req.params;

    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user){
        console.error("User not found to delete: ", user);
        return res.status(404).json({ message: 'User not found'});
      }

      return res.status(200).json({ message: 'Successfully deleted user'});

    } catch (error) {
      console.log(error);
    }

  }

  //Admin get a user's logbook
  export const adminGetUserLogbooks = async (req, res) => {
    const { userId } = req.params
  
    try {
      const userLogbooks = await Logbook.find({ user: userId});
  
      if (!userLogbooks){
        return res.status(400).json({ message: 'User has not made any Logbooks/Entries'})
      }
  
      return res.status(200).json(userLogbooks)
  
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
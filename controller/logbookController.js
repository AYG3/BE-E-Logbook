import { response } from "express";
import Logbook from "../models/Logbook.js";
import User from "../models/User.js";

export const createLogbook = async (req, res) => {
  const { day, nature_of_activities, date, extra, image, userId } = req.body;
//   const { day, nature_of_activites, date, extra, image } = req.body;
//   const userId = req.user._id;

  try {
    const logbook = new Logbook({
      day,
      nature_of_activities,
      date,
      extra,
      image,
      user: userId,
    });

    const savedEntry = await logbook.save();

    //adding Entry to user's logbooks array
    const user = await User.findById(userId);
    user.logbooks.push(savedEntry._id)
    await user.save();

    return res.status(201).json(savedEntry)
  } catch (error) {
    return res.status(500).json({ message: 'User Logbook Entry Error'})
    console.log(error)
  }
};


//gets all users entries
export const getUserLogbooks = async (req, res) => {
    // const userId = req.body
    const { userId } = req.params

    console.log(`Getting all entries userId: ${userId}`)

    try {
        const logbooks = await Logbook.find({ user: userId})
        return res.status(201).json(logbooks)
        
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'User Logbooks fetch error'})
    }
}


//gets a specific entry
export const getUserLogbook = async (req, res ) => {
    const { entryId } = req.params
    
    try {     
      const entry = await Logbook.findById(entryId)
      
      if(!entry){
        return res.status(404).json({ message: 'Entry not found'})
      }
      
      res.status(200).json(entry)
    } catch (error) {
      return res.status(500).json({ message: 'Single entry fetch error'})
      console.log(error)
    }
}


//Update a logbook entry
export const updateUserLogbook= async (req, res) => {
  const { entryId } = req.params

  const { day, nature_of_activities, date, extra, image} = req.body

  if (!day || !nature_of_activities || !date) {
    return res.status(400).json({ message: 'Day, nature of activities, and date are required' });
  }

  try {
    const updatedEntry = await Logbook.findByIdAndUpdate(entryId, {day, nature_of_activities, date, extra, image}, { new: true})
    
    if(!updatedEntry){
      return res.status(404).json({message: 'Entry not edited, cuz its prolly not found'})
    }

    return res.status(200).json(updatedEntry)
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({ message: 'Error editing entry'})
  }
}

//Delete a logbook entry
export const deleteUserLogbook = async (req, res) => { 
  const { entryId } = req.params

  try {
    const entry = await Logbook.findByIdAndDelete(entryId)

    if(!entry){
      return res.status(404).json({ message: 'Delete error: prolly didn\'t find entry'})
    }

    return res.status(200).json({message: 'Entry deleted successfully'})

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error deleting entry'})
  }
}

export const adminGetAllUsers = async (req, res) => {

  try {
    const users = await User.find({ role: {$ne: 'admin'}}).select('-password'); //try not addding select()

    res.status(200).json(users)

  } catch (error) {
    console.log(error);
      res.status(500).json({message: 'Error fetching users' })
  }
};

export const adminGetUserLogbooks = async (req, res) => {
  const { id } = req.params

  try {
    const userLogbooks = await Logbook.find({ id });

    if (!userLogbooks){
      
    }
  } catch (error) {
    
  }
}
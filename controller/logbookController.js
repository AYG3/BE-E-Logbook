import { response } from "express";
import Logbook from "../models/Logbook.js";
import User from "../models/User.js";

export const createLogbook = async (req, res) => {
//   const { day, nature_of_activites, date, extra, image } = req.body;
  const { day, nature_of_activities, date, extra, image, userId } = req.body;
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

    res.status(201).json(savedEntry)
  } catch (error) {
    res.status(500).json({ message: 'User Logbook Entry Error'})
    console.log(error)
  }
};


export const getUserLogbooks = async (req, res) => {
    // const userId = req.body
    const { userId } = req.body

    try {
        const logbooks = await Logbook.find({ user: userId})
        res.status(201).json(logbooks)
        
    } catch (error) {
        res.status(500).json({message: 'User Logbooks fetch error'})
        console.log(error)
    }
}


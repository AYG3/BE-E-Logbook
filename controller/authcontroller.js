import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

export const signUp = async (req, res) => {
    const {fname, lname, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json(({ message: 'User already exists'}))
        }

        const user = await User.create({
            fname,
            lname,
            email,
            password
        });

        res.status(201).json({
            _id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
        })

    } catch (error) {
        res.status(500).json({ message: 'Server signUp() error'})
        console.log(error, 'Signup authcontroller error')
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({message: "Invalid email"})
        }
        
        console.log('Entered Password:', password); 
        console.log('Stored Hashed Password:', user.password); 

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message :'Invalid password'})
        }

        const token = jwt.sign({ email: user.email}, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        console.log(`User: ${user}, Token: ${token}`)

        res.status(201).json({
            _id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            token
        })

    } catch (error) {
        res.status(500).json({ message: 'Login authcontroller error'})
        console.log(error, 'Login authcontroller error')
    }
}

export const logout = async (req, res) => {

}

export const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id).select('-password')
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching user details'})
    }
}

export const adminSignUp = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {

        const userExists = await User.findOne({ email })

        if(userExists){
            console.log(userExists);
            return res.status(400).json({message: 'Admin User Already Exists' })
        }
         
        const admin = await User.create({
            fname,
            lname,
            email,
            password,
            role: 'admin',
        })

        const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.status(200).json({
            _id: admin.id,
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            role: admin.role,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to register admin account'});
    }
}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const admin = await User.findOne({ email })

        if (!admin) {
            return res.status(400).json({ message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        
        if (!isMatch){
           return res.status(440).json({ message: 'Wrong password' })
        }

        const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '30d'});

        res.status(200).json({
            id: admin._id,
            fname: admin.fname,
            lname: admin.lname,
            email: admin.email,
            role: admin.role,
            token   
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Admin login error'})
        
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user){
            return res.status(404).json({ message: 'User not found'})
        }

        const resetToken = user.getResetPasswordToken();

        await user.save()

        const resetUrl = `${req.protocol}://${req.get('host')}/auth/resetpassword/${resetToken}`

        //Send mail
        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
        })

        await transporter.sendMail({
            to: user.email,
            subject: 'E-Logbook Password Reset Token',
            text: message
        });

        res.status(200).json({message: 'Email sent'})
    } catch (error) {
        console.log('Error sending mail', error)


        const user = await User.findOne({ email })
        user.getResetPasswordToken = undefined
        user.getResetPasswordExpire = undefined

        await user.save();

        res.status(500).json({ message: 'Email could not be sent'})
    }
}

export const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({message : "Invalid token"})
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'Password updated'})
    } catch (error) {
        res.status(500).json({message: 'Password reset failed'})
    }
}
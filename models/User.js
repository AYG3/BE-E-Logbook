import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //why the brackets
    logbooks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Logbook',
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
})

//Encrypting password before saving the user
userSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) {
        next();
    } 

    const salt = await bcrypt.genSalt(11);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.getResetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.getResetPasswordExpire = Date.now() + 10 * 60 * 1000 //10 mins

    return resetToken
}

const User = mongoose.model('User', userSchema);

export default User;
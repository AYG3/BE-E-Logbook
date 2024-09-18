import mongoose from "mongoose";

const logbookSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        trim: true
    },
    nature_of_activities: {
        type: String,
        required: true,
        trim : true
    },
    date: {
        type: String,
        required: true,
        trim: true,
        default: new Date().toLocaleDateString()
    },
    extra: {
        type: [String],
        trim: true
    },
    comment: {
        type: [String],
        trim: true
    },
    approval: {
        type: String,
        enum: ['approved', 'semi-approved', 'not-approved']
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
})

const Logbook = mongoose.model('Logbook', logbookSchema)

export default Logbook;
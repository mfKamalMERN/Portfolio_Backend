import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Contact: { type: String, required: false },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Name_Of_Organization: { type: String, required: false },
    Work_Mode: { type: String, required: false },
    Role: { type: String, required: false }
})

export const RecruiterModel = mongoose.model('recruiter', RecruiterSchema)
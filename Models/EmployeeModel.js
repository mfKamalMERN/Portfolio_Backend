import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Age: { type: Number, required: true },
    DOB: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    ProfilePic: { type: String, required: false },
    Resume: { DocName: { type: String, required: false }, DocPath: { type: String, required: false } },

    Certificates: [{ DocName: { type: String, required: false }, DocPath: { type: String, required: false } }],

    Experience: { Years: String, Months: String, TotalExperience: String },

    Skills: { type: String, required: false },

    Qualification: [{ Degree: { type: String, required: false }, CompletedOn: { type: Date }, Percentage: { type: String }, Marksheet: { type: String } }],

    MaritalStatus: { type: String, required: false },
    Gender: { type: String },
    Registered: { type: Boolean, required: false },
    Contact: { type: String, required: false },
    Nationality: { type: String, required: false },
    Role: { type: String }
})

export const EmployeeModel = mongoose.model('employee', employeeSchema)
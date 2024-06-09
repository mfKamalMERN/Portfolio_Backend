import mongoose from "mongoose";
import { EmployeeModel } from "../Models/EmployeeModel.js";

export const ConnectDB = () => {
    mongoose.connect(`mongodb+srv://mfk:test123@portfolio.lsuj3bc.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Portfolio`)
        .then(res => {
            console.log(`Connected to DB`)
            EmployeeModel.find()
                .then(employee => console.log(employee[0].Name))
                .catch(err => console.log(err))
        })
        .catch(er => console.log(er))
}

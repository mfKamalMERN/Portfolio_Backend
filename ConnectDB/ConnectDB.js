import mongoose from "mongoose";
import { EmployeeModel } from "../Models/EmployeeModel.js";

export const ConnectDB = () => {
    mongoose.connect(`mongodb://127.0.0.1:27017/Portfolio`)
        .then(res => {
            console.log(`Connected to DB`)
            EmployeeModel.find()
                .then(employee => console.log(employee[0].Name))
                .catch(err => console.log(err))
        })
        .catch(er => console.log(er))
}

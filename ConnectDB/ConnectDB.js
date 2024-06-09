import mongoose from "mongoose";

export const ConnectDB = () => {
    mongoose.connect(`mongodb+srv://mfk:test123@portfolio.lsuj3bc.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Portfolio`)
        .then(res => {
            console.log(`Connected to DB`)
        })
        .catch(er => console.log(er))
}

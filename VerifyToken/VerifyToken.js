import jwt from 'jsonwebtoken'
import { EmployeeModel } from '../Models/EmployeeModel.js'

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) res.json("Missing Token")
    else {
        jwt.verify(token, "jsk", async (err, decoded) => {
            if (err) res.json(err)
            else {
                try {
                    req.emp = await EmployeeModel.findById({ _id: decoded._id })
                    next()
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
}
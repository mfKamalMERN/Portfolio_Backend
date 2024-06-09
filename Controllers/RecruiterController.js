import { EmployeeModel } from "../Models/EmployeeModel.js"
import { RecruiterModel } from "../Models/RecruiterModel.js"
import jwt from 'jsonwebtoken'

export const RegisterAsRecruiter = (req, res) => {
    const { name, rcontact, remail, rpwd, rorg, workmode } = req.body

    EmployeeModel.findOne({ Role: "employee" })
        .then(employee => {

            if (employee.Registered) {
                RecruiterModel.findOne({ Email: remail })
                    .then(recruiter => {
                        if (recruiter) res.json({ Msg: `${recruiter.Email} is already registered` })
                        else {
                            RecruiterModel.create({ Name: name, Contact: rcontact, Email: remail, Password: rpwd, Name_Of_Organization: rorg, Work_Mode: workmode, Role: "recruiter" })
                                .then(recruiter => {
                                    res.json({ Msg: `Hey ${recruiter.Name}! Please proceed to login to view Portfolio of ${employee.Name}` })
                                })
                                .catch(er => console.log(er))
                        }
                    })
                    .catch(er => console.log(er))

            }
            else res.json({ Msg: `Updates are pending from ${employee.Name} ` })
        })
        .catch(er => console.log(er))

}

export const LoginAsRecruiter = async (req, res) => {
    const { email, password } = req.body

    try {
        const recruiter = await RecruiterModel.findOne({ Email: email })

        if (recruiter) {
            if (recruiter.Password === password) {
                const token = jwt.sign({ _id: recruiter._id }, "jwt-secret-key", { expiresIn: "24h" })
                res.cookie('token', token)
                res.json({ LoggedIn: true, Msg: "Logged In Successfully", Recruiter: [recruiter], Token: token })
            }
            else res.json({ Msg: "Incorrect Password" })
        }

        else res.json({ Msg: "No Record Found" })

    } catch (error) {
        console.log(error);
    }

}

export const LogOut = (req, res) => {
    
    res.clearCookie('token')
    res.json({ Msg: `logged Out` })
}
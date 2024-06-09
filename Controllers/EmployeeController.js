import { EmployeeModel } from "../Models/EmployeeModel.js"
import jwt from 'jsonwebtoken'
import { RecruiterModel } from "../Models/RecruiterModel.js"
import { validationResult } from "express-validator"

export const EmployeeController = {

    Register: async (req, res) => {
        const { name, age, dob, email, password, maritalStatus, gender, role } = req.body
        try {
            await EmployeeModel.create({ Name: name, Age: age, DOB: dob, Email: email, Password: password, MaritalStatus: maritalStatus, Gender: gender, Registered: true, Role: role })
            res.json("Registered! Kindly proceed to Login and Upload the necessary docs")
        } catch (error) {
            console.log(error);
        }
    },

    Login: async (req, res) => {
        const { email, password } = req.body
        const errorV = validationResult(req)

        if (!errorV.isEmpty()) res.json({ ValidationError: true, ActError: errorV.array() })
        else {
            try {
                const employee = await EmployeeModel.findOne({ Email: email })
                if (employee) {
                    if (employee.Password === password) {

                        const token = jwt.sign({ _id: employee._id }, "jsk", { expiresIn: "24h" })
                        res.cookie('token', token)

                        res.json({ LoggedIn: true, Msg: `Hi ${employee.Name}! You are now Logged In`, Emp: [employee], Token: token, Role: employee.Role })
                    }
                    else res.json({ LoggedIn: false, Msg: "Incorrect Password" })
                }
                else {
                    const recruiter = await RecruiterModel.findOne({ Email: email })
                    if (recruiter) {
                        if (recruiter.Password === password) {

                            const token = jwt.sign({ _id: recruiter._id }, "jsk", { expiresIn: "24h" })
                            res.cookie('token', token)

                            res.json({ LoggedIn: true, Msg: `Hi ${recruiter.Name}! You are now Logged In`, Recruiter: [recruiter], Token: token, Role: recruiter.Role })
                        }
                        else res.json({ LoggedIn: false, Msg: "Incorrect Password" })
                    }
                    else res.json({ LoggedIn: false, Msg: `No record found for ${email} ` })
                }
            } catch (error) {
                console.log(error);
            }
        }
    },

    GetEmployeeDetails: async (req, res) => {

        try {
            const employee = await EmployeeModel.findOne({ Role: "employee" })

            res.json({ EmployeeDetails: [employee], Token: req.cookies.token, Role: employee.Role })

        } catch (error) {
            console.log(error);
        }
    },

    GetEmployeeDP: async (req, res) => {

        try {
            const employee = await EmployeeModel.findOne({ Role: "employee" })
            res.json({ DP: employee.ProfilePic, Token: req.cookies.token })
        } catch (error) {
            console.log(error);
        }
    },

    UploadProfilePic: (req, res) => {
        const file = req.file
        EmployeeModel.findOne({ Role: "employee" })
            .then(emp => {
                emp.ProfilePic = `http://localhost:5500/Uploads/${file.filename}`
                emp.save()
                res.json({ ProfilePicPath: emp.ProfilePic })
            })
            .catch(er => console.log(er))
    },

    UpdateExperience: async (req, res) => {
        const { years, months } = req.body
        try {
            const employee = await EmployeeModel.findOne({ Role: "employee" })

            employee.Experience.Years = `${years} years`
            employee.Experience.Months = `${months} months`
            employee.Experience.TotalExperience = `${((years * 12) + months) / 12} years`

            employee.save()

            res.json({ Years: employee.Experience.Years, Months: employee.Experience.Months, Total_Experience: employee.Experience.TotalExperience })

        } catch (error) {
            console.log(error);
        }
    },

    UpdateMaritalStatus: (req, res) => {
        const { maritalstatus } = req.body

        EmployeeModel.findOne({ Role: "employee" })
            .then(employee => {

                employee.MaritalStatus = maritalstatus
                employee.save()

                res.json({ Msg: `Marital status updated`, Marital_Status: employee.MaritalStatus })
            })
            .catch(er => console.log(er))

    },

    UpdateGender: (req, res) => {
        const { gender } = req.body

        EmployeeModel.findOne({ Role: "employee" })
            .then(employee => {

                employee.Gender = gender
                employee.save()

                res.json({ Msg: `Gender updated`, Gender: employee.Gender })
            })
            .catch(er => console.log(er))

    },

    UploadDocs: async (req, res) => {
        const files = req.files

        try {
            const employee = await EmployeeModel.findOne({ Role: "employee" })

            for (let file of files) {
                employee.Certificates.push(`http://localhost:5500/Uploads/${file.filename}`)
            }
            employee.save()

            res.json({ Douments: employee.Certificates, Msg: "Docs Uploaded successfully" })

        } catch (error) {
            console.log(error);
        }
    },

    UploadResume: async (req, res) => {
        const file = req.file
        const { title } = req.body

        try {
            const employee = await EmployeeModel.findOne({ Role: "employee" })

            employee.Resume.DocPath = `http://localhost:5500/Uploads/${file.filename}`

            employee.Resume.DocName = title
            employee.save()

            console.log(employee.Resume.DocPath);

            res.json({ Msg: `${title} uploaded successfully`, ResumePath: employee.Resume.DocPath })

        } catch (error) {
            console.log(error);
        }

    },

    GetResume: (req, res) => {
        EmployeeModel.findOne({ Role: "employee" })
            .then(emp => {
                res.json({ ResumePath: emp.Resume.DocPath })
            })
            .catch(er => console.log(er))
    },

    UploadCertificates: async (req, res) => {
        const files = req.files
        const { title } = req.body

        try {

            const employee = await EmployeeModel.findOne({ Role: "employee" })


            for (let file of files) {
                employee.Certificates.push({ DocName: title, DocPath: `http://localhost:5500/Uploads/${file.filename}` })
            }
            employee.save()

            res.json({ Msg: `Files uploaded`, Certificates: employee.Certificates })

        } catch (error) {
            console.log(error);
        }
    },

    RemoveCertificate: (req, res) => {
        const { docpath } = req.body

        EmployeeModel.findOne({ Role: "employee" })
            .then(employee => {

                const targetcert = employee.Certificates.find((c) => c.DocPath === docpath)

                const index = employee.Certificates.indexOf(targetcert)

                employee.Certificates.splice(index, 1)

                employee.save()

                res.json({ Msg: "File removed" })
            })
            .catch(er => console.log(er))
    },

    UpdateDoc: async (req, res) => {
        const { docid } = req.params
        const file = req.file

        try {

            const employee = await EmployeeModel.findOne({ Role: "employee" })

            const targetcert = employee.Certificates.find((c) => c._id == docid)

            targetcert.DocPath = `http://localhost:5500/Uploads/${file.filename}`

            employee.save()

            res.json({ Msg: "Docs Updated" })


        } catch (error) {
            console.log(error);
        }

    },

    RemoveCV: async (req, res) => {
        try {
            const employee = await EmployeeModel.findOne({ Role: "employee" })

            if (employee.Resume.DocName === "" && employee.Resume.DocPath === "") res.json({ Msg: "Already Removed" })

            else {
                employee.Resume.DocPath = ""
                employee.Resume.DocName = ""
                employee.save()
                res.json({ Msg: "Resume Deleted" })
            }

        } catch (error) {
            console.log(error);
        }
    },

    AddSkills: (req, res) => {
        const { skills } = req.body

        EmployeeModel.findOne({ Role: "employee" })
            .then(employee => {
                employee.Skills = skills
                employee.save()
                res.json({ Msg: "Skills Updated" })

            })
            .catch(er => console.log(er))
    },

    AddQualification: async (req, res) => {
        const file = req.file
        const { degreename, doc, percentage } = req.body
        const errorV = validationResult(req)

        if (!errorV.isEmpty()) res.json({ ValidationError: true, ActError: errorV.array() })

        else {
            try {
                const employee = await EmployeeModel.findOne({ Role: "employee" })

                const fd = employee.Qualification.find((qual) => qual.Degree === degreename)

                if (fd) res.json({ Msg: `${degreename} is already added` })

                else {
                    employee.Qualification.push({ Degree: degreename, CompletedOn: doc, Percentage: percentage, Marksheet: `http://localhost:5500/Uploads/${file.filename}` })

                    employee.save()

                    res.json({ Msg: `${degreename} degree added successfully` })
                }

            } catch (error) {
                console.log(error);
            }
        }
    },

    RemoveDegree: async (req, res) => {
        const { degreeid } = req.params

        try {
            const employee = await EmployeeModel.findOne({ Role: "employee" })

            const reqdegrees = employee.Qualification.filter((qual) => qual._id != degreeid)

            employee.Qualification = reqdegrees

            employee.save()

            res.json({ Msg: "Degrees Updated" })

        } catch (error) {
            console.log(error);
        }

    },

    GetDegree: (req, res) => {
        const { degreeid } = req.params

        EmployeeModel.findOne({ Role: "employee" })
            .then(employee => {

                const targetqual = employee.Qualification.find((qual) => qual._id == degreeid)

                res.json({ TargetQual: targetqual })

            })
            .catch(er => console.log(er))
    },

    UpdateDegree: async (req, res) => {
        const { degreeid } = req.params
        const file = req.file
        const { degreename, doc, percentage } = req.body

        const errorV = validationResult(req)

        if (!errorV.isEmpty()) res.json({ ValidationError: true, ActError: errorV.array() })

        else {
            try {

                const employee = await EmployeeModel.findOne({ Role: "employee" })

                const targetqual = employee.Qualification.find((qual) => qual._id == degreeid)

                targetqual.Degree = degreename
                targetqual.CompletedOn = doc
                targetqual.Percentage = percentage
                targetqual.Marksheet = `http://localhost:5500/Uploads/${file.filename}`

                employee.save()

                res.json({ Msg: `${degreename} updated successfully` })

            } catch (error) {
                console.log(error);
            }
        }
    },

    GetMarksheets: (req, res) => {
        let marksheetdata = []
        EmployeeModel.findOne({ Role: "employee" })
            .then(employee => {
                for (let qual of employee.Qualification) {
                    marksheetdata.push({ DegreeName: qual.Degree, Path: qual.Marksheet })
                }
                res.json({ MarksheetData: marksheetdata })
            })
            .catch(er => console.log(er))
    }

}
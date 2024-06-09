import express from 'express'
import { EmployeeController } from '../Controllers/EmployeeController.js'
import { VerifyToken } from '../VerifyToken/VerifyToken.js'
import { upload } from '../Multer/multer.js'
import { AddQualificationValidation, LoginValidation } from '../Validations/Validations.js'

const eRouter = express.Router()

eRouter.post('/registerasemployee', EmployeeController.Register)

eRouter.post('/login', LoginValidation, EmployeeController.Login)

eRouter.get('/getemployeedetails', VerifyToken, EmployeeController.GetEmployeeDetails)

eRouter.get('/getemployeedp', EmployeeController.GetEmployeeDP)

eRouter.put('/uploadprofilepic', VerifyToken, upload.single('file'), EmployeeController.UploadProfilePic)

eRouter.put('/updateexperience', VerifyToken, EmployeeController.UpdateExperience)

eRouter.put('/updatemaritalstatus', VerifyToken, EmployeeController.UpdateMaritalStatus)

eRouter.put('/updategender', VerifyToken, EmployeeController.UpdateGender)

eRouter.put('/uploaddocs', VerifyToken, upload.array('files'), EmployeeController.UploadDocs)

eRouter.put('/uploadresume', VerifyToken, upload.single('file'), EmployeeController.UploadResume)

eRouter.get('/getresume', VerifyToken, EmployeeController.GetResume)

eRouter.post('/uploadcertificates', VerifyToken, upload.array('files'), EmployeeController.UploadCertificates)

eRouter.put('/removecertificate', VerifyToken, EmployeeController.RemoveCertificate)

eRouter.put('/updatedoc/:docid', VerifyToken, upload.single('file'), EmployeeController.UpdateDoc)

eRouter.delete('/removeresume', VerifyToken, EmployeeController.RemoveCV)

eRouter.put('/addskills', VerifyToken, EmployeeController.AddSkills)

eRouter.post('/addqualification', VerifyToken, upload.single('file'), AddQualificationValidation, EmployeeController.AddQualification)

eRouter.delete('/removedegree/:degreeid', VerifyToken, EmployeeController.RemoveDegree)

eRouter.get('/getdegree/:degreeid', VerifyToken, EmployeeController.GetDegree)

eRouter.put('/updatedegree/:degreeid', VerifyToken, upload.single('file'), AddQualificationValidation, EmployeeController.UpdateDegree)

eRouter.get('/getmarksheets', VerifyToken, EmployeeController.GetMarksheets)

export { eRouter }

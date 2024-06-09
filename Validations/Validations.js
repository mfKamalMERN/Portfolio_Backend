import { body } from "express-validator";

export const LoginValidation = [body('email').isLength({ min: 10 }).withMessage("Email should be atleast 10 chars").isEmail().withMessage("Invalid Email").normalizeEmail(), body('password').isLength({ min: 6 }).withMessage("Min 6 chars reqd for password")]

export const AddQualificationValidation = [body('degreename').isLength({ min: 2 }).withMessage("Min 2 chars required for Degree Name"), body('doc').isDate().withMessage("Invalid Date"), body('percentage').isLength({ min: 3 }).withMessage("min 3 chars required for percentage")]
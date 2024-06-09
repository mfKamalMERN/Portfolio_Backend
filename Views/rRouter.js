import express from 'express'
import { LogOut, LoginAsRecruiter, RegisterAsRecruiter } from '../Controllers/RecruiterController.js'

export const rRouter = express.Router()

rRouter.post('/registerasrecruiter', RegisterAsRecruiter)
rRouter.post('/loginasrecruiter', LoginAsRecruiter)
rRouter.get('/logout', LogOut)
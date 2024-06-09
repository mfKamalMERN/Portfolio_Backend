import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ConnectDB } from './ConnectDB/ConnectDB.js'
import { eRouter } from './Views/eRouter.js'
import cookieParser from 'cookie-parser'
import { rRouter } from './Views/rRouter.js'

const app = express()
app.use(express.static('Public'))

app.use(cors({
    origin: ["https://portfolio-six-xi-63.vercel.app/"],

    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true
}))

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

ConnectDB()

app.use('/', eRouter)
app.use('/', rRouter)

const port = 5500

app.listen(port, () => console.log(`server running at port ${port}`))
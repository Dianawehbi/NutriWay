import express from 'express';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js'
import User from './models/User.model.js';
import authRouter from './routes/auth.route.js'
import cors from 'cors'

// CORS tells the browser:
// It's okay to let this frontend app (from 5173) access this server (on 5000)"

const app = express();
app.use(express.json())
app.use(cors())
app.use('/users', userRoute)

app.use('/api/auth', authRouter)

app.get('/', function (req, res ) {
    res.send("jo")
})

connectDB().then(() => {
    app.listen(process.env.PORT , () => {
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
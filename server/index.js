import express from 'express';
import connectDB from './config/db.js';
const app = express();
app.use(express.json())

app.get('/', function (req, res ) {
    res.send("jo")
})


connectDB().then(() => {
    app.listen(process.env.PORT , () => {
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
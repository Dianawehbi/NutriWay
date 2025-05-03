import express from 'express';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import recipeRouter from './routes/recipe.route.js';
import clientRouter from './routes/client.route.js'
import serviceRouter from './routes/service.route.js'
import dietitianRouter from './routes/dietitian.route.js'
import availability from './routes/availability.route.js'

import cors from 'cors';

const app = express(); 

// THEN use middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

// Routes
app.use('/users', userRoute);
app.use('/api/auth', authRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/client', clientRouter);
app.use('/api/dietitian', dietitianRouter);
app.use('/api/services', serviceRouter);
app.use('/api/availability', availability);

// Connect to DB and start server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});

import express from 'express';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import recipeRouter from './routes/recipe.route.js';
import clientRouter from './routes/client.route.js'
import cors from 'cors';

const app = express(); // ✅ First, create app

// THEN use middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

// Routes
app.use('/users', userRoute);
app.use('/api/auth', authRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/client', clientRouter);

// Connect to DB and start server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});

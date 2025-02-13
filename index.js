import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectBBDD from './config/db.js'

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

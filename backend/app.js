import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 30000;


app.use(cors({
 }));

app.use(express.json());

import router from './src/routes/index.js';
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

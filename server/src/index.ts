import express, { Request, Response } from 'express';
import ScheduleRoutes from './routes/schedule';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to the jungle');
});

app.use('/schedule', ScheduleRoutes)

app.listen(process.env.API_PORT, () => {
    console.log(`Server running at ${process.env.API_PORT}`)
});
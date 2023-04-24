import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('welcome to the jungle');
});

app.listen(process.env.API_PORT);
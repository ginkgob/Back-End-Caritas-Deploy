import express from 'express';
import morgan from 'morgan';
import packageJson from '../package.json';
import userRouter from './routes/user.routes';
import { createUsers } from './libs/initialSetup';


const app = express();
createUsers();
app.set('pkg', packageJson);
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    version: app.get('pkg').version,
    author: app.get('pkg').author,
  });
});

app.use('/users', userRouter);


export default app;
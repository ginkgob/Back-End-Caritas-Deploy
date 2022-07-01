import express from 'express';
import morgan from 'morgan';
import packageJson from '../package.json';
import userRouter from './routes/user.routes';
import { createUsers } from './libs/initialSetup';
import sectionRouter from './routes/section.routes';


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
app.use('/sections', sectionRouter);


export default app;
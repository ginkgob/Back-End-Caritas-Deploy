import express from 'express';
import morgan from 'morgan';
import packageJson from '../package.json';

import { createRoles } from './libs/initialSetup'; 

import userRouter from './routes/user.routes';
import { createUsers } from './libs/initialSetup';
import sectionRouter from './routes/section.routes';
import authRouter from './routes/auth.routes';

var cors = require('cors')

const app = express();
createUsers();
createRoles();

app.set('pkg', packageJson);
app.use(morgan('dev'));
app.use(express.json());

//Allowed URL to consume API
const whiteList = ['http://localhost:3000', 'http://localhost:3000/', 'http://localhost:5050', 'http://localhost:5050/', 'http://localhost:3000/admin-register', 'http://localhost:3000/login' ];
app.use(cors({origin: whiteList}));


app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    version: app.get('pkg').version,
    author: app.get('pkg').author,
  });
});

app.use('/users', userRouter);
app.use('/sections', sectionRouter);
app.use('/api/auth', authRouter);


export default app;
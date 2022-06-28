import express from 'express';
import morgan from 'morgan';
import packageJson from '../package.json';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes'


const app = express();
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
app.use('/api/auth', authRouter);


export default app;
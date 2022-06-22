import express from 'express';
import morgan from 'morgan';
import packageJson from '../package.json';
import usersRoutes from './routes/users.routes';


const app = express();
app.set('pkg', packageJson);
app.use(morgan('dev'));
app.use(usersRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    version: app.get('pkg').version,
    author: app.get('pkg').author,
  });
});

export default app;
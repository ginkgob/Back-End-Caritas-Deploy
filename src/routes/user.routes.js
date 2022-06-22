import { Router } from 'express';
import * as usersController from '../controllers/users.controller';
const router = Router();
router.get('/',);
router.get('/', usersController.getUsers);


app.get('/users', (req, res) => {});




export default router;
import { Router } from 'express';
const router = Router();
import * as usersController from '../controllers/users.controller';


router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);



export default router;
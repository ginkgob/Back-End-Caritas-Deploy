import { Router } from 'express';
const router = Router();
import * as usersController from '../controllers/users.controller';
import {authJwt, validateSignup} from '../middlewares/indexMiddleware'

router.post('/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    validateSignup.checkExistentRoles
], usersController.createUser);

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], usersController.getUsers);
router.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], usersController.getUser);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], usersController.createUser);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], usersController.updateUser);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], usersController.deleteUser);



export default router;
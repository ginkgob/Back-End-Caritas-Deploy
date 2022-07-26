import { Router } from 'express';
const router = Router();
import * as usersController from '../controllers/users.controller';
import { authJwt } from '../middlewares/indexMiddleware'


router.get('/', [authJwt.verifyToken, authJwt.isAdmin], usersController.getUsers);
router.get('/:id', [authJwt.verifyToken, authJwt.isSameUserOrAdmin], usersController.getUser);
router.put('/:id', [authJwt.verifyToken, authJwt.isSameUserOrAdmin], usersController.updateUser);
router.delete('/:id', [authJwt.verifyToken, authJwt.isSameUserOrAdmin], usersController.deleteUser);
router.get('/:id/roles', usersController.getUserRoles);



export default router;
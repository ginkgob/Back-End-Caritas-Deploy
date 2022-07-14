import { Router } from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import {authJwt, validateSignup} from '../middlewares/indexMiddleware';

router.post('/signup', [authJwt.verifyToken, authJwt.isAdmin], validateSignup.checkDuplicateUser, validateSignup.checkExistentRoles, authCtrl.signUp)
router.post('/signin', authCtrl.signIn)

export default router;
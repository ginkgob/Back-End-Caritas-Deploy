import { Router } from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import {validateSignup} from '../middlewares/indexMiddleware';

router.post('/signup', validateSignup.checkExistentRoles, authCtrl.signUp)

router.post('/signin', authCtrl.signIn)

// validateSignup.checkDuplicateUser,   ===> No funciona correctamente al consumir API de registro 

export default router;
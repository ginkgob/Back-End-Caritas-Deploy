import { Router } from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import {validateSignup} from '../middlewares/indexMiddleware';

router.post('/signup', validateSignup.checkDuplicateUser, validateSignup.checkExistentRoles, authCtrl.signUp)

router.post('/signin', authCtrl.signIn).post('signin')



export default router;
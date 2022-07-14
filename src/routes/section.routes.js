import { Router } from 'express'
const router = Router()

import * as sectionsController from '../controllers/sections.controller';
import { authJwt } from '../middlewares/indexMiddleware';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], sectionsController.createSection);
router.get('/', sectionsController.getSections);
router.get('/:id', [authJwt.verifyToken, authJwt.isUser], sectionsController.getSectionById);
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], sectionsController.updateSectionById);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], sectionsController.deleteSection);

export default router;


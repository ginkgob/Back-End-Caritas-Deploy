import { Router } from 'express'
const router = Router()

import * as sectionsController from '../controllers/sections.controller';

router.post('/', sectionsController.createSection);
router.get('/', sectionsController.getSections);
router.get('/:id', sectionsController.getSectionById);
router.put('/:id', sectionsController.updateSectionById);



// router.get('/', (req, res) => res.json('getting sections'))

export default router;


import { Router } from 'express'
const router = Router()

import * as sectionsController from '../controllers/sections.controller';

router.post('/', sectionsController.createSection);
router.get('/', sectionsController.getSections);
router.get('/:sectionId', sectionsController.getSectionById);
router.put('/:sectionId', sectionsController.updateSectionById);



//router.get('/', (req, res) => res.json('getting sections'))

export default router;


import express from 'express';
import sectioncontrol from '../control/sectioncontrol.js';


const router = express.Router();
/*const sectioncontrol = new sectioncontrol();*/

router.get('/', sectioncontrol.getSections);
router.post('/', sectioncontrol.addSection);
router.delete('/:id', sectioncontrol.deleteSection);
router.put('/:id', sectioncontrol.updateSection);cd

export default router;
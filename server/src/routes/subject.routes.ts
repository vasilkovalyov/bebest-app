import express from 'express';
import subjectController from '../controllers/subject.controller';

const router = express.Router();

router.post('/subjects', subjectController.addSubjects);
router.get('/subjects', subjectController.getSubjects);

export default router;

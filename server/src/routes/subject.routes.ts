import express from 'express';
import SubjectController from '../controllers/subject.controller';

const router = express.Router();

router.post('/subjects', SubjectController.addSubjects);
router.get('/subjects', SubjectController.getSubjects);

export default router;

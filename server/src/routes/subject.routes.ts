import express from 'express';
import subjectController from '../controllers/subject.controller';

const router = express.Router();

router.post('/subjects', subjectController.addSubjects);
router.post('/subjects-categories', subjectController.addSubjectsCategories);
router.get('/subjects', subjectController.getSubjects);

export default router;

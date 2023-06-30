import express from 'express';
import subjectController from '../controllers/subject.controller';

const router = express.Router();

router.post('/add-subjects', subjectController.addSubjects);
router.post(
  '/add-subjects-categories',
  subjectController.addSubjectsCategories
);
router.get('/get-subjects', subjectController.getSubjects);

export default router;

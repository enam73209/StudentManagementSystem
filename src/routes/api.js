const express = require('express');
const router = express.Router();
const StudentsController = require('../controllers/StudentsController');
router.post('/createStudent',StudentsController.createStudent);
router.get('/selectStudentByID/:id',StudentsController.selectStudentByID);
router.get('/selectStudent',StudentsController.selectStudent);
router.post('/deleteStudent',StudentsController.deleteStudent);
router.post('/updateStudent/:id',StudentsController.updateStudent);

module.exports = router

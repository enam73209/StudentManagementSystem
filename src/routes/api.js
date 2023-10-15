const express = require('express');
const router = express.Router();
const StudentsController = require('../controllers/StudentsController');
const AuthVerifyMiddleware = require('../middlewares/authVerifyMiddleware');
const WorksController = require('../controllers/WorksController');

router.post('/createStudent',StudentsController.createStudent);
router.get('/selectStudentByID/:id',StudentsController.selectStudentByID);
router.get('/selectAllStudent',StudentsController.selectAllStudent);
router.post('/deleteStudent',StudentsController.deleteStudent);
router.post('/updateStudent/:id',StudentsController.updateStudent);
router.post('/UserLogin',StudentsController.UserLogin);
router.get('/RecoverVerifyEmail/:email',StudentsController.RecoverVerifyEmail);
router.post('/VerifyOTP',StudentsController.VerifyOTP);

router.post('/createWork',AuthVerifyMiddleware,WorksController.createWork);
router.get('/selectAllWorks',AuthVerifyMiddleware,WorksController.selectAllWorks);
router.get('/selectWorksByID/:id',AuthVerifyMiddleware,WorksController.selectWorksByID);
router.post('/deleteWork',AuthVerifyMiddleware,WorksController.deleteWork);
router.post('/updateWork',AuthVerifyMiddleware,WorksController.updateWork);




module.exports = router

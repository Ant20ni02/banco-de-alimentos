const express = require('express');
const router = express.Router();
const familyController = require('../controller/familyController');
const middleware = require('../middleware/jwt-middleware');

router.post('/createFamily', middleware, familyController.createFamily);
router.post('/assignMedicalCondition', middleware, familyController.assignMedicalCondition);
router.get('/getFamilyTables', middleware, familyController.getFamilies);
router.get('/getEnfermedades', middleware, familyController.getEnfermedades);
router.get('/getPregnancy', middleware, familyController.getPregnancy);
router.get('/idFamilyExists/:idFamily', middleware, familyController.idFamilyExists); 
router.get('/getFamilyById/:idSurvey', middleware, familyController.getFamilyById);
router.get('/getEnfermedadesById/:idSurvey', middleware, familyController.getEnfermedadesById);
router.get('/getPregnancyById/:idSurvey', middleware, familyController.getPregnancyById);
router.put('/setPregnancy/:months/:idFamily', middleware, familyController.setPregnancy);


module.exports = router;
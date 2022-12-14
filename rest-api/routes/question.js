const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController');
const middleware = require('../middleware/jwt-middleware');
 
router.post('/insertQuestion', middleware,questionController.insertQuestion);
router.post('/insertQuestionList', middleware,questionController.insertQuestionList);
router.get('/getAllAnswers/:idQuestion', middleware,questionController.getAllAnswers )
router.get('/getFrequency/:idQuestion', middleware, questionController.getFrequency);
router.get('/getFoodQuantity/:systemType', middleware, questionController.getFoodQuantity);
router.get('/getFoodFrequency/:foodNumber', middleware, questionController.getFoodFrequency);
router.get('/getAnswerByIdQuestion/:idSurvey/:idQuestion', middleware,questionController.getAnswerByIdQuestion);
router.get('/getFrequencyQuantityById/:idSurvey/:foodNumber', middleware,questionController.getFrequencyQuantityById);

module.exports = router;
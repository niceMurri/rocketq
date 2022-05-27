const router = require('express').Router();

const QuestionController = require('./src/controllers/QuestionController');
const RoomController = require('./src/controllers/RoomController');

//index
router.get('/',(req,res) => res.render('index', {page: 'enter-room'}));


//Question
router.post('/question/create/:roomId', QuestionController.create);
router.post('/question/:roomId/:questionId/:action', QuestionController.readOrDelete)

//room
router.get('/create-pass',(req,res) => res.render('index', {page: 'create-pass'}));
router.post('/room/create-room', RoomController.create)
router.get('/room/:roomId', RoomController.index);



module.exports = router;
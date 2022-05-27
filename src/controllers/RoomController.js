const Database = require('../db/config');

//Model
const RoomModel = require('../models/RoomModel');
const QuestionsModel = require('../models/QuestionsModel');

exports.create = async (req,res) => {
   
    try {
        const room = new RoomModel(req.params, req.body);
        //create room and return room id
        const newRoom = await room.create();

        const roomId = newRoom;


        res.redirect(`/room/${roomId}`);
    } catch (error) {
        console.log(error)
        res.send('error',404);
    }
}

exports.index = async (req,res) => {
    try {
        //created room for validations with data sent from user
        const room = new RoomModel(req.params,req.body);
        const roomId = req.params.roomId;

        //checking if page id exist
        if(!await room.roomExists(roomId)){
            res.redirect('back');
            return;
        }

        //taking questions from the room
        const questions = new QuestionsModel(req.params, req.body);

        const questionsNoRead = await questions.getQuestions(roomId);
        const questionsRead = await questions.getQuestionsRead(roomId);


        //render room success
        res.render('room', {roomId: roomId, questions: questionsNoRead, questionsRead: questionsRead});

    } catch (error) {
        console.log(error);
        res.send('error',404);
    }
}


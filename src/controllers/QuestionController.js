const Database = require('../db/config');

//Models
const QuestionsModel = require('../models/QuestionsModel');

exports.index = (req,res) => {
    res.send(req.body);
}

exports.create = async (req, res) => {
    try {
        const Question = new QuestionsModel(req.params,req.body);

        //create question in db
        await Question.create()

        res.redirect('back');
    } catch (error) {
        console.log(error);
        res.send('error')
    }
}
exports.readOrDelete = async (req,res) => {
    try {
        const Question = new QuestionsModel(req.params,req.body);

        await Question.readOrDelete();

        res.redirect('back')
    } catch (error) {
        console.log(error);
        res.redirect('back')
    }
}
/*exports.readOrDelete = async (req,res) => {
    const db = await Database();

    const password = req.body.password;
    const questionId = req.params.question
    const roomId = req.params.room;
    const action = req.params.action;


    const roomPassword = await db.all(`SELECT password FROM rooms WHERE id = ${roomId}`);

    if(password !== roomPassword[0].password) return res.redirect('back');

    if(action == 'check'){
        try {
            await db.run(`
            UPDATE questions 
            SET read = 1 
            WHERE id = ${questionId}`);
            
            await db.close();
            return res.redirect('back')
        } catch (error) {
            await db.close();
            return res.redirect('back')
        }
    }


    //DELETE QUESTION
    try {
        await db.run(`
        DELETE FROM questions
        WHERE id = ${questionId}`)

        res.redirect('back')
        await db.close();
    } catch (error) {
        res.redirect('back')
        await db.close();
        console.log(error);
    }
} */
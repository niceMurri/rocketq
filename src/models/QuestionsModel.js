const res = require('express/lib/response');
const Database = require('../db/config');

function Questions(params,body){
    this.params = params
    this.body = body
}

Questions.prototype.create = async function(){
    
    const questionTitle = this.body.question;
    const roomId = this.params.roomId;

    try {
        //open db
        const db = await Database();
        
        //create question
        db.run(`
                INSERT INTO questions(
                    title,
                    read,
                    room
                )
                VALUES(
                    "${questionTitle}",
                    0,
                    "${roomId}"
                )
                `)

        //close db
        db.close()

        return true;
    } catch (error) {
        return error;
    }

}

Questions.prototype.readOrDelete = async function(){

    const roomId = this.params.roomId;
    const questionId = this.params.questionId;
    const action = this.params.action;
    const password = this.body.password;

    //open db
    const db = await Database();

    //password for check
    const passwordDB = await db.all(`SELECT password FROM rooms WHERE id = ${roomId}`);

    //checking password
    if(passwordDB[0].password !== password) return false;

    //check
    if(action === 'check'){
        //set question with READ
        db.run(`
        UPDATE questions
        SET read = 1
        WHERE id = ${questionId}`)

        await db.close();

        return
    }

    //delete
    await db.run(`
    DELETE FROM questions WHERE id == ${questionId}`);

    await db.close();
}
Questions.prototype.getQuestions = async function(roomId = this.params.roomId){
    try {
        const db = await Database()

        const questions = await db.all(`
            SELECT * FROM questions WHERE room = ${roomId} AND read = 0
        `)

        await db.close();

        return questions;
    } catch (error) {
        return error;
    }
}
Questions.prototype.getQuestionsRead = async function(roomId = this.params.roomId){
    try {
        const db = await Database()

        const questions = await db.all(`
            SELECT * FROM questions WHERE room = ${roomId} AND read = 1
        `)

        await db.close();

        return questions;
    } catch (error) {
        return error;
    }
}

module.exports = Questions
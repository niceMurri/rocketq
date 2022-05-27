const Database = require('../db/config');

function Room(params,body){
    this.params = params
    this.body = body;
}

Room.prototype.create = async function(){

    try {
        //gen id e taking password
        let roomId = Math.floor(Math.random() * (999999 - 000001)) + 000001;
        const password = this.body.password;

        //checking if id exists
        while(await this.roomExists(roomId)){
            roomId = Math.floor(Math.random() * (999999 - 000001)) + 000001;
        }

        //open connection db
        const db = await Database();

        //creating room in db
        db.run(`
            INSERT INTO rooms(
                id,
                password
            )
            VALUES (
                ${roomId},
                ${password}
            )
        `)

        //close db
        db.close();

        return roomId;

    } catch (error) {
        console.log(error + 'ROOM MODEL LINE 37')
        return false;
    }


}

Room.prototype.roomExists = async function(id = this.params.roomId){
    try {
        const db = await Database();

        const page = await db.all(`
        SELECT id FROM rooms WHERE id = ${id}`);

        await db.close();

        return page.length > 0 ? true : false;
    } catch (error) {
        console.log(error)
        return new Error;
    }
}

module.exports = Room;
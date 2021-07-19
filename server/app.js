const express = require('express');

const app = express();
const server = app.listen(8080);

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
    }
})

const io = require('socket.io')(server, {
    cors: {
    origin: "http://localhost:3000",
   }
});


io.on('connection', async socket => {

    // retrieve all chatrooms and messages from database once connection
    socket.on('initialize', async data => {
        console.log('Client connected!');

        // make sure user exists
        let user = null;
        if (data.username) {
            const retrievedUser = await knex.select().table('users').where({ username: data.username }).first();
            if (retrievedUser) {
                user = retrievedUser;
            }

        }

        const rooms = await knex.select().table('rooms');
        const messages = await knex.select().table('messages').orderBy('time', 'desc');
        
        io.emit('initialize', {rooms: rooms, messages: messages, user: user});
    })

    // socket for creating new user
    socket.on('new user', async data => {
        // check if username already exists
        const retrievedUser = await knex.select().table('users').where({ username: data.username }).first();
        if (retrievedUser) {
            return io.emit('username taken');
        }

        const userId = await knex.insert({ username: data.username }).into('users');
        const user = await knex.select().table('users').where({ id: userId }).first();
        io.emit('user created', { user: user });

    })

    // socket for creating new room
    socket.on('new room', async data => {
        await knex.insert({ name: data.roomName }).into('rooms');

        const rooms = await knex.select().table('rooms');
        io.emit('new room', {rooms: rooms});
    })

    // socket for creating new messages
    socket.on('new message', async data => {
        await knex.insert({
            text: data.text,
            userId: data.userId,
            roomId: data.roomId,
            time: data.time,
            username: data.username
        }).into('messages');

        const messages = await knex.select().table('messages').orderBy('time', 'desc');
        io.emit('new message', {messages: messages});
    })

})
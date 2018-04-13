const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});


// const path=require('path');
// const http=require('http');
// const express=require('express');
// const socketIO=require('socket.io');

// const {generateMessage,generateLocationMessage}=require('./utils/message');
// const publicPath =path.join(__dirname,'../public');
// const port= process.env.PORT || 3000;

// var app=express();
// var server=http.createServer(app);
// var io=socketIO(server);

// app.use(express.static(publicPath));
 
//  io.on('connection',(socket)=> {
//  	console.log('New user connected');

//    /*socket.emit('newEmail', {
//    	from :"jen@example.com",
//    	text: "Hey! wats goin on",
//    	createAt: 123
//    });
// */  
//    /*socket.emit('newMessage', {
//       from: "mayank",
//       text: "hey buddy",
//       createAt: 123
//    });
// */
//    /*socket.on('createEmail',(newEmail)=> {
//       console.log('createEmail',newEmail);
//    });*/

//     socket.emit('newMessage',generateMessage('admin','Welcome to chat app'));

//     socket.broadcast.emit('newMessage',generateMessage('admin','new user joined'));

//    socket.on('createMessage', (Message,callback)=> {
//        console.log('createMessage', Message);



//        io.emit('newMessage',generateMessage(Message.from,Message.text)); 
//         callback();
//        /*socket.broadcast.emit('newMessage',{
//           from:Message.from,
//           text: Message.text,
//           createdAt: new Date().getTime() 
//        });*/
//    });

//    socket.on('createLocationMessage', (coords)=> {
//      io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
//    });

//  	socket.on('disconnect',()=> {
//    console.log('User was diconnected');
//  });

//  });

 

// server.listen(3000,()=> {
//   console.log('Server is up on port 3000');
// });
/*console.log(__dirname+'/../public');
console.log(publicpath);*/
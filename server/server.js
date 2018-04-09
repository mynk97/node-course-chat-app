const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath =path.join(__dirname,'../public');
const port= process.env.PORT || 3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));
 
 io.on('connection',(socket)=> {
 	console.log('New user connected');

   /*socket.emit('newEmail', {
   	from :"jen@example.com",
   	text: "Hey! wats goin on",
   	createAt: 123
   });
*/  
   /*socket.emit('newMessage', {
      from: "mayank",
      text: "hey buddy",
      createAt: 123
   });
*/
   /*socket.on('createEmail',(newEmail)=> {
      console.log('createEmail',newEmail);
   });*/

    socket.emit('newMessage',{
        from: 'admin',
        text: 'Welcome to chat app',
        createAt: new Date().getTime() 
      });

    socket.broadcast.emit('newMessage',{
         from: 'admin',
         text: 'new user joined',
         createAt:new Date().getTime() 
    });

   socket.on('createMessage', (Message)=> {
       console.log('createMessage', Message);



       io.emit('newMessage', {
          from:Message.from,
          text: Message.text,
          createdAt: new Date().getTime() 
       });
       /*socket.broadcast.emit('newMessage',{
          from:Message.from,
          text: Message.text,
          createdAt: new Date().getTime() 
       });*/
   });

 	socket.on('disconnect',()=> {
   console.log('User was diconnected');
 });

 });

 

server.listen(3000,()=> {
  console.log('Server is up on port 3000');
});
/*console.log(__dirname+'/../public');
console.log(publicpath);*/
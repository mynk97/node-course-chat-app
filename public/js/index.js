var socket =io();
  	  
  	  socket.on('connect',function () {
         console.log('Connected to server');
     
        /*socket.emit('createEmail',{
            to: 'jen@example.com',
            text: 'Hey. this is arun'
        });*/

        /*socket.emit('createMessage', {
           to: 'aanand',
            text: 'hey from this side'
        });*/
  	  });


         socket.on('disconnect',function () {
         	console.log('Disconnected to server');
         });

  	  /*socket.on('newEmail',function (email) {
         console.log('New email',email);
  	  });*/

  	  socket.on('newMessage',function(message) {
           console.log('New message', message);
  	  });
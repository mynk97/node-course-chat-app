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
           //console.log('New message', message);
           var formattedTime=moment(message.createdAt).format('h:mm a');
           var li=jQuery('<li></li>');
           li.text(`${message.from} ${formattedTime}: ${message.text}`);

           jQuery('#messages').append(li);
  	  });

  	  /*socket.emit('createMessage',{
         from: 'Frank',
         text: 'Hi'
  	  },function(data) {
  	  	console.log('Got it',data);
  	  });*/
      socket.on('newLocationMessage',function(message) {
         var formattedTime=moment(message.createdAt).format('h:mm a');
          var li=jQuery('<li></li>');
          var a =jQuery('<a target="_blank">My current location </a>');
            li.text(`${message.from} ${formattedTime}: `);
            a.attr('href',message.url);
            li.append(a);
            jQuery('#messages').append(li);

      });

  	  jQuery('#message-form').on('submit',function(e) {
        e.preventDefault();

        var messageTextbox =jQuery('[name=massage]');

        socket.emit('createMessage',{
         from:'User',
         text: jQuery('[name=message]').val()
        },function() {
            messageTextbox.val('');
        });
  	  });

  	  var locationButton= jQuery('#send-location');
      locationButton.on('click', function() {
          if(!navigator.geolocation) {
             return alert('Geolocation not supported by user browser');
          }

          locationButton.attr('disabled','disabled').text('Sending location...');

          navigator.geolocation.getCurrentPosition(function(position) {
          //  console.log(position);
          locationButton.removeAttr('disabled').text('Send Location');
          socket.emit('createLocationMessage',{
         latitude:position.coords.latitude,
         longitude: position.coords.longitude
          });
          },function() {
          	locationButton.removeAttr('disabled').text('Send Location');
          	alert('Unable to fetch location.');
          });
      });

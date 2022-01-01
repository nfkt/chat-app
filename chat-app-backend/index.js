const app = require('express')();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
var mongoose = require('mongoose');

var cors = require('cors');
app.use(cors());

const io = new Server(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

var dbUrl = 'mongodb://localhost:27017/test';

var Message = mongoose.model('Message',{
  name : String,
  message : String
})


io.on('connection', socket => {
  console.log('Connected');
  io.emit('connected', 'User connected');
  socket.on('message', ({ name, message }) => {
   
  //     var message = new Message({
  //       name: name,
  //       message: message
  //   });
  //   message.save((err)=>{
  //     if(err) console.log("Error while adding")
  // })
  
    io.emit('message', { name, message })
    
    console.log({name, message})
  })

})

http.listen(4000, function() {
  console.log('listening on port 4000');
  mongoose.connect(dbUrl,(err) => {
    console.log('mongodb connected',err);
  })
})

 /* 
 
 const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

 **/


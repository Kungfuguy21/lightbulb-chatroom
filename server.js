const express = require('express');
const mustache = require('mustache-express');
//const sqlite3 = require('')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let Messages = ["Message1", "Message2", "Message3", "Message4"];

// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
// server.listen(3000);


app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());
let light = 0;

app.get("/", (req, res) => {
	res.render('home');
});

app.get("/status", (req, res) => {
	res.end(light+"");
})

app.get("/change", (request, response) => {
	if (light == 1) {
		light = 0
	} else {
		light = 1;
	}

	response.end();
});

io.on('connection', (socket) => {
	socket.emit("AllMessages", Messages)

	// listen for when a user sends us a new message : 'newMessage'
	// when 'newMessage' happens, send the message contents (the argument) out to everyone else
	socket.on('newMessage', (message_contents) => {
		// add message_contents to the Messages array
		io.emit('thereIsANewMessage', message_contents);
		let messagecount = messagecount+1
		Messages[messagecount] = (message_contents);
	});
  


  console.log('a user connected');
});

server.listen(5050, () => {
	console.log("server go vroommmm");
});


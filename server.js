const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
const server = app.listen(1337, () => console.log("suhhhhh dude 1337"));
const io = require('socket.io')(server);
let count = 0;

const broadcastCount = () => {
    let output = {
        countClicks: count,
    };
    io.emit('update', output);
}

io.on('connection', function(socket) { //..................................2
    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //..........3
    socket.on('thankyou', function(data) { //........................7
        console.log(data.msg); //.......................8
    broadcastCount();
    });
    socket.on("epic", function() {
        count++;
        broadcastCount();
    });
    socket.on("reset", function() {
        count = 0;
        broadcastCount();
    });
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/static"));

app.get('/', (req, res) => {
    res.render('index');
});

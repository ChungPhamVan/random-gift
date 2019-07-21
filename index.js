var express = require('express');
var indexRoute = require('./routes/index.route.js');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/', indexRoute);

var listUser = [];
var port = 3000;
var server = require('http').Server(app);
socketIo = require('socket.io')(server);
socketIo.on('connection', function(socket) {
    console.log('Co nguoi ket noi...');
    socketIo.sockets.emit("server-send-listUser", listUser);
    socket.on("client-send-infomation", function(data) {
        listUser.push({
            name: data.name,
            email: data.email,
            phone: data.phone
        });
        socketIo.sockets.emit("server-send-listUser", listUser);
    });
});

server.listen(port, function() {
    console.log('Server listening..., port: ' + port);
});
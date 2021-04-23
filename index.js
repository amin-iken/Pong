const { createSocket } = require('dgram');
const express = require('express');
const { isObject } = require('util');
const app = express()
const port = 3000
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/gameAi', (req, res) => {
  res.sendFile(__dirname + '/js/game.ai.js');
});

app.get('/gameControl', (req, res) => {
    res.sendFile(__dirname + '/js/game.control.js');
  });

app.get('/gameDisplay', (req, res) => {
    res.sendFile(__dirname + '/js/game.display.js');
  });

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/js/game.js');
  });

app.get('/gameKeycode', (req, res) => {
    res.sendFile(__dirname + '/js/game.keycode.js');
  });

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
  });


var NbPlayer = 0;
io.on('connection', (socket) => {
    console.log('connected');
    NbPlayer++;

    if(NbPlayer == 1){
      console.log('player1');
      socket.emit('player', 'player1');
    }
    if(NbPlayer == 2){
      console.log('player2');
      socket.emit('player', 'player2');
    }
    if(NbPlayer == 3){
      console.log('player3');
      socket.emit('player', 'player3');
    }
    if(NbPlayer == 4){
      console.log('player4');
      socket.emit('player', 'player4');
    }

    socket.on('ack', (data) => {
        console.log('ack ' + data);
      });

    socket.on('uploadBall', (ballPosX, ballPosY, ballDirX, ballDirY) => {
      io.emit('downloadBall', ballPosX, ballPosY, ballDirX, ballDirY);
    });
    socket.on('uploadPlayer1', (Player1) => {
       io.emit('downloadPlayer1', Player1);
      });
    socket.on('uploadPlayer2', (Player2) => {
      io.emit('downloadPlayer2', Player2);
      });
    socket.on('uploadPlayer3', (Player3) => {
      io.emit('downloadPlayer3', Player3);
      });
    socket.on('uploadPlayer4', (Player4) => {
      io.emit('downloadPlayer4', Player4);
      });

    socket.on('disconnect', () => {
        console.log('disconnected');
      });
  });

http.listen(port, () => {
  console.log("Listening http://localhost:" + port)
})
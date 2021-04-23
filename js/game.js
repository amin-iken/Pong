var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor : "#000000",
    netWidth : 6,
    netColor : "#FFFFFF",

    groundLayer : null,
    scoreLayer : null,
    playersBallLayer : null,

    scorePosPlayer1 : 240,
    scorePosPlayer2 : 405,

    wallSound : null,

    ball : {
        width : 10,
        height : 10,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        directionX : 1,
        directionY : 1,
        speed : 2,

        move : function() {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
        },

        bounce : function() {
            if ( (this.posX + this.width) > game.groundWidth || this.posX < 0) {
              this.directionX = -this.directionX;
            }
            if ( (this.posY + this.height) > game.groundHeight || this.posY < 0  )
              this.directionY = -this.directionY;      
        },

        collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
            || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
              // Collision
              return true;
            } 
            return false;
        },
      },

    playerOne : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 10,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "left",
        score : 0
      },
       
    playerTwo : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 680,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "right",
        score : 0
      },
    
    playerThree : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 50,
      posY : 200,
      goUp : false,
      goDown : false,
      originalPosition : "left"
    },

    playerFour : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 640,
      posY : 200,
      goUp : false,
      goDown : false,
      originalPosition : "right"
    },

    init : function() {
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);
        
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
        
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);

        this.displayScore(this.playerOne.score,this.playerTwo.score);
        this.displayBall(this.ball.posX, this.ball.posY);
        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);

        game.ai.setPlayerAndBall(this.playerTwo, this.ball);
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    displayScore : function(scorePlayer1, scorePlayer2){
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
    },

    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },

    moveBall : function() { 
        this.ball.move();
        this.ball.bounce();
        this.displayBall();
        if ( (this.ball.posX + this.ball.width) > game.groundWidth) {
          this.playerOne.score++;
          this.clearLayer(this.scoreLayer);
          this.displayScore(this.playerOne.score,this.playerTwo.score);
        }
        if (this.ball.posX < 0 ) {
          this.playerTwo.score++;
          this.clearLayer(this.scoreLayer);
          this.displayScore(this.playerOne.score,this.playerTwo.score);
        }
    },

    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);
    },

    movePlayerOne : function() {
        if (game.playerOne.goUp && game.playerOne.posY > 0)
          game.playerOne.posY-=5;
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
          game.playerOne.posY+=5;
    },
    movePlayerTwo : function() {
      if (game.playerTwo.goUp && game.playerTwo.posY > 0)
        game.playerTwo.posY-=5;
      else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
        game.playerTwo.posY+=5;
    },
    movePlayerThree : function() {
      if (game.playerThree.goUp && game.playerThree.posY > 0)
        game.playerThree.posY-=5;
      else if (game.playerThree.goDown && game.playerThree.posY < game.groundHeight - game.playerThree.height)
        game.playerThree.posY+=5;
    },
    movePlayerFour : function() {
      if (game.playerFour.goUp && game.playerFour.posY > 0)
        game.playerFour.posY-=5;
      else if (game.playerFour.goDown && game.playerFour.posY < game.groundHeight - game.playerFour.height)
        game.playerFour.posY+=5;
    },

    collideBallWithPlayersAndAction : function() { 
        if ( this.ball.collide(game.playerOne) )
          game.ball.directionX = -game.ball.directionX;
        if ( this.ball.collide(game.playerTwo) )
          game.ball.directionX = -game.ball.directionX;
        if ( this.ball.collide(game.playerThree) )
          game.ball.directionX = -game.ball.directionX;
        if ( this.ball.collide(game.playerFour) )
          game.ball.directionX = -game.ball.directionX;
      },

     updateBallValues : function( ballPosX, ballPosY, ballDirX, ballDirY) {
      this.ball.posX = ballPosX,
      this.ball.posY = ballPosY,
      this.ball.directionX = ballDirX,
      this.ball.directionY = ballDirY
     },
    updatePlayerOne : function(Player1) {
        this.playerOne.posX = Player1.posX,
        this.playerOne.posY = Player1.posY
     },
    updatePlayerTwo : function(Player2) {
        this.playerTwo.posX = Player2.posX,
        this.playerTwo.posY = Player2.posY
    },
    updatePlayerThree : function(Player3) {
    this.playerThree.posX = Player3.posX,
    this.playerThree.posY = Player3.posY
    },
    updatePlayerFour : function(Player4) {
      this.playerFour.posX = Player4.posX,
      this.playerFour.posY = Player4.posY
    }
};
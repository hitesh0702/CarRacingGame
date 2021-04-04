class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200);
    car1.addImage("car1",car1_img);

    car2=createSprite(300,200);
    car2.addImage("car2",car2_img);

    car3=createSprite(500,200);
    car3.addImage("car3",car3_img);

    car4=createSprite(700,200);
    car4.addImage("car4",car4_img);

    cars=[car1,car2,car3,car4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    player.getRank();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index=0;
      var x=175;
      var y;
     
      for(var plr in allPlayers){   //allPlayers=[player1,player2,player3,player4] for(var plr=0;plr<= allplayers.length;plr=plr+1)
       index=index+1;
       x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
         
        fill("gold")
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        
        }
        else{

          fill("white");
        }
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75);


      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>3860){
    gameState=2
    player.rank+=1
    Player.updateRank(player.rank)
    }
    drawSprites();
  }
  end(){
console.log("Game Ended");
console.log(player.rank);
if (player.rank===1){
alert("Congrats you came First !!! "+ player.name)


}
else if(player.rank===2){
alert ("You came Second "+ player.name);

}
else if(player.rank===3){

alert("You came third "+ player.name);

}

else {
  alert ("You came last "+player.name);
}


  }
  
}

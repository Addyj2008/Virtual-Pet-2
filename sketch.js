let database, dogHappyIMG, dogIMG2, dog, foodStockR, foodStockL, timer, dogState, stateR;

function preload() {
  dogHappyIMG = loadImage('Images/Dog2.png');
  dogIMG2 = loadImage('Images/Dog1.png');
}

function setup() {
  timer = 0;
  database = firebase.database();
  foodStockR = database.ref('Food');
  foodStockR.on('value', function (data) {
    foodStockL = data.val();
  });
  stateR = database.ref('Timer');
  stateR.on('value', function (data) {
    Timer = data.val();
  })
  createCanvas(800, 700);
  dog = createSprite(400, 350, 10, 10);
  dog.addImage('Regular', dogIMG2)
  dog.addImage('Happy', dogHappyIMG)
  dog.scale = 1/5;
  foodStockL = 20;
  dogState = "Regular";
  textSize(20);
}


function draw() {
  timer -= 1;
  if (timer > 0) {
    dog.changeImage('Happy');
    dogState = "Happy";
  } else {
    dog.changeImage('Regular');
    dogState = "Regular";
  }
  database.ref('/').update({'Timer' : timer});
  if (keyCode === UP_ARROW && foodStockL > 0 && dogState === "Regular") {
    foodStockL -= 1;
    timer = 3600;
    database.ref('/').update({'Food' : foodStockL});
  }
  background(255);
  text("Food : " + foodStockL, 0, 20);
  if (dogState === "Regular") {
    text("Press UP ARROW to feed dog", 0, 60);
  }
  drawSprites();
}




let database, dogHappyIMG, dogIMG2, dog, timer, dogState, stateR, imageG, prime = 0, primeR, buttons = [];

function preload() {
  dogHappyIMG = loadImage('Images/Dog2.png');
  dogIMG2 = loadImage('Images/Dog1.png');
}

function setup() {
  buttons.push(createButton("FEED"));
  buttons[0].position(750, 100);
  buttons[0].mousePressed(function () {
    if (foodStockL.length > 0 && dogState === "Regular") {
      prime = 255;
      foodStockL.pop();
      timer = 3600;
      database.ref('/').update({'Food' : foodStockL.length});
      database.ref('/').update({'Timer' : timer});
      database.ref('/').update({'Prime' : prime});
    }
  })
  buttons.push(createButton("ADD FOOD"));
  buttons[1].position(750, 200);
  buttons[1].mousePressed(function () {
    new Food();
    database.ref('/').update({'Food' : foodStockL.length});
  })
  imageG = loadImage('Images/Milk.png');
  timer = 0;
  while (foodStockL.length < 20) {
    new Food();
  }
  database = firebase.database();
  foodStockR = database.ref('Food');
  foodStockR.on('value', function (data) {
    while (data.val() < foodStockL.length) {
      foodStockL.pop();
    }
    while (data.val() > foodStockL.length) {
      new Food();
    }
  });
  stateR = database.ref('Timer');
  stateR.on('value', function (data) {
    timer = data.val();
  })
  primeR = database.ref('Prime')
  primeR.on('value', function (data) {
    prime = data.val();
  })
  createCanvas(800, 800);
  dog = createSprite(400, 400, 10, 10);
  dog.addImage('Regular', dogIMG2)
  dog.addImage('Happy', dogHappyIMG)
  dog.scale = 1/5;
  dogState = "Regular";
  textSize(20);
}


function draw() {
  if (timer > 0) {
    timer -= 1;
    dog.changeImage('Happy');
    dogState = "Happy";
  } else {
    if (timer === 0) {
      database.ref('/').update({'Timer' : timer});
      timer -= 1;
    }
    dog.changeImage('Regular');
    dogState = "Regular";
  }
  background(255);
  drawSprites();
  push();
  tint(255, prime)
  image(imageG, 275, 375, 80, 80);
  pop();
  if (prime === 0) {
    database.ref('/').update({'Prime' : prime});
  } else {
    prime -= 5;
  }
  if (dogState === "Regular") {
    text("FEED DOG", 0, 30)
  }
  displayAll();
}
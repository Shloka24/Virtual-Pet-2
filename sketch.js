var dog, dogImg, dogBark;
var happyDogImg, bg;
var database;
var foodS, foodStock;
var foodI;
var feedB, addB, enterB;
var fedTime, lastFed;


function preload()
{
   dogImg = loadImage("Dog.png");
   happyDogImg = loadImage("happydog.png");
   bg = loadImage("background.jpg");
   dogBark = loadSound("dogWoof.mp3");
   
}

function setup(){
database = firebase.database();
createCanvas(1200,800);

fedTime = database.ref('FeedTime');
fedTime.on("value", function (data){
  lastFed = data.val();
})

foodI = new Food();
foodI.getFoodStock();



dog  = createSprite(1000, 600, 50, 50);
dog.scale = 0.3;
dog.addImage(dogImg);

feedB = createButton('FEED YOUR DOG');
feedB.position(800, 100);
feedB.mousePressed(feedDog);

addB = createButton('ADD FOOD');
addB.position(1000, 100);
addB.mousePressed(addFood);

var input = createInput('Name of your Dog');
input.position(500, 300);
dog.name = input.value;

enterB = createButton('ENTER');
enterB.position(530, 340);
enterB.mousePressed(function(){
  input.hide();
  enterB.hide();
  
})




}


function draw() {  
background(bg);

strokeWeight(20);
textSize(30);
fill("black");
text("Food Remaining:" + foodS, 800, 350);

foodI.display();

  drawSprites();

  fill("black");
  textSize(25);
  if(lastFed>= 12){
    text("Last Feed:"+ lastFed%12 + "PM", 80, 50);
  }else if(lastFed === 0){
    text("Last Feed: 12 AM", 100, 100);
  }else {
    text("Last Feed:" + lastFed + "AM", 80, 50);
  }


}

function readStock(data){
  foodS = data.val();
  foodI.updateFoodStock(foodS);
  foodI.deductFoodStock();
  
}




function feedDog(){
   dog.addImage(happyDogImg);
   dogBark.play();
   foodI.deductFoodStock();
   foodI.updateFoodStock(foodS);
   database.ref('/').update({
     Food: foodS,
     FeedTime: hour()
})
   
   }   


function addFood(){
  dog.addImage(dogImg);
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}








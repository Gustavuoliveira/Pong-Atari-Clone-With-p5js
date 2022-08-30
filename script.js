//Canvas variables
let canvas_width = 700;
let canvas_height = 500;

//Score Variables
let pong_font;
let font_size = 70;
let enemy_score = 00;
let player_score = 00;

//Sound Variables
let sound_victory = new Audio('library/assets/victory.mp3');
let sound_paddle = new Audio('library/assets/paddle.mp3');
let sound_score = new Audio('library/assets/score.mp3');

//Ball variables
let ball_speed = 1;
let ball_size = 15;
let step_x = 5;
let step_y = 5;
let ball_x = canvas_width/2;
let ball_y = canvas_height/2;

//Players variables
let player_height = 80;
let player_width = 10;
let player_x = canvas_width - (player_width + player_width/2);
let player_y = canvas_height/2 - player_height/2;

//Enemy variables
let enemy_x = player_width/2;
let enemy_y = canvas_height/2 - player_height/2;
let enemy_step = 4;
let enemy_difficulty = 3;

//Checking collisions
let collide_player = false;
let collide_enemy = false;

function preload(){
  pong_font = loadFont('library/assets/bit5x3');
}

function setup() {
  createCanvas(canvas_width, canvas_height);

}

function draw() {
  background('black');

  update_score();

  ellipse(ball_x, ball_y, ball_size);                      // Drawing the ball
  rect(player_x, player_y, player_width, player_height);   // Drawing the player
  rect(enemy_x, enemy_y, player_width, player_height);     // Drawing the enemy


  ball_movement();
  ball_collisions();
  enemy_movement();
  player_movement();
}

function update_score(){
  if(enemy_score == 10 || player_score == 10){
    enemy_score = 0;
    player_score = 0;
    sound_victory.play();
  }
  
  fill('white');
  textFont(pong_font);
  textSize(font_size);
  text(String(enemy_score).padStart(2,'0'), canvas_width/4 - font_size/2, 100);
  text(String(player_score).padStart(2,'0'), canvas_width*3/4 - font_size/2, 100);
}

function player_movement(){
  if(keyIsDown(UP_ARROW)) player_y -= 10;
  if(keyIsDown(DOWN_ARROW)) player_y += 10;

  //Player collision with the top 
  if(player_y < 0) player_y = 0;
  //Player collision with the bottom
  if(player_y + player_height > canvas_height) player_y = canvas_height - player_height;
}

function enemy_movement(){  
  enemy_y = enemy_y + enemy_step
  
  //The enemy moves according to the position of the ball
  if(ball_y > enemy_y + (player_height/2)) enemy_step = enemy_step = enemy_difficulty;
  if(ball_y < enemy_y + (player_height/2)) enemy_step = enemy_step = -enemy_difficulty;

  //Enemy collision with the top
  if(enemy_y < 0) enemy_y = 0
  //Enemy collision with the top
  if(enemy_y + player_height > canvas_height) enemy_y = canvas_height - player_height;
}

function ball_movement(){
  ball_x = ball_x + step_x;
  ball_y = ball_y + step_y;
}

function ball_collisions(){
  //Ball collision with the top an bottom
  if(ball_y + ball_size/2 > height || ball_y - ball_size/2 < 0) step_y *= -1;

  //Ball collision with the player
  collide_player = collideRectCircle(player_x,player_y,player_width,player_height,ball_x,ball_y,ball_size);
  if (collide_player == true){
    if(step_x < 0) step_x -= .1; else step_x += .1;
    step_x *= -1; //Reverse the ball position
    sound_paddle.play();
  }
  //Ball collision with the enemy
  collide_enemy = collideRectCircle(enemy_x,enemy_y,player_width,player_height,ball_x,ball_y,ball_size);
  if (collide_enemy == true){
    if(step_x < 0) step_x -= .5; else step_x += .5;
    step_x *= -1; //Reverse the ball position
    sound_paddle.play();
  }

  //Ball collision with the sides
  if(ball_x + ball_size/2 > width){ //Right wall
    enemy_score++;
    sound_score.play();
    step_x = 5; //Slows the ball velocity
    enemy_difficulty = random([3,4,4.5,5]); //Sets the position randomly
    step_y *= random([1,-1]);
    //Return the ball to the center
    ball_x = canvas_width/2;
    ball_y = canvas_height/2;
  }

  if (ball_x - ball_size/2 < 0){ //Left wall
    player_score++;
    sound_score.play();
    step_x = 5; //Slows the ball velocity
    enemy_difficulty = random([3,4,4.5,5]); //Sets the position randomly
    step_y *= random([1,-1]);
    //Return the ball to the center
    ball_x = canvas_width/2;
    ball_y = canvas_height/2;
  }
}


//Canvas Variables
let canvas_width = 700;
let canvas_height = 500;

//Ball variables
let ball_speed = 0;
let ball_size = 15;
let step_x = 5;
let step_y = 3;
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
let enemy_speed = 1;
let difficulty = 3;

//Checking collisions
let collide_player = false;
let collide_enemy = false;

function setup() {
  createCanvas(canvas_width, canvas_height);
}

function draw() {
  background('black');

  ellipse(ball_x, ball_y, ball_size);                      // Drawing the ball
  rect(player_x, player_y, player_width, player_height);   // Drawing the player
  rect(enemy_x, enemy_y, player_width, player_height);     // Drawing the enemy

  ball_movement();
  ball_collisions();
  enemy_movement();
  player_movement();

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
  enemy_y += enemy_speed;
  if(ball_y > enemy_y + (player_height/2)) enemy_speed = difficulty;
  if(ball_y < enemy_y + (player_height/2)) enemy_speed = -difficulty;

  //Enemy collision with the top
  if(enemy_y < 0) enemy_y = 0
  //Enemy collision with the top
  if(enemy_y + player_height > canvas_height) enemy_y = canvas_height - player_height;
}

function ball_movement(){
  ball_x += step_x //+ ball_speed;
  print(ball_speed);
  ball_y += step_y;
}

function ball_collisions(){
  //Ball collision with the top an bottom
  if(ball_y + ball_size/2 > height || ball_y - ball_size/2 < 0) step_y *= -1;

  //Ball collision with the player
  collide_player = collideRectCircle(player_x,player_y,player_width,player_height,ball_x,ball_y,ball_size);
  if (collide_player == true){
    step_x *= -1;
  }
  //Ball collision with the enemy
  collide_enemy = collideRectCircle(enemy_x,enemy_y,player_width,player_height,ball_x,ball_y,ball_size);
  if (collide_enemy == true){
    step_x *= -1;
  }

  //Ball collision with the sides
  if(ball_x + ball_size/2 > width){
    step_y *= random([1,-1]);
    ball_speed = 0;
    ball_x = canvas_width/2;
    ball_y = canvas_height/2;
  }

  if (ball_x - ball_size/2 < 0){
    difficulty += .5;
    step_y *= random([1,-1]);
    ball_speed = 0;
    ball_x = canvas_width/2;
    ball_y = canvas_height/2;
  }
}


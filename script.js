//Canvas Variables
let canvas_width = 600;
let canvas_height = 500;

//ball variables
let ball_size = 25;
let step_x = 5;
let step_y = 6;
let ball_x = canvas_width/2;
let ball_y = canvas_height/2;

//Player variables
let player_height = 80;
let player_width = 15;
let player_x = canvas_width - 2*player_width;
let player_y = canvas_height/2 - player_height/2;

//Enemy variables
let enemy_height = 80;
let enemy_width = 15;
let enemy_x = player_width;
let enemy_y = canvas_height/2 - player_height/2;

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

  move_objects();
  check_collisions();

collide_player = collideRectCircle(player_x,player_y,player_width,player_height,ball_x,ball_y,ball_size);
collide_enemy = collideRectCircle(enemy_x,enemy_y,enemy_width,enemy_height,ball_x,ball_y,ball_size);

if (collide_player == true) {step_x *= -1;}
if (collide_enemy == true) {step_x *= -1;}


}

function move_objects(){
  //Player Movement
  if(keyIsDown(UP_ARROW)) {player_y -= 10;}
  if(keyIsDown(DOWN_ARROW)) {player_y += 10;}
  
  //Enemy Movement
  enemy_y = (ball_y-player_height/2);

  //Ball movement
  ball_x += step_x;
  ball_y += step_y;
}

function check_collisions(){
  //Player collision with the top 
  if(player_y < 0){
    player_y = 0;}
  //Player collision with the bottom
  if(player_y + player_height > canvas_height){
    player_y = canvas_height - player_height;}

  //Enemy collision with the top
  if(enemy_y < 0){
    enemy_y = 0}
  //Enemy collision with the top
  if(enemy_y + player_height > canvas_height){
    enemy_y = canvas_height - player_height}

  //Ball collision with the sides
  if(ball_x + ball_size/2 > width || ball_x - ball_size/2 < 0) {step_x *= -1;}
  //Ball collision with the top an bottom
  if(ball_y + ball_size/2 > height || ball_y - ball_size/2 < 0) {step_y *= -1;}
}

  // //Ball collision with the enemy
  // if(ball_x - ball_size/2 < enemy_x + enemy_width && ball_y - ball_size/2 < enemy_y + enemy_height && ball_y + ball_size/2 > enemy_y){
  //   step_x *= -1;
  // }
  // //Ball colision with the player
  // if(ball_y - ball_size/2 < player_y + player_height && ball_y + ball_size/2 > player_height && ball_x + ball_size/2 > player_x){
  //   step_x *= -1;
  // }

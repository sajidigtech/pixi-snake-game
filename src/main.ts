import { Application, Graphics } from "pixi.js";

import { Direction, Coordinate, Snake } from "./constants/constant";



// enum Direction {
//   Up,
//   Left,
//   Down,
//   Right
// }

// type Coordinate ={
//   x:number , y:number
// }
// type Snake ={
//   head : Coordinate,
//   body:Array<Coordinate>,
//   direction : Direction
// }

(async () => {

  const gridCellSize = 20;


  const snake :Snake = {

    head:{
      x:100,
      y:100
    },
    body :[],

    direction : Direction.Down
  }
 
  const app = new Application();

  


  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window }); 

  let food : Coordinate = {x:200, y:200}

  window.addEventListener('keydown', (keypress)=>{

    if(keypress.key==="ArrowLeft"){
      snake.direction = Direction.Left

    }
    if(keypress.key==="ArrowRight"){
      snake.direction = Direction.Right
      
    }
    if(keypress.key==="ArrowDown"){
      snake.direction = Direction.Down
      
    }
    if(keypress.key==="ArrowUp"){
      snake.direction = Direction.Up
      
    }

  })

  
  document.getElementById("pixi-container")!.appendChild(app.canvas);

   
  const snakeHead = new Graphics().rect(0,0 , gridCellSize, gridCellSize).fill('white');

  const foodGraphic = new Graphics().rect(0,0 , gridCellSize, gridCellSize).fill('red');


  
  // square.anchor.set(0.5);
  //anchor doesnt work on graphics, but works with sprites 

  snakeHead.pivot={x:gridCellSize/2, y:gridCellSize/2}

  

  

  // Add the bunny to the stage
  app.stage.addChild(snakeHead);

  app.stage.addChild(foodGraphic)
  app.ticker.maxFPS = 10;
  
  // Listen for animate update
  app.ticker.add((time) => {

    if(snake.head.x===food.x&&snake.head.y ===food.y){
      console.log("food eaten");
    }

    // logic 
    // snake.head.x += gridCellSize
    // snake.head.y +=gridCellSize;

    if(snake.direction ===Direction.Up){
      snake.head.y-=gridCellSize;
    }
    if(snake.direction===Direction.Down){
      snake.head.y += gridCellSize;

    }
    if(snake.direction===Direction.Right){
      snake.head.x+=gridCellSize;
      
    }
    if(snake.direction===Direction.Left){

      snake.head.x-=gridCellSize
      
    }

    
    // square.rotation += 0.1 * time.deltaTime;

    snakeHead.position.set(snake.head.x, snake.head.y);
    foodGraphic.position.set(food.x, food.y)
  });
})();
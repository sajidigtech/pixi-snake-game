import { Application, Container, Graphics } from "pixi.js";

enum Direction {
  Up,
  Left,
  Down,
  Right
}

type Coordinate = {
  x: number, y: number
}
type Snake = {
  head: Coordinate,
  body: Array<Coordinate>,
  direction: Direction
}

function createRandomCoordinate(grid: number): Coordinate {


  return {
    x: Math.floor(Math.random() * (200 / grid)) * grid,
    y: Math.floor(Math.random() * (200 / grid)) * grid

  }



}



(async () => {

  const gridCellSize = 20;

  let score :number = 0


  const snake: Snake = {

    head: createRandomCoordinate(gridCellSize),
    body: [],

    direction: Direction.Down
  }

  const app = new Application();




  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  let food: Coordinate = createRandomCoordinate(gridCellSize);

  window.addEventListener('keydown', (keypress) => {

    if (keypress.key === "ArrowLeft") {
      snake.direction = Direction.Left

    }
    if (keypress.key === "ArrowRight") {
      snake.direction = Direction.Right

    }
    if (keypress.key === "ArrowDown") {
      snake.direction = Direction.Down

    }
    if (keypress.key === "ArrowUp") {
      snake.direction = Direction.Up

    }

  })


  document.getElementById("pixi-container")!.appendChild(app.canvas);


  const snakeHead = new Graphics().rect(0, 0, gridCellSize, gridCellSize).fill('white');

  const foodGraphic = new Graphics().rect(0, 0, gridCellSize, gridCellSize).fill('red');

  const bodyGraphic = new Container()


  // square.anchor.set(0.5);
  //anchor doesnt work on graphics, but works with sprites 

  snakeHead.pivot = { x: gridCellSize / 2, y: gridCellSize / 2 }







  app.stage.addChild(foodGraphic);
  app.stage.addChild(snakeHead);
  app.stage.addChild(bodyGraphic);









  app.ticker.maxFPS = 1;

  // Listen for animate update
  app.ticker.add(() => {

    // snake.body.unshift({
    //   x: snake.head.x,
    //   y: snake.head.y
    // })

    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    

    if (snake.head.x === food.x && snake.head.y === food.y) {

      snake.body.push({ x: snake.head.x, y: snake.head.y });
      score+=1;

      


      food = createRandomCoordinate(gridCellSize)
    } 
    else{
      snake.body.pop()
    }

    

    // snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    //  snake.body.pop();

    // logic 
    // snake.head.x += gridCellSize
    // snake.head.y +=gridCellSize;

    if (snake.direction === Direction.Up) {
      snake.head.y -= gridCellSize;
    }
    if (snake.direction === Direction.Down) {
      snake.head.y += gridCellSize;

    }
    if (snake.direction === Direction.Right) {
      snake.head.x += gridCellSize;

    }
    if (snake.direction === Direction.Left) {

      snake.head.x -= gridCellSize

    }

    if(snake.body.some((body)=>body.x===snake.head.x&&body.y===snake.head.y)){

       alert("game over :  score : "+ score);
      snake.body = []

     
      return;
    }




    snakeHead.position.set(snake.head.x, snake.head.y);
    foodGraphic.position.set(food.x, food.y);

    bodyGraphic.removeChildren();


    for (const body of snake.body) {
      const snakeBody = new Graphics().rect(body.x, body.y, gridCellSize, gridCellSize).fill('grey');
      bodyGraphic.addChild(snakeBody)

    }


  });
})();
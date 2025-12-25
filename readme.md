# 🐍 Simple Snake Game (PixiJS)

This is a very basic Snake game built using **PixiJS** and **TypeScript**.  
The goal of this project is to understand **game loop, x-y positioning, and illusion of movement** — not performance optimization.

---

## 📦 Tech Used

- PixiJS
- TypeScript
- Basic Game Loop (`app.ticker`)

---

## 🧱 Grid System

- Each block (snake head, body, food) is of size `20 x 20`
- The game works on a grid, not free pixels

```ts
const gridCellSize = 20;


type Coordinate = {
  x: number,
  y: number
}


{ x: 60, y: 80 }

60px from left

80px from top



type Snake = {
  head: Coordinate,
  body: Coordinate[],
  direction: Direction


}


head → white square

body → grey squares (array of positions)

direction → where the snake moves


app.ticker.maxFPS = 1;

Game runs at 1 frame per second

This makes movement easy to understand

Every frame = one snake step



snake.body.unshift({ x: snake.head.x, y: snake.head.y });

Old head position is added to front of body array

This makes body follow head


if (snake.head.x === food.x && snake.head.y === food.y) {
  snake.body.push({ x: snake.head.x, y: snake.head.y });
  food = createRandomCoordinate(gridCellSize);
} else {
  snake.body.pop();
}

If food is eaten → do not remove tail

If food is not eaten → remove last body block

This keeps body size same unless food is eaten


head movement : 

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
  snake.head.x -= gridCellSize;
}


🎭 Illusion of Body Movement
❌ Body blocks do NOT move
✅ Only new positions are drawn every frame

bodyGraphic.removeChildren();
Removes all old grey blocks from screen

for (const body of snake.body) {
  const snakeBody = new Graphics()
    .rect(body.x, body.y, gridCellSize, gridCellSize)
    .fill('grey');
  bodyGraphic.addChild(snakeBody);
} this happens in ticker 

if (
  snake.body.some(
    body => body.x === snake.head.x && body.y === snake.head.y
  )
) {
  snake.body = [];
}
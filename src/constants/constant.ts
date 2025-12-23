export enum Direction {
  Up,
  Left,
  Down,
  Right
}

export type Coordinate ={
  x:number , y:number
}

export type Snake ={
  head : Coordinate,
  body:Array<Coordinate>,
  direction : Direction
}
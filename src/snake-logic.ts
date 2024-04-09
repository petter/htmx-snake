type Dir = "up" | "down" | "left" | "right";
type Pos = [number, number];

export interface Snake {
  id: number;
  color: string;
  dir: Pos;
  snake: Array<Pos>;
  keyBuffer: Array<Dir>;
}

export class SnakeEngine {
  gridSize = 20;
  initialSnakeLength = 3;
  private nextSnakeId = 0;
  private _snakes: Record<number, Snake> = {};
  get snakes() {
    return this._snakes;
  }

  addSnake = (color: string): number => {
    const id = this.nextSnakeId++;
    const newSnake = {
      id,
      color,
      dir: [1, 0] as Pos,
      snake: Array(this.initialSnakeLength)
        .fill(0)
        .map(
          (_, i) => [this.initialSnakeLength - i - 1, 0] as Pos
        ) as Array<Pos>,
      keyBuffer: [],
    };
    this._snakes[id] = newSnake;
    return id;
  };

  removeSnake = (id: number) => {
    delete this._snakes[id];
  };

  registerKey = (id: number, dir: Dir) => {
    this._snakes[id].keyBuffer.push(dir);
  };

  step = () => {
    Object.entries(this._snakes).map(([id, snake]) => {
      const pressedKey = snake.keyBuffer.shift();
      snake.dir = this.calcNextSnakeDir(snake, pressedKey);
      snake.snake = this.calcNextSnake(snake);
    });
  };

  private calcNextSnakeDir = (
    snake: Snake,
    requestDir: Dir | undefined
  ): Pos => {
    const curDir = snake.dir;
    if (!requestDir) {
      return curDir;
    }

    const curMoveAxis = curDir[0] === 0 ? "vertical" : "horizontal";
    const requestMoveAxis =
      requestDir === "up" || requestDir === "down" ? "vertical" : "horizontal";
    if (curMoveAxis === requestMoveAxis) {
      return curDir;
    }

    switch (requestDir) {
      case "up":
        return [0, -1];
      case "down":
        return [0, 1];
      case "left":
        return [-1, 0];
      case "right":
        return [1, 0];
    }
  };

  private calcNextSnake = (snake: Snake): Array<Pos> => {
    const [dx, dy] = snake.dir;
    const [hx, hy] = snake.snake[0];
    const newHead: [number, number] = [
      (hx + dx) % this.gridSize,
      (hy + dy) % this.gridSize,
    ];
    if (newHead[0] < 0) newHead[0] = this.gridSize - 1;
    if (newHead[1] < 0) newHead[1] = this.gridSize - 1;
    return [newHead, ...snake.snake.slice(0, -1)];
  };
}

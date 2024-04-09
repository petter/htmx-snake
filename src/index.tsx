import { Hono } from "hono";
import { streamSSE } from "hono/streaming";

import { HomePage } from "./pages/home";
import { Board } from "./pages/board";
import { SnakeEngine } from "./snake-logic";

const app = new Hono();

const engine = new SnakeEngine();

app.get("/", (c) => {
  return c.html(<HomePage />);
});

(["up", "down", "left", "right"] as const).forEach((dir) => {
  app.post(`/${dir}`, async (c) => {
    const body = await c.req.parseBody();
    const snakeId = +body["snakeId"];
    engine.registerKey(snakeId, dir);
    return c.text("ok");
  });
});

app.get("/snake", (c) => {
  let tick = 0;
  let dead = false;

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
  const mySnake = engine.addSnake(
    colors[Math.floor(Math.random() * colors.length)]
  );

  return streamSSE(c, async (stream) => {
    stream.onAbort(() => {
      dead = true;
      engine.removeSnake(mySnake);
    });

    while (!dead) {
      await stream.writeSSE({
        event: "tick",
        data: String(
          <>
            <input type="hidden" name="snakeId" id="snakeId" value={mySnake} />
            <Board
              snakes={Object.values(engine.snakes)}
              boardSize={engine.gridSize}
            />
          </>
        ),
        id: String(tick++),
      });
      await stream.sleep(150);
      engine.step();
    }
  });
});

export default app;

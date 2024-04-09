import type { Snake } from "../snake-logic";

interface Props {
  snakes: Array<Snake>;
  boardSize: number;
}

export function Board({ snakes, boardSize }: Props) {
  const snakePositions = Object.fromEntries(
    Object.values(snakes).flatMap((s) =>
      s.snake.map(([x, y]) => [`${x},${y}`, s.color])
    )
  );

  return (
    <div class="flex flex-col">
      {new Array(boardSize).fill(0).map((_, y) => (
        <div class="flex">
          {new Array(boardSize).fill(0).map((_, x) => (
            <div
              class={[
                "w-8 pt-8 border border-green-900/50",
                snakePositions[`${x},${y}`] ?? "bg-black",
              ].join(" ")}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

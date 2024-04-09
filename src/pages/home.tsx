import { RootLayout } from "../layouts/root";

export function HomePage() {
  return (
    <RootLayout>
      <div class="w-full h-full flex flex-col items-center justify-center gap-4">
        <div class="border-green-500 border-4">
          <div hx-ext="sse" sse-connect="/snake" sse-swap="tick"></div>
        </div>
        <div>
          {["Up", "Down", "Left", "Right"].map((dir) => (
            <button
              hx-post={`/${dir.toLowerCase()}`}
              hx-include="#snakeId, #snakeColor"
              hx-trigger={`click, keydown[key==='Arrow${dir}'] from:body`}
              hx-swap="none"
            >
              {dir}
            </button>
          ))}
        </div>
      </div>
    </RootLayout>
  );
}

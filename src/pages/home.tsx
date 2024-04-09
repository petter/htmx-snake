import { RootLayout } from "../layouts/root";

export function HomePage() {
  return (
    <RootLayout>
      <div class="w-full h-full flex flex-col items-center justify-center gap-4">
        <div class="border-green-500 border-4">
          <div hx-ext="sse" sse-connect="/snake" sse-swap="tick"></div>
        </div>
        <div class='grid gap-2 [grid-template-areas:"._up_."_"left_down_right"]'>
          {[
            { dir: "Up", icon: "^" },
            { dir: "Down", icon: "v" },
            { dir: "Left", icon: "<" },
            { dir: "Right", icon: ">" },
          ].map(({ dir, icon }) => (
            <button
              hx-post={`/${dir.toLowerCase()}`}
              hx-include="#snakeId, #snakeColor"
              hx-trigger={`click, keydown[key==='Arrow${dir}'] from:body`}
              hx-swap="none"
              class="px-3 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg shadow-outer"
              style={{ gridArea: dir.toLowerCase() }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </RootLayout>
  );
}

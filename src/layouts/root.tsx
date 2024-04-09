import styles from "./index.css?url";

export function RootLayout({
  children,
}: {
  children: JSX.Element | Iterable<JSX.Element>;
}) {
  return (
    <html>
      <head>
        <title>My App</title>
        <link rel="stylesheet" href={styles} />
        <script src="https://unpkg.com/htmx.org@1.9.11"></script>
        <script src="https://unpkg.com/htmx.org@1.9.11/dist/ext/sse.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}

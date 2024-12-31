import { html } from "hono/html";

export function PageHead(props: { title: string; description: string }) {
  const { title, description } = props;
  return (
    <head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <script src="https://unpkg.com/htmx.org@1.9.12" />

      <link href="style.css" rel="stylesheet" />
    </head>
  );
}

export function PageHead(props: {
  title: string;
  description: string;
  refresh?: number;
}) {
  const { title, description, refresh = -1 } = props;
  return (
    <head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <script src="https://unpkg.com/htmx.org@1.9.12" />
      <script src="https://cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@0.9.15/dist/index.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@undecaf/barcode-detector-polyfill@0.9.21/dist/index.js"></script>
      <script src="./barcode-detect.js" />

      <link href="style.css" rel="stylesheet" />
      {refresh >= 0 ? (
        <meta http-equiv="refresh" content={`${refresh}; url=/`} />
      ) : null}
    </head>
  );
}

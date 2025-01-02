import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";

export const ScanPage = (c: Context) => {
  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="Scan - Simple Inventory"
          description="Scan products in/out of the inventory."
        />
        <body>
          <header>
            <h1>Scan</h1>
          </header>
          <main>
            <button>IN</button>
            <button>OUT</button>
          </main>
        </body>
      </html>
    </>
  );
};

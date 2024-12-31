import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";

export const HomePage = (c: Context) => {
  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="Simple Inventory"
          description="A simple inventory system."
        />
        <body>
          <header>
            <h1>Simple Inventory</h1>
          </header>
          <main>
            <button>PRODUCTS</button>
            <button>INVENTORY</button>
          </main>
          <footer>
            <p id="footer-notice">Made with love by Manuel Dionne</p>
          </footer>
        </body>
      </html>
    </>
  );
};

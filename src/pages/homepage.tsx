import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import {
  INVENTORY_PAGE_PATH,
  PRODUCTS_PAGE_PATH,
  SCAN_PAGE_PATH,
} from "@/constants";

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
            <div class="homepage-buttons">
              <a class="link-button" href={PRODUCTS_PAGE_PATH}>
                PRODUCTS
              </a>
              <a class="link-button" href={INVENTORY_PAGE_PATH}>
                INVENTORY
              </a>
              <a class="link-button" href={SCAN_PAGE_PATH}>
                SCAN
              </a>
            </div>
          </main>
          <footer>
            <p id="footer-notice">Made with love by Manuel Dionne</p>
          </footer>
        </body>
      </html>
    </>
  );
};

import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import { INVENTORY_TABLE_PATH } from "@/constants";

export const InventoryPage = (c: Context) => {
  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="Inventory - Simple Inventory"
          description="View the inventory."
        />
        <body>
          <header>
            <h1>Inventory</h1>
          </header>
          <main>
            <input
              class="search-bar"
              type="search"
              name="search"
              placeholder="Search inventory..."
              hx-post={INVENTORY_TABLE_PATH}
              hx-trigger="input changed delay:200ms, keyup[key=='Enter'], load"
              hx-target=".table-container"
            />
            <div class="table-container"></div>
          </main>
        </body>
      </html>
    </>
  );
};

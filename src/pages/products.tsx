import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import { PRODUCTS_TABLE_PATH } from "@/constants";

export const ProductsPage = (c: Context) => {
  // TODO: add a way to print custom labels and add custom products
  // TODO: add product count too maybe?
  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="Products - Simple Inventory"
          description="All the products in the system."
        />
        <body>
          <header>
            <h1>Products</h1>
          </header>
          <main>
            <input
              class="search-bar"
              type="search"
              name="search"
              placeholder="Search products..."
              hx-post={PRODUCTS_TABLE_PATH}
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

import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import { SUBMIT_CUSTOM_PRODUCT_PATH } from "@/constants";

export const AddCustomProductPage = (c: Context) => {
  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="Custom Products - Simple Inventory"
          description="Add a custom product."
        />
        <body>
          <header>
            <h1>Custom Product</h1>
          </header>
          <script src="add-custom-product.js" />
          <main>
            <form
              method="post"
              id="custom-product-form"
              action={SUBMIT_CUSTOM_PRODUCT_PATH}
            >
              <label>
                Name:
                <input type="text" name="name" required />
              </label>

              <label>
                Description:
                <input type="text" name="description" required />
              </label>

              <label>
                Size:
                <input type="text" name="size" required />
              </label>
              <button
                id="submit-product"
                class="scan-button"
                onclick="onSubmitCustomProduct();"
              >
                SUBMIT
              </button>
            </form>
          </main>
        </body>
      </html>
    </>
  );
};

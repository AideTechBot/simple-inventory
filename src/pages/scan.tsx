import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import { SCAN_SUBMIT_PAGE_PATH } from "@/constants";

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
            <video id="scan-canvas" autoplay></video>
            <script src="scan.js" />
            <button id="scan-product" class="scan-button" onclick="onScan();">
              SCAN
            </button>
            <form id="scan-form" action={SCAN_SUBMIT_PAGE_PATH}>
              <label>
                UPC:
                <input id="scan-upc" type="hidden" name="upc" readonly />
              </label>

              <label>
                Expiration Date:
                <input
                  required
                  type="date"
                  name="expiration"
                  value="expiration"
                />
              </label>

              <label>
                <input required type="radio" name="check-in" value="true" />
                Check-In
              </label>

              <label>
                <input required type="radio" name="check-in" value="false" />
                Check-Out
              </label>

              <button
                id="submit-product"
                class="scan-button"
                onclick="onSubmit();"
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

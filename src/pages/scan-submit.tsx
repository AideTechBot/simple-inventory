import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import { executeQuery, runQuery } from "@/database";

export const ScanSubmit = async (c: Context) => {
  const body = await c.req.formData();

  const upc = body.get("upc");
  const expiration = body.get("expiration");
  const checkedIn = body.get("check-in") === "true";
  const locationId = body.get("locationId");

  const name = body.get("name");
  const description = body.get("description");
  const size = body.get("size");

  // if to show alert that the scan did nothing
  let showAlert = false;

  if (checkedIn) {
    // If the product doesn't exist, create it.
    let productId;
    if (name) {
      const { lastInsertRowid } = runQuery(
        `INSERT INTO products (upc,custom,name,description,size) VALUES ('${upc}',false,'${name}','${description}','${size}')`
      );
      productId = lastInsertRowid;
    } else {
      const [{ foundProductId }] = executeQuery(
        `SELECT productId as foundProductId FROM products WHERE products.upc = '${upc}'`
      ) as any;
      productId = foundProductId;
    }

    // add the item to the inventory
    runQuery(
      `INSERT INTO inventory (productId,locationId,added,expiration,removed) VALUES ('${productId}',${locationId},CURRENT_DATE,'${expiration}',NULL)`
    );
  } else {
    const result = executeQuery(
      `SELECT productId FROM products WHERE products.upc = '${upc}'`
    ) as any;
    const productId = result?.[0]?.productId;
    if (productId) {
      const { changes } = runQuery(
        `UPDATE inventory SET removed = CURRENT_DATE WHERE inventoryId = (SELECT inventoryId FROM inventory WHERE removed IS NULL AND inventory.expiration = '${expiration}' AND inventory.locationId = '${locationId}' AND inventory.productId = '${productId}' LIMIT 1);`
      );
      if (changes === 0) {
        showAlert = true;
      }
    }
  }

  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="Submit - Simple Inventory"
          description="Submitting..."
          refresh={showAlert ? 2 : 0}
        />
        <body>
          <header>
            <h1>
              {showAlert
                ? "Could not find product to check out."
                : "Please wait..."}
            </h1>
          </header>
        </body>
      </html>
    </>
  );
};

import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import { executeQuery, runQuery } from "@/database";

export const ScanSubmit = async (c: Context) => {
  const body = await c.req.formData();

  const upc = body.get("upc");
  const quantity = body.get("quantity");
  const checkedIn = body.get("check-in") === "true";
  const locationId = body.get("locationId");

  const name = body.get("name");
  const description = body.get("description");
  const size = body.get("size");

  // if to show alert that the scan did nothing
  let showAlert = false;

  if (checkedIn) {
    let productId;
  
    // Get or create the product
    if (name) {
      const { lastInsertRowid } = runQuery(
        `INSERT INTO products (upc, custom, name, description, size) VALUES ('${upc}', false, '${name}', '${description}', '${size}')`
      );
      productId = lastInsertRowid;
    } else {
      const [{ foundProductId }] = executeQuery(
        `SELECT productId as foundProductId FROM products WHERE upc = '${upc}'`
      ) as any;
      productId = foundProductId;
    }
  
    // Check if the product already exists in inventory at this location
    const existing = executeQuery(
      `SELECT inventoryId FROM inventory WHERE removed IS NULL AND locationId = ${locationId} AND productId = ${productId} LIMIT 1`
    ) as any;
  
    if (existing.length > 0) {
      // Update quantity if exists
      runQuery(
        `UPDATE inventory SET quantity = quantity + ${quantity} WHERE inventoryId = ${existing[0].inventoryId}`
      );
    } else {
      // Insert new inventory record
      runQuery(
        `INSERT INTO inventory (productId, locationId, added, quantity, removed) VALUES (${productId}, ${locationId}, CURRENT_DATE, ${quantity}, NULL)`
      );
    }
  } else {
    const result = executeQuery(
      `SELECT productId FROM products WHERE products.upc = '${upc}'`
    ) as any;
    const productId = result?.[0]?.productId;
    if (productId) {
      const { changes } = runQuery(
        `UPDATE inventory SET quantity = CASE WHEN quantity - ${quantity} >= 0 THEN quantity - ${quantity} ELSE 0 END, removed = CASE WHEN quantity - ${quantity} <= 0 THEN CURRENT_DATE ELSE NULL END WHERE inventoryId = (SELECT inventoryId FROM inventory WHERE removed IS NULL AND locationId = '${locationId}' AND productId = '${productId}' LIMIT 1);`
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

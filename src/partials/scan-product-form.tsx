import { executeQuery } from "@/database";
import type { Context } from "hono";

export const ScanProductForm = async (c: Context) => {
  const upc = ((await c.req.formData()).get("upc") as string) ?? "";

  const products: any[] = executeQuery(
    `SELECT * FROM products WHERE products.upc = '${upc}'`
  );

  // If the product already exists, we don't need information
  if (products.length > 0) {
    return c.html(<></>);
  }

  // If it doesn't exist, we return the form to get information
  return c.html(
    <>
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
    </>
  );
};

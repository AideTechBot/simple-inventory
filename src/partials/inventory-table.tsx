import type { Context } from "hono";
import { executeQuery } from "@/database";

export const InventoryTable = async (c: Context) => {
  const search = (await c.req.formData()).get("search");

  // TODO: filter by remove date and group by location, product, expiry, added
  // maybe make this an option
  const inventory: any[] = executeQuery(
    `SELECT products.name, products.size, locations.name as location, inventory.* FROM inventory INNER JOIN products ON inventory.productId = products.productId INNER JOIN locations ON locations.locationId = inventory.locationId WHERE products.name LIKE '%${search}%' OR products.upc LIKE '%${search}%' OR products.size LIKE '%${search}%' OR locations.name LIKE '%${search}%'`
  );

  if (inventory.length === 0) {
    return c.html(<></>);
  }

  const headers = Object.keys(inventory[0]).filter(
    (header) =>
      header !== "productId" &&
      header !== "inventoryId" &&
      header !== "locationId"
  );

  return c.html(
    <table>
      <tr>
        {headers.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
      {inventory.map((product) => (
        <tr>
          {headers.map((header) => (
            <td>{product?.[header]}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

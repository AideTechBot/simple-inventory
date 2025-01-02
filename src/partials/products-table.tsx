import type { Context } from "hono";
import { executeQuery } from "@/database";

export const ProductsTable = async (c: Context) => {
  const search = (await c.req.formData()).get("search");

  const products: any[] = executeQuery(
    `SELECT * FROM products WHERE products.name LIKE '%${search}%' OR products.upc LIKE '%${search}%' OR products.description LIKE '%${search}%' OR products.size LIKE '%${search}%'`
  );

  if (products.length === 0) {
    return c.html(<></>);
  }

  const headers = Object.keys(products[0]).filter(
    (header) => header !== "productId"
  );

  return c.html(
    <table>
      <tr>
        {headers.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
      {products.map((product) => (
        <tr>
          {headers.map((header) => (
            <td>{product?.[header]}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

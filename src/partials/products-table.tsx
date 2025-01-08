import type { Context } from "hono";
import { executeQuery } from "@/database";
import { VIEW_QR_CODE_PATH } from "@/constants";

export const ProductsTable = async (c: Context) => {
  const search = (await c.req.formData()).get("search");

  const products: any[] = executeQuery(
    `SELECT upc, name, description, size, custom as QR FROM products WHERE products.name LIKE '%${search}%' OR products.upc LIKE '%${search}%' OR products.description LIKE '%${search}%' OR products.size LIKE '%${search}%'`
  );

  if (products.length === 0) {
    return c.html(<></>);
  }

  // TODO: add a way to print custom labels and add custom products
  // TODO: add product count too maybe?
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
            <td>
              {header === "QR" ? (
                <a href={`${VIEW_QR_CODE_PATH}/${product.upc}`}>VIEW</a>
              ) : (
                product?.[header]
              )}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

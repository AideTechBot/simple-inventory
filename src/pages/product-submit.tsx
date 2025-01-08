import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";
import { runQuery } from "@/database";

const _getRandomNumber = (digits: number) =>
  Math.floor(Math.random() * 9 * 10 ** (digits - 1)) + 10 ** (digits - 1);

export const ProductSubmit = async (c: Context) => {
  const body = await c.req.formData();
  const upc = _getRandomNumber(18); //random 18 digit number, hopefully we dont get the same twice
  const name = body.get("name");
  const description = body.get("description");
  const size = body.get("size");

  runQuery(
    `INSERT INTO products (upc,custom,name,description,size) VALUES ('${upc}',true,'${name}','${description}','${size}')`
  );

  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="Submit - Simple Inventory"
          description="Submitting..."
          refresh={0}
        />
        <body>
          <header>
            <h1>Please wait...</h1>
          </header>
        </body>
      </html>
    </>
  );
};

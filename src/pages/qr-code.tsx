import { html } from "hono/html";
import type { Context } from "hono";
import { PageHead } from "@/components/head";

export const QrCodePage = (c: Context) => {
  const upc = c.req.param("upc");

  return c.html(
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <PageHead
          title="QRCode - Simple Inventory"
          description="View the QR code of a product."
        />
        <body>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
            integrity="sha512-CNgIRecGo7nphbeZ04Sc13ka07paqdeTu0WR1IM4kNcpmBAUSHSQX0FslNhTDadL4O5SAGapGt4FodqL8My0mA=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          ></script>
          <main>
            <div id="qrcode"></div>

            <script
              dangerouslySetInnerHTML={{
                __html: `
          const qrContainer = document.getElementById('qrcode');
          new QRCode(qrContainer, {
            text: '${upc}',
            width: 256,
            height: 256
          });
        `,
              }}
            />
          </main>
        </body>
      </html>
    </>
  );
};

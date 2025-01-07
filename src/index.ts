import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { HomePage } from "./pages/homepage";
import { ProductsPage } from "./pages/products";
import { InventoryPage } from "./pages/inventory";
import { ScanPage } from "./pages/scan";
import {
  HOME_PAGE_PATH,
  INVENTORY_PAGE_PATH,
  INVENTORY_TABLE_PATH,
  PRODUCTS_PAGE_PATH,
  PRODUCTS_TABLE_PATH,
  SCAN_PAGE_PATH,
  SCAN_SUBMIT_PAGE_PATH,
} from "./constants";
import { ProductsTable } from "./partials/products-table";
import { InventoryTable } from "./partials/inventory-table";

export const log = (message: string, ...rest: string[]) => {
  console.log(`[${new Date().toLocaleString()}]`, message, ...rest);
};

const app = new Hono();

// Set up logging
app.use("*", logger(log));

// Serve static files from the `public` folder
app.use("*", serveStatic({ root: "./public" }));
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

// Log all requests
app.use("*", logger());

// Map all route endpoints to pages
app.get(HOME_PAGE_PATH, HomePage);
app.get(PRODUCTS_PAGE_PATH, ProductsPage);
app.get(INVENTORY_PAGE_PATH, InventoryPage);
app.get(SCAN_PAGE_PATH, ScanPage);
app.post(PRODUCTS_TABLE_PATH, ProductsTable);
app.post(INVENTORY_TABLE_PATH, InventoryTable);
app.post(SCAN_SUBMIT_PAGE_PATH, InventoryTable);

export default app;

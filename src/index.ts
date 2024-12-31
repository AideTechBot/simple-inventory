import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { HomePage } from "./routes/homepage";

export const log = (message: string, ...rest: string[]) => {
  console.log(`[${Date.now().toString()}]`, message, ...rest);
};

const app = new Hono();

// Set up logging
app.use("*", logger(log));

// Serve static files from the `public` folder
app.use("*", serveStatic({ root: "./public" }));
app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

// Log all requests
app.use("*", logger());

// Map all route endpoint handlers
app.get("/", HomePage);

export default app;

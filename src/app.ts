import "reflect-metadata";
import router from "./routes";
import { AppDataSource } from "./data-source.ts";
import { readFileSync } from "fs";
import { join } from "path";
import { swaggerSpec } from "./config/swagger.ts";

AppDataSource.initialize()
  .then(() => {
    Bun.serve({
      port: parseInt(process.env.PORT || "3000"),
      async fetch(req: Request) {
        const url = new URL(req.url);

        // Serve Swagger UI
        if (url.pathname === "/api-docs") {
          const swaggerHtml = readFileSync(
            join(__dirname, "../node_modules/swagger-ui-dist/index.html"),
            "utf-8",
          );
          return new Response(
            swaggerHtml.replace(
              "https://petstore.swagger.io/v2/swagger.json",
              "/swagger.json",
            ),
            {
              headers: { "Content-Type": "text/html" },
            },
          );
        }

        // Serve OpenAPI specification
        if (url.pathname === "/swagger.json") {
          return new Response(JSON.stringify(swaggerSpec), {
            headers: { "Content-Type": "application/json" },
          });
        }

        // Handle API routes
        return router.match(req);
      },
    });

    console.log(
      `Server running on http://localhost:${process.env.PORT || 3000}`,
    );
  })
  .catch((error) => console.log(error));

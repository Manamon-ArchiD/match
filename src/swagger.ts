export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
          title: "Swagger API - Match service",
          version: "1.0.0",
        },
        schemes: ["http", "https"],
      },    
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    apis: [
        `./src/presentation/routes/**/*.ts`,
        "./dist/presentation/routes/**/*.js",
        `./src/models/*.ts`,
        "./dist/models/*.js"
    ],
};
export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
          title: "Swagger API pour le match service",
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
        `./src/routes/*.ts`,
        "./dist/src/routes/*.js",
        `./src/models/*.ts`,
        "./dist/src/models/*.js"
    ],
};
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the application",
    },
    servers: [
      {
        url: "http://localhost:3000", // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Point to your route files
};

const specs = swaggerJsdoc(options);
module.exports = specs;

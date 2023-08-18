require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 5000;
const categoriesRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

//swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description:
        "This is e-commerce api made with express and documented with swagger",
      contact: {
        name: "Vivek Pratap Singh",
        url: "https://vivek-pratap-singh.vercel.app/",
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//models of the database
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const UserCart = require("./models/UserCart");

//connecting to the database
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Not found!");
});

app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

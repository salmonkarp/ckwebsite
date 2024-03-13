// requirements
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const userAuthentication = require("./userAuthentication");

// environment variables
const port = 3000;
const orderPassword = process.env.ORDER_PASSWORD;
const invoicePassword = process.env.INVOICE_PASSWORD;

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "randomString",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

// // Core Website / Login Routes

app.get("/", (req, res) => {
  if (req.session.user === "order") {
    res.redirect("/orderDashboard");
  } else if (req.session.user === "invoice") {
    res.redirect("/invoiceDashboard");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { userType, password } = req.body;
  if (userType === "order" && password === orderPassword) {
    req.session.user = userType;
    res.redirect("/orderDashboard");
  } else if (userType === "invoice" && password === invoicePassword) {
    req.session.user = userType;
    res.redirect("/invoiceDashboard");
  } else {
    res.render("login");
  }
  console.log(req.session.user);
});

// Other Routes
const orderRoutes = require("./siteRoutes/orderRoutes");
app.use("/orderDashboard", userAuthentication, orderRoutes);

app.listen(port, () => {
  console.log(`Node Website is running on port ${port}.`);
});

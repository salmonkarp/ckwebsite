require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const api_key = process.env.API_KEY;

router.get("/", (req, res) => {
  const headers = {
    "x-api-key": api_key,
  };
  let orderArray = [];
  axios
    .get("https://ckapi-gph0.onrender.com/api/aggregation/orderDetail", {
      headers,
    })
    .then((response) => {
      orderArray.push(response.data);
      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = 5;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slicedData = orderArray.slice(startIndex, endIndex)[0];
      const totalPages = Math.ceil(orderArray.length / itemsPerPage);
      res.render("orderDashboard", { page, totalPages, slicedData });
    })
    .catch((error) => {
      console.error(error);
      res.render("error");
    });
});

module.exports = router;

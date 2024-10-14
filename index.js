const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

//Server side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalPrice = newItemPrice + cartTotal;
  res.send(totalPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let finalPrice;
  if (isMember === 'true') {
    finalPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let estimatedDays;
  if (shippingMethod === 'express') {
    estimatedDays = Math.ceil(distance / 100);
  } else {
    estimatedDays = Math.ceil(distance / 50);
  }
  res.send(estimatedDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if (shippingMethod === 'Express') {
    let estimatedDays = Math.ceil(distance / 100);
  } else {
    let estimatedDays = Math.ceil(distance / 50);
  }
  res.send(estimatedDays.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

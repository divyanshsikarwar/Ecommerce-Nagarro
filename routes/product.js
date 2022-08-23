const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.render("products/index", { products });
  } catch (e) {
    console.log("Products Error");
    req.flash("error", "Something went Wrong!");
    res.render("error");
  }
});

router.get("/products/new", (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    console.log("New Element Not possible to add");
    req.flash("error", "Something went Wrong!");
    res.render("error");
  }
});

router.post("/products", async (req, res) => {
  try {
    const { product } = req.body;
    await Product.create(product);
    req.flash("success", "product created successfully"); 
    res.redirect("/products");
  } catch (e) {
    console.log("something went wrong product 2");
    req.flash("error", "Something went Wrong!");
    res.render("error");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("reviews");
    res.render("products/show", { product });
  } catch (e) {
    console.log("something went wrong id ");
    req.flash(
      "error",
      "Something went Wrong!"
    );

    res.redirect("/error");
  }
});

router.get("/products/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
  } catch (e) {
    console.log("something went wrong !");
    req.flash(
      "error",
      "Something went Wrong!"
    );
    res.render("error");
  }
});

router.patch("/products/:id", async (req, res) => {
  try {
    const { product } = req.body;
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, product);
    req.flash("success", "product updated succesfully");
    res.redirect(`/products/${req.params.id}`);
  } catch (e) {
    console.log("something went wrong");
    req.flash("error", "Something went Wrong!");
    res.render("error");
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (e) {
    console.log("something went wrong");
    req.flash("error", "Something went Wrong!");
    res.render("error");
  }
});

router.post("/products/:id/review", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const review = new Review({
      user: req.user.username,
      ...req.body,
    });
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${id}`);
  } catch (e) {
    console.log("something went wrong");
    req.flash("error", "Something went Wrong!");
    res.render("error");
  }
});

router.delete("/products/:id/:idreview", async (req, res) => {
  try {
    const { idreview } = req.params;
    await Review.findByIdAndDelete(idreview);
    res.redirect(`/products/${req.params.id}`);
  } catch (e) {
    console.log("something went wrong");
    req.flash(
      "error",
      "Something went Wrong!"
    );
    res.render("error");
  }
});

module.exports = router;
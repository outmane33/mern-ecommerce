const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const fs = require("fs");
const path = require("path");
const { imageUploadUtil } = require("../utils/cloudinary");
const Product = require("../models/productModel");
const ApiFeature = require("../utils/apiFeature");

exports.handleImageUpload = expressAsyncHandler(async (req, res, next) => {
  try {
    // Check if req.file is defined
    if (!req.file) {
      return next(new ApiError("No file uploaded", 400));
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred",
    });
  }
});

exports.addProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    product,
  });
});

//get product by id
exports.getProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});
//get product by title
exports.getProductBySlug = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});

exports.getAllProducts = expressAsyncHandler(async (req, res, next) => {
  // Initialize API features without pagination first
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .filter()
    .sort()
    .fields()
    .search("Product");

  // Get color counts using aggregation
  const colorCounts = await Product.aggregate([
    {
      $match: apiFeature.mongooseQuery.getQuery(),
    },
    {
      $unwind: "$colors", // Assuming colors is an array in your product schema
    },
    {
      $group: {
        _id: "$colors",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        color: "$_id",
        count: 1,
      },
    },
  ]);

  // Convert to object format for easier frontend use
  const colorCountObject = {
    Beige: 0,
    Black: 0,
    Blue: 0,
    Brown: 0,
    Gray: 0,
    Green: 0,
    Orange: 0,
    White: 0,
    Yellow: 0,
  };

  // Fill in the actual counts
  colorCounts.forEach(({ color, count }) => {
    if (colorCountObject.hasOwnProperty(color)) {
      colorCountObject[color] = count;
    }
  });

  // Get the filtered count before pagination
  const filteredCount = await Product.countDocuments(
    apiFeature.mongooseQuery.getQuery()
  );

  // Apply pagination after getting the filtered count
  apiFeature.pagination(filteredCount);

  // Execute the final query
  const { mongooseQuery, paginationResult } = apiFeature;
  const products = await mongooseQuery;

  res.status(200).json({
    status: "success",
    paginationResult,
    totalCount: filteredCount,
    results: products.length,
    products,
    colorCounts: colorCountObject,
  });
});

exports.updateProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
  });
});

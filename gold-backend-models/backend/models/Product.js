import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: [true, "Product code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    designName: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "ring",
        "necklace",
        "bangle",
        "chain",
        "earrings",
        "bracelet",
        "pendant",
        "mangalsutra",
        "anklet",
        "other",
      ],
    },
    purity: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    grossWeight: {
      type: Number,
      required: true,
      min: 0,
    },
    netWeight: {
      type: Number,
      required: true,
      min: 0,
    },
    stoneWeight: {
      type: Number,
      default: 0,
      min: 0,
    },
    wastage: {
      type: Number,
      default: 0,
      min: 0,
    },
    makingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    goldRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQty: {
      type: Number,
      default: 1,
      min: 0,
    },
    stockStatus: {
      type: String,
      enum: ["in_stock", "reserved", "sold", "damaged", "out_of_stock"],
      default: "in_stock",
    },
    image: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    barcode: {
      type: String,
      trim: true,
      default: "",
    },
    manufacturingOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ManufacturingOrder",
      default: null,
    },
    isCustomMade: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.index({ productCode: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ purity: 1 });
productSchema.index({ stockStatus: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;

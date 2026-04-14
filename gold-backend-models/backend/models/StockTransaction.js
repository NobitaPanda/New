import mongoose from "mongoose";

const stockTransactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: [
        "raw_inward",
        "raw_issue_to_manufacturing",
        "raw_return_from_manufacturing",
        "raw_adjustment",
        "product_added",
        "product_reserved",
        "product_sold",
        "product_returned",
        "product_damaged",
        "stock_adjustment",
      ],
      required: true,
    },
    itemType: {
      type: String,
      enum: ["raw_material", "product"],
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemModel",
    },
    itemModel: {
      type: String,
      required: true,
      enum: ["RawMaterial", "Product"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["gram", "kg", "piece"],
      default: "gram",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    referenceType: {
      type: String,
      enum: ["purchase", "manufacturing_order", "sale", "manual_adjustment"],
      default: "manual_adjustment",
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
    performedBy: {
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

stockTransactionSchema.index({ itemId: 1, itemType: 1 });
stockTransactionSchema.index({ transactionType: 1 });
stockTransactionSchema.index({ date: -1 });

const StockTransaction = mongoose.model(
  "StockTransaction",
  stockTransactionSchema
);

export default StockTransaction;

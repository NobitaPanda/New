import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema(
  {
    materialCode: {
      type: String,
      required: [true, "Material code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    materialName: {
      type: String,
      required: [true, "Material name is required"],
      enum: ["gold", "silver", "diamond", "stone", "alloy", "other"],
      default: "gold",
    },
    form: {
      type: String,
      enum: ["raw_gold", "bar", "dust", "wire", "sheet", "stone", "other"],
      default: "raw_gold",
    },
    purity: {
      type: Number,
      required: [true, "Purity is required"],
      min: 0,
      max: 100,
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      min: 0,
    },
    unit: {
      type: String,
      enum: ["gram", "kg", "piece"],
      default: "gram",
    },
    purchaseRate: {
      type: Number,
      required: [true, "Purchase rate is required"],
      min: 0,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    availableStock: {
      type: Number,
      required: true,
      min: 0,
    },
    inwardDate: {
      type: Date,
      default: Date.now,
    },
    batchNo: {
      type: String,
      trim: true,
      default: "",
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["available", "partially_used", "consumed"],
      default: "available",
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

rawMaterialSchema.index({ materialCode: 1 }, { unique: true });
rawMaterialSchema.index({ supplierId: 1 });
rawMaterialSchema.index({ materialName: 1, purity: 1 });

const RawMaterial = mongoose.model("RawMaterial", rawMaterialSchema);

export default RawMaterial;

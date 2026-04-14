import mongoose from "mongoose";

const rawMaterialUsedSchema = new mongoose.Schema(
  {
    rawMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterial",
      required: true,
    },
    issuedWeight: {
      type: Number,
      required: true,
      min: 0,
    },
    returnedWeight: {
      type: Number,
      default: 0,
      min: 0,
    },
    netConsumedWeight: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const manufacturingOrderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: [true, "Order code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    designName: {
      type: String,
      required: [true, "Design name is required"],
      trim: true,
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
    rawMaterialUsed: {
      type: [rawMaterialUsedSchema],
      default: [],
    },
    assignedKarigar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expectedDate: {
      type: Date,
      required: true,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "in_progress",
        "completed",
        "quality_checked",
        "delivered_to_stock",
        "cancelled",
      ],
      default: "pending",
    },
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    estimatedWastage: {
      type: Number,
      default: 0,
      min: 0,
    },
    actualWastage: {
      type: Number,
      default: 0,
      min: 0,
    },
    makingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
    producedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
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

manufacturingOrderSchema.index({ orderCode: 1 }, { unique: true });
manufacturingOrderSchema.index({ assignedKarigar: 1 });
manufacturingOrderSchema.index({ status: 1 });
manufacturingOrderSchema.index({ category: 1 });

const ManufacturingOrder = mongoose.model(
  "ManufacturingOrder",
  manufacturingOrderSchema
);

export default ManufacturingOrder;

import mongoose from "mongoose";

const saleItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productCode: {
      type: String,
      trim: true,
      required: true,
    },
    productName: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    grossWeight: {
      type: Number,
      default: 0,
      min: 0,
    },
    netWeight: {
      type: Number,
      default: 0,
      min: 0,
    },
    stoneWeight: {
      type: Number,
      default: 0,
      min: 0,
    },
    purity: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    goldRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    makingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    wastageCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    itemTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const saleSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: [true, "Invoice number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: {
      type: [saleItemSchema],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one product is required",
      },
    },
    totalWeight: {
      type: Number,
      required: true,
      min: 0,
    },
    goldRate: {
      type: Number,
      required: true,
      min: 0,
    },
    makingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    subtotalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    dueAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid", "cancelled"],
      default: "pending",
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    billingAddress: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    soldBy: {
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

saleSchema.index({ invoiceNo: 1 }, { unique: true });
saleSchema.index({ customerId: 1 });
saleSchema.index({ saleDate: -1 });
saleSchema.index({ paymentStatus: 1 });

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;

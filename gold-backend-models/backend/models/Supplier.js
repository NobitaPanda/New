import mongoose from "mongoose";

const suppliedMaterialSchema = new mongoose.Schema(
  {
    materialName: {
      type: String,
      trim: true,
      required: true,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const supplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
      maxlength: 120,
    },
    contactPerson: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      required: [true, "Supplier phone is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    gstNumber: {
      type: String,
      trim: true,
      default: "",
    },
    suppliedMaterials: {
      type: [suppliedMaterialSchema],
      default: [],
    },
    openingBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentBalance: {
      type: Number,
      default: 0,
      min: 0,
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

supplierSchema.index({ supplierName: 1 });
supplierSchema.index({ phone: 1 }, { unique: true });

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;

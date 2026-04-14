import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    saleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card", "bank_transfer", "cheque", "other"],
      required: true,
    },
    transactionId: {
      type: String,
      trim: true,
      default: "",
    },
    paidAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    pendingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

paymentSchema.index({ saleId: 1 });
paymentSchema.index({ paymentDate: -1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const options = { discriminatorKey: "role", collection: "users" };
const BaseUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 6,
    },
  },
  options,
  { timestamps: true }
);

BaseUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

BaseUserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", BaseUserSchema);

const BuyerSchema = new mongoose.Schema({
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const AdminSchema = new mongoose.Schema({});

const Buyer = User.discriminator("buyer", BuyerSchema);
const Admin = User.discriminator("admin", AdminSchema);

module.exports = { User, Buyer, Admin };

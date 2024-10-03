import { Schema, model, models } from "mongoose";

// Define the schema for login credentials
const userSchema = new Schema(
  {
    adminName: { type: String, required: true },
    adminPassword: { type: String, required: true },
  },
  { timestamps: true }
);

// Check if the model already exists; if not, bind it to the existing collection
const user = models.loginCredentials || model("loginCredentials", userSchema, 'loginCredentials');

export default user;

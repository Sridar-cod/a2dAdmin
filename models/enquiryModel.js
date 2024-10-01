import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema({
  name: { type: String },
  age: { type: Number},
  whatsapp: { type: Number },
  location: { type: String },
  occupation: { type: String },
  purpose: { type: String },
  investment: { type: String },
  timeline: { type: String },
  income: { type: String },
  suggestions: { type: String },
});


const enquiryModel = models.getEnquiry || model('getEnquiry', enquirySchema);

export default enquiryModel;

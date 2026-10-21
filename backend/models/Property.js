const mongoose = require("mongoose");
const PropertySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Property ID is required"],
      unique: true,
      index: true,
      trim: true,
    },
    title: { type: String, trim: true },
    type: { type: String, trim: true },
    region: { type: String, trim: true },
    location: { type: String, trim: true },
    price: { type: Number, min: 0 },
    beds: { type: Number, min: 0 },
    baths: { type: Number, min: 0 },
    sqft: { type: Number, min: 0 },
    image: String,
    galleryImages: [String],
    sourceImage: String,
    googleDriveFolderUrl: String,
    description: String,
    status: { type: String, default: "live", enum: ["live", "draft", "sold"] },
    featured: { type: Boolean, default: false },
    assetCode: String,
    highlights: [String],
  },
  { timestamps: true },
);
module.exports = mongoose.model("Property", PropertySchema);

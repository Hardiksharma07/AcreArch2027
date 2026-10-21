const Property = require("../models/Property");
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
const allowedFields = [
  "id",
  "title",
  "type",
  "region",
  "location",
  "price",
  "beds",
  "baths",
  "sqft",
  "image",
  "galleryImages",
  "sourceImage",
  "googleDriveFolderUrl",
  "description",
  "status",
  "featured",
  "assetCode",
  "highlights",
];
function cleanBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    const error = new Error("Request body must be a JSON object");
    error.statusCode = 400;
    throw error;
  }
  return allowedFields.reduce((result, key) => {
    if (body[key] !== undefined) result[key] = body[key];
    return result;
  }, {});
}
const getProperties = asyncHandler(async (req, res) => {
  const query = {};
  for (const key of ["status", "type", "region"])
    if (req.query[key])
      query[key] = new RegExp(
        `^${String(req.query[key]).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        "i",
      );
  if (req.query.featured !== undefined) {
    if (!["true", "false"].includes(req.query.featured))
      return res
        .status(400)
        .json({ success: false, message: "featured must be true or false" });
    query.featured = req.query.featured === "true";
  }
  if (req.query.search) {
    const search = String(req.query.search)
      .slice(0, 100)
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = ["title", "location", "region", "type", "assetCode"].map(
      (field) => ({ [field]: new RegExp(search, "i") }),
    );
  }
  const data = await Property.find(query)
    .sort({ featured: -1, createdAt: -1 })
    .lean();
  res.json({ success: true, data });
});
const getProperty = asyncHandler(async (req, res) => {
  const data = await Property.findOne({ id: req.params.id }).lean();
  if (!data)
    return res
      .status(404)
      .json({ success: false, message: "Property not found" });
  res.json({ success: true, data });
});
const createProperty = asyncHandler(async (req, res) => {
  const payload = cleanBody(req.body);
  if (!payload.id || !String(payload.id).trim())
    return res
      .status(400)
      .json({ success: false, message: "Property ID is required" });
  const data = await Property.create(payload);
  res.status(201).json({ success: true, data });
});
const updateProperty = asyncHandler(async (req, res) => {
  const payload = cleanBody(req.body);
  delete payload.id;
  const data = await Property.findOneAndUpdate({ id: req.params.id }, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!data)
    return res
      .status(404)
      .json({ success: false, message: "Property not found" });
  res.json({ success: true, data });
});
const deleteProperty = asyncHandler(async (req, res) => {
  const data = await Property.findOneAndDelete({ id: req.params.id }).lean();
  if (!data)
    return res
      .status(404)
      .json({ success: false, message: "Property not found" });
  res.json({ success: true, data: { id: data.id } });
});
module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};

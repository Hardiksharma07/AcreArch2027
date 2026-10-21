import propertyElysian from "../images/property-elysian.jpg";
import propertyAurelia from "../images/property-aurelia.jpg";
import propertyObsidian from "../images/property-obsidian.jpg";
import propertyOrigins from "../images/property-origins.jpg";
import propertyLuminary from "../images/property-luminary.jpg";
import propertyBelgravia from "../images/property-belgravia.jpg";
import propertyInterior from "../images/property-interior.jpg";
import propertyExterior from "../images/property-exterior.jpg";
import propertyCoastal from "../images/property-coastal.jpg";

const unsplashPhotoIds = new Map([
  ["photo-1613490493576-7fde63acd811", propertyElysian],
  ["photo-1600607687939-ce8a6c25118c", propertyAurelia],
  ["photo-1512917774080-9991f1c4c750", propertyObsidian],
  ["photo-1600585154340-be6161a56a0c", propertyOrigins],
  ["photo-1545324418-cc1a3fa10c00", propertyLuminary],
  ["photo-1513584684374-8bab748fbf90", propertyBelgravia],
  ["photo-1502672260266-1c1ef2d93688", propertyInterior],
  ["photo-1505693416388-ac5ce068fe85", propertyExterior],
  ["photo-1448630360428-65456885c650", propertyCoastal],
]);

export function localizeImageUrl(url) {
  if (typeof url !== "string") return url;
  for (const [photoId, localUrl] of unsplashPhotoIds) {
    if (url.includes(photoId)) return localUrl;
  }
  return url;
}
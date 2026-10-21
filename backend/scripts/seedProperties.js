require("dotenv").config();
const connectDB = require("../config/db");
const Property = require("../models/Property");
const properties = [
  {
    id: "ely-malibu-01",
    title: "The Elysian Sanctuary",
    type: "villa",
    region: "California",
    location: "Malibu, California",
    price: 14500000,
    beds: 6,
    baths: 8,
    sqft: 11200,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
    ],
    description:
      "Oceanfront architectural sanctuary combining private wellness suites, cinema lounge, and panoramic coastal views.",
    status: "live",
    featured: true,
    assetCode: "ELY-MALIBU-01",
    highlights: [
      "Oceanfront infinity pool",
      "Private concierge services",
      "Secure perimeter architecture",
    ],
  },
  {
    id: "aurelia-sky-02",
    title: "Aurelia Sky Estate",
    type: "penthouse",
    region: "New York",
    location: "Manhattan, New York",
    price: 22000000,
    beds: 4,
    baths: 5,
    sqft: 8450,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=90",
    ],
    description:
      "A grand Manhattan penthouse with sculptural interiors and skyline views from every room.",
    status: "live",
    featured: true,
    assetCode: "AUR-NY-02",
    highlights: [
      "Skyline observation terrace",
      "Designer fit-out",
      "Prime Manhattan address",
    ],
  },
  {
    id: "obsidian-pavilion-03",
    title: "The Obsidian Pavilion",
    type: "mansion",
    region: "Monaco",
    location: "Monaco, Villefranche",
    price: 38900000,
    beds: 8,
    baths: 11,
    sqft: 16900,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=90",
    ],
    description:
      "A statement residence with formal entertaining spaces, wellness amenities, and dramatic sea views.",
    status: "live",
    featured: false,
    assetCode: "OBS-MON-03",
    highlights: ["Sea-view terraces", "Private spa", "Grand event salon"],
  },
  {
    id: "origins-spain-04",
    title: "Origins Coastline Pavilions",
    type: "villa",
    region: "Spain",
    location: "Costa Adeje, Spain",
    price: 19200000,
    beds: 5,
    baths: 6,
    sqft: 9800,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
    ],
    description:
      "A coastal pavilion estate balancing sculptural modernism with expansive Atlantic views.",
    status: "live",
    featured: false,
    assetCode: "ORI-SPAIN-04",
    highlights: [
      "Atlantic-facing terraces",
      "Private pool pavilion",
      "Landscaped coastal grounds",
    ],
  },
  {
    id: "luminary-dubai-05",
    title: "The Luminary Crown",
    type: "penthouse",
    region: "UAE",
    location: "Downtown Dubai, UAE",
    price: 29000000,
    beds: 4,
    baths: 5,
    sqft: 12400,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=90",
    ],
    description:
      "A commanding sky residence with panoramic city views, private entertaining spaces, and concierge access.",
    status: "live",
    featured: false,
    assetCode: "LUM-UAE-05",
    highlights: [
      "Panoramic skyline salon",
      "Private lift access",
      "Full-service concierge",
    ],
  },
  {
    id: "belgravia-london-06",
    title: "The Belgravia Monolith",
    type: "mansion",
    region: "United Kingdom",
    location: "London, United Kingdom",
    price: 54000000,
    beds: 9,
    baths: 12,
    sqft: 21500,
    image:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1600&q=90",
    ],
    description:
      "A landmark London residence pairing monumental proportions with exacting contemporary craftsmanship.",
    status: "live",
    featured: false,
    assetCode: "BEL-UK-06",
    highlights: [
      "Prime Belgravia address",
      "Private wellness level",
      "Formal reception suites",
    ],
  },
];
(async () => {
  try {
    await connectDB();
    for (const property of properties)
      await Property.findOneAndUpdate({ id: property.id }, property, {
        upsert: true,
        runValidators: true,
      });
    console.log(`Seeded ${properties.length} properties`);
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();

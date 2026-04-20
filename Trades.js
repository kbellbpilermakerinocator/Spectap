const trades = [
  {
    id: "fencing",
    name: "Fencing",
    icon: "🏡",
    description: "Colorbond, timber, aluminium, pool fencing",
    questions: [
      { type: "select", label: "Fence Type", options: ["Colorbond Steel", "Timber", "Aluminium", "Pool Safety Fencing"], key: "type" },
      { type: "number", label: "Total Length (metres)", key: "length", placeholder: "e.g. 25" },
      { type: "select", label: "Height", options: ["1.5m", "1.8m", "2.0m", "2.4m"], key: "height" },
      { type: "checkbox", label: "Include Gate", key: "gate" },
      { type: "textarea", label: "Additional Notes / Extras", key: "notes" }
    ]
  },
  {
    id: "paving",
    name: "Paving",
    icon: "🧱",
    description: "Brick, concrete, stone, exposed aggregate",
    questions: [
      { type: "select", label: "Paving Material", options: ["Clay Brick", "Concrete Pavers", "Natural Stone", "Exposed Aggregate"], key: "material" },
      { type: "range", label: "Area (m²)", key: "area", min: 5, max: 200, step: 1, value: 20 },
      { type: "select", label: "Base Preparation", options: ["Standard", "Reinforced", "With Drainage"], key: "base" },
      { type: "checkbox", label: "Include Edging", key: "edging" },
      { type: "textarea", label: "Pattern / Design Notes", key: "notes" }
    ]
  },
  {
    id: "painting",
    name: "Painting",
    icon: "🎨",
    description: "Interior & exterior painting",
    questions: [
      { type: "select", label: "Area", options: ["Interior Rooms", "Exterior Walls", "Whole House", "Ceilings Only"], key: "area" },
      { type: "number", label: "Number of Rooms / Surfaces", key: "quantity" },
      { type: "select", label: "Paint Quality", options: ["Budget", "Standard", "Premium"], key: "quality" },
      { type: "checkbox", label: "Surface Preparation (filling, sanding)", key: "prep" },
      { type: "textarea", label: "Colour Changes or Special Requests", key: "notes" }
    ]
  }
  // Add more trades here easily (electrical, plumbing, landscaping, etc.)
];

export default trades;

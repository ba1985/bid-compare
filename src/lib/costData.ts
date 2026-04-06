export interface ProjectData {
  name: string;
  slug: string;
  description: string;
  unit: string;
  baseLow: number;
  baseAvg: number;
  baseHigh: number;
  costFactors: string[];
  bidTips: string[];
  components: { name: string; lowPct: number; highPct: number }[];
  faqs: { question: string; answer: string }[];
  relatedProjects: string[];
}

export interface CityData {
  name: string;
  slug: string;
  state: string;
  multiplier: number;
}

export interface CostData {
  low: number;
  avg: number;
  high: number;
}

export const projects: ProjectData[] = [
  {
    name: "Kitchen Remodel",
    slug: "kitchen-remodel",
    description: "A kitchen remodel can range from a minor refresh to a full gut renovation. Costs vary widely based on layout changes, cabinet quality, appliances, and finishes.",
    unit: "project",
    baseLow: 15000,
    baseAvg: 45000,
    baseHigh: 90000,
    costFactors: [
      "Cabinet quality and custom vs. stock options",
      "Countertop material (laminate vs. quartz vs. granite)",
      "Whether the layout is changing (moving plumbing/electrical adds cost)",
      "Appliance grade and whether they're included",
      "Flooring type and square footage",
      "Permit requirements in your city",
    ],
    bidTips: [
      "Verify cabinets are specified by brand, line, and door style — vague specs lead to substitutions",
      "Confirm countertop is priced per linear foot with edge profile specified",
      "Ask if demo and haul-away are included",
      "Check whether tile backsplash labor is in scope",
      "Ensure appliances are itemized with model numbers",
      "Watch for allowances (e.g., 'fixtures allowance $500') — these often run over",
    ],
    components: [
      { name: "Cabinets", lowPct: 25, highPct: 35 },
      { name: "Labor", lowPct: 20, highPct: 30 },
      { name: "Countertops", lowPct: 10, highPct: 18 },
      { name: "Appliances", lowPct: 12, highPct: 20 },
      { name: "Flooring", lowPct: 5, highPct: 10 },
      { name: "Plumbing & Electrical", lowPct: 8, highPct: 12 },
      { name: "Lighting & Fixtures", lowPct: 4, highPct: 8 },
    ],
    faqs: [
      {
        question: "How long does a kitchen remodel take?",
        answer: "Most kitchen remodels take 3–8 weeks depending on scope. A full gut with custom cabinets can take 10–14 weeks.",
      },
      {
        question: "Do I need a permit for a kitchen remodel?",
        answer: "Permits are typically required for electrical, plumbing, or structural changes. A cosmetic refresh (new countertops, paint, appliances) usually doesn't require one.",
      },
      {
        question: "What's the ROI on a kitchen remodel?",
        answer: "Mid-range kitchen remodels recoup around 60–80% of costs in home resale value. Upscale remodels often recoup less on a percentage basis.",
      },
    ],
    relatedProjects: ["bathroom-remodel", "flooring", "painting-interior"],
  },
  {
    name: "Bathroom Remodel",
    slug: "bathroom-remodel",
    description: "Bathroom remodels deliver strong ROI and can transform daily living. Costs hinge on tile selection, fixture quality, and whether the footprint is changing.",
    unit: "project",
    baseLow: 6000,
    baseAvg: 18000,
    baseHigh: 40000,
    costFactors: [
      "Tile selection and square footage",
      "Vanity and sink type (stock vs. custom)",
      "Tub vs. walk-in shower conversion",
      "Whether plumbing locations are moving",
      "Exhaust fan and lighting upgrades",
      "Floor radiant heat installation",
    ],
    bidTips: [
      "Confirm tile is specified by SKU — 'similar tile' substitutions can double the cost",
      "Verify grout type (sanded vs. epoxy) and grout line width are specified",
      "Ask if shower pan is tile-set or a prefab unit",
      "Ensure waterproofing membrane behind tile is in scope",
      "Check if toilet removal/reinstall is included",
      "Confirm mirror and towel bar installation are itemized",
    ],
    components: [
      { name: "Tile & Materials", lowPct: 20, highPct: 30 },
      { name: "Labor", lowPct: 30, highPct: 40 },
      { name: "Vanity & Fixtures", lowPct: 15, highPct: 25 },
      { name: "Tub / Shower", lowPct: 10, highPct: 20 },
      { name: "Plumbing", lowPct: 10, highPct: 15 },
      { name: "Electrical & Lighting", lowPct: 5, highPct: 10 },
    ],
    faqs: [
      {
        question: "How long does a bathroom remodel take?",
        answer: "A standard full bathroom remodel takes 1–3 weeks. Larger master baths with custom tile work can take 4–6 weeks.",
      },
      {
        question: "Should I convert a tub to a shower?",
        answer: "Converting a tub to a walk-in shower can increase home value if you keep at least one tub in the home. Families with young children often prefer a tub.",
      },
      {
        question: "What adds the most value to a bathroom remodel?",
        answer: "Updated tile, a new vanity, and good lighting deliver the best ROI. Radiant floor heating and steam showers are premium additions that appeal to buyers.",
      },
    ],
    relatedProjects: ["kitchen-remodel", "flooring", "plumbing"],
  },
  {
    name: "Roof Replacement",
    slug: "roof-replacement",
    description: "Roof replacement protects your largest investment. Costs depend on roofing material, roof pitch, square footage, and whether old shingles need stripping.",
    unit: "project",
    baseLow: 7000,
    baseAvg: 13000,
    baseHigh: 28000,
    costFactors: [
      "Roof size (measured in 'squares' — 100 sq ft each)",
      "Roofing material (asphalt, metal, tile, slate)",
      "Roof pitch and complexity (valleys, dormers)",
      "Whether old roof is stripped or overlaid",
      "Decking replacement if rotted",
      "Skylights or chimney flashing repairs",
    ],
    bidTips: [
      "Confirm how many layers will be removed — most codes allow only 2 layers total",
      "Verify the shingle brand, line, and warranty being installed",
      "Ask if felt underlayment or synthetic is included",
      "Check that ice and water shield is specified for eaves and valleys",
      "Confirm cleanup and haul-away of old materials",
      "Ask about ridge vent installation if not already present",
    ],
    components: [
      { name: "Shingles / Material", lowPct: 35, highPct: 45 },
      { name: "Labor", lowPct: 35, highPct: 45 },
      { name: "Underlayment & Decking", lowPct: 8, highPct: 15 },
      { name: "Flashing & Ridge Cap", lowPct: 5, highPct: 10 },
      { name: "Disposal", lowPct: 3, highPct: 7 },
    ],
    faqs: [
      {
        question: "How long does a roof replacement take?",
        answer: "Most roof replacements take 1–3 days. Larger or more complex roofs can take a week.",
      },
      {
        question: "Can I put new shingles over old ones?",
        answer: "While allowed by code in some areas (up to 2 layers), a full tear-off is generally recommended. Multiple layers trap heat, void warranties, and add weight.",
      },
      {
        question: "How long does an asphalt shingle roof last?",
        answer: "Standard 3-tab shingles last 20–25 years. Architectural shingles last 30–50 years. Metal roofs can last 50+ years.",
      },
    ],
    relatedProjects: ["siding", "window-replacement", "painting-exterior"],
  },
  {
    name: "Deck Building",
    slug: "deck-building",
    description: "A new deck extends your living space outdoors. Costs depend on size, decking material (pressure-treated, composite, hardwood), and features like railings and stairs.",
    unit: "project",
    baseLow: 4000,
    baseAvg: 12000,
    baseHigh: 30000,
    costFactors: [
      "Deck size in square feet",
      "Decking material (PT wood, cedar, composite, Ipe)",
      "Height off ground (ground-level vs. elevated requires footings)",
      "Railing type (wood, cable, glass, aluminum)",
      "Stairs and landing areas",
      "Built-in seating, pergola, or lighting",
    ],
    bidTips: [
      "Confirm footing depth meets local frost line requirements",
      "Verify composite brand and product line — warranty varies significantly",
      "Ask if permit, inspections, and engineering (if required) are included",
      "Check post material (wood vs. steel post bases)",
      "Confirm railing height meets code (typically 36\" for decks under 30\")",
      "Ask if ledger flashing to the house is included",
    ],
    components: [
      { name: "Decking Material", lowPct: 30, highPct: 40 },
      { name: "Labor", lowPct: 35, highPct: 45 },
      { name: "Framing & Structure", lowPct: 15, highPct: 25 },
      { name: "Railings", lowPct: 10, highPct: 20 },
      { name: "Stairs", lowPct: 5, highPct: 10 },
    ],
    faqs: [
      {
        question: "Do I need a permit to build a deck?",
        answer: "Most jurisdictions require a permit for decks attached to the house or over a certain height (often 30\"). Freestanding ground-level decks may not require one.",
      },
      {
        question: "Composite vs. wood deck — which is better?",
        answer: "Composite decking costs more upfront but requires virtually no maintenance and won't rot, warp, or splinter. Pressure-treated wood costs less initially but needs annual sealing.",
      },
      {
        question: "How long does it take to build a deck?",
        answer: "A standard deck takes 1–2 weeks. Larger decks or those requiring complex permits can take 3–4 weeks.",
      },
    ],
    relatedProjects: ["fence-installation", "landscaping", "painting-exterior"],
  },
  {
    name: "Fence Installation",
    slug: "fence-installation",
    description: "New fencing adds privacy, security, and curb appeal. Costs are driven by linear footage, fence height, material, and terrain.",
    unit: "linear foot",
    baseLow: 1500,
    baseAvg: 3800,
    baseHigh: 9000,
    costFactors: [
      "Linear footage of fence",
      "Fence material (wood, vinyl, aluminum, chain link)",
      "Fence height (4ft vs. 6ft vs. 8ft)",
      "Number of gates and gate style",
      "Terrain (slopes, rocky soil, tree roots add cost)",
      "Old fence removal and disposal",
    ],
    bidTips: [
      "Confirm post spacing and depth — standard is 8ft spacing, 1/3 of total height below grade",
      "Verify whether concrete footings are included at every post",
      "Ask if the line is being surveyed or assumed",
      "Check that gates have self-closing hinges and latches specified",
      "Ask about post material (wood vs. metal for wood fences)",
      "Confirm haul-away of old fence is included",
    ],
    components: [
      { name: "Materials", lowPct: 40, highPct: 55 },
      { name: "Labor", lowPct: 35, highPct: 45 },
      { name: "Posts & Footings", lowPct: 8, highPct: 15 },
      { name: "Gates", lowPct: 5, highPct: 15 },
    ],
    faqs: [
      {
        question: "How long does fence installation take?",
        answer: "Most fence installations take 1–3 days for a standard residential fence. Large properties or difficult terrain can take a week.",
      },
      {
        question: "Wood vs. vinyl fence — which lasts longer?",
        answer: "Vinyl fences last 20–30 years with minimal maintenance. Wood fences last 15–20 years with proper maintenance (staining/sealing every 2–3 years).",
      },
      {
        question: "Do I need a permit for a fence?",
        answer: "Many cities require permits for fences over 6 feet. HOAs often have their own restrictions. Always check local rules before starting.",
      },
    ],
    relatedProjects: ["deck-building", "landscaping", "driveway-paving"],
  },
  {
    name: "Interior Painting",
    slug: "painting-interior",
    description: "Fresh interior paint is one of the best ROI home improvements. Costs vary by square footage, number of rooms, ceiling height, and paint quality.",
    unit: "project",
    baseLow: 900,
    baseAvg: 3000,
    baseHigh: 7500,
    costFactors: [
      "Total wall square footage",
      "Number of rooms and room size",
      "Ceiling height (standard 8ft vs. vaulted)",
      "Paint brand and finish quality",
      "Number of coats required",
      "Prep work needed (patching holes, sanding, priming)",
    ],
    bidTips: [
      "Confirm paint brand, sheen, and number of coats are specified",
      "Ask if ceilings and trim are included or quoted separately",
      "Verify surface prep (sanding, patching, caulking) is in scope",
      "Confirm masking of floors, fixtures, and windows is included",
      "Ask if furniture moving and protection is included",
      "Check that cleanup and touch-ups are part of the price",
    ],
    components: [
      { name: "Labor", lowPct: 65, highPct: 75 },
      { name: "Paint & Materials", lowPct: 20, highPct: 30 },
      { name: "Prep & Repairs", lowPct: 5, highPct: 15 },
    ],
    faqs: [
      {
        question: "How long does interior painting take?",
        answer: "A single room takes 1–2 days. A whole house interior typically takes 3–7 days depending on size.",
      },
      {
        question: "How much paint do I need per room?",
        answer: "One gallon covers about 350–400 sq ft. A typical 12x12 room needs about 1.5 gallons for two coats.",
      },
      {
        question: "What paint finish should I use?",
        answer: "Flat/matte for ceilings and low-traffic areas, eggshell or satin for living areas and bedrooms, semi-gloss or gloss for trim, doors, and bathrooms.",
      },
    ],
    relatedProjects: ["painting-exterior", "flooring", "kitchen-remodel"],
  },
  {
    name: "Exterior Painting",
    slug: "painting-exterior",
    description: "Exterior painting protects your home from weather and dramatically improves curb appeal. Costs depend on home size, siding type, and condition of existing paint.",
    unit: "project",
    baseLow: 1500,
    baseAvg: 4500,
    baseHigh: 10000,
    costFactors: [
      "Home square footage and stories",
      "Siding material (wood, vinyl, stucco, brick)",
      "Condition of existing paint (heavy peeling requires more prep)",
      "Number of colors and trim complexity",
      "Accessibility (steep grades, hard-to-reach areas)",
      "Type of application (spray vs. brush and roll)",
    ],
    bidTips: [
      "Confirm prep work is detailed — scraping, sanding, caulking, priming",
      "Verify paint brand and product line (not all exterior paints are equal)",
      "Ask if trim, shutters, doors, and soffits are included",
      "Check that power washing before painting is in scope",
      "Ask about warranty on workmanship",
      "Confirm two-coat application is specified",
    ],
    components: [
      { name: "Labor", lowPct: 60, highPct: 75 },
      { name: "Paint & Materials", lowPct: 20, highPct: 30 },
      { name: "Prep Work", lowPct: 8, highPct: 18 },
    ],
    faqs: [
      {
        question: "How often should I repaint my home's exterior?",
        answer: "Wood siding needs repainting every 3–7 years. Stucco lasts 5–10 years. Aluminum siding can last 5–10 years before needing a new coat.",
      },
      {
        question: "What time of year is best to paint a home's exterior?",
        answer: "Late spring through early fall is ideal. Paint needs temperatures above 50°F to cure properly and low humidity for best results.",
      },
      {
        question: "Should I use a sprayer or brush for exterior painting?",
        answer: "Spraying is faster but requires more masking prep. Brush and roll gives better penetration on textured surfaces. Most professionals use a combination.",
      },
    ],
    relatedProjects: ["painting-interior", "siding", "roof-replacement"],
  },
  {
    name: "Flooring Installation",
    slug: "flooring",
    description: "New flooring transforms a space instantly. Costs vary widely by material — from budget laminate to high-end hardwood — plus square footage and subfloor condition.",
    unit: "sq ft",
    baseLow: 1500,
    baseAvg: 4500,
    baseHigh: 12000,
    costFactors: [
      "Floor material (laminate, LVP, hardwood, tile, carpet)",
      "Total square footage",
      "Subfloor condition and leveling needed",
      "Furniture moving and removal of old flooring",
      "Transitions, moldings, and stair nose",
      "Pattern complexity (diagonal, herringbone costs more)",
    ],
    bidTips: [
      "Confirm flooring brand, product line, and thickness are specified",
      "Verify subfloor prep is included (leveling, repairs)",
      "Ask if old flooring removal and disposal is in scope",
      "Check that transitions and baseboards are included",
      "Ask what underlayment will be used",
      "Confirm square footage measured includes waste factor (typically 10%)",
    ],
    components: [
      { name: "Flooring Material", lowPct: 40, highPct: 55 },
      { name: "Labor", lowPct: 30, highPct: 40 },
      { name: "Subfloor Prep", lowPct: 5, highPct: 15 },
      { name: "Moldings & Transitions", lowPct: 5, highPct: 10 },
    ],
    faqs: [
      {
        question: "What's the most durable flooring for high-traffic areas?",
        answer: "Luxury vinyl plank (LVP) and porcelain tile are the most durable options. LVP is waterproof and scratch-resistant. Hardwood can be refinished multiple times.",
      },
      {
        question: "Can flooring be installed over existing flooring?",
        answer: "Sometimes — LVP and laminate can often go over existing flooring if it's flat and in good condition. Tile usually requires removal of old flooring first.",
      },
      {
        question: "How long does flooring installation take?",
        answer: "A single room takes 1–2 days. A whole house can take 1–2 weeks depending on square footage and material.",
      },
    ],
    relatedProjects: ["kitchen-remodel", "bathroom-remodel", "painting-interior"],
  },
  {
    name: "HVAC Replacement",
    slug: "hvac-replacement",
    description: "A new HVAC system is a major investment but pays off in energy savings and comfort. Costs depend on system type, home size, and efficiency rating.",
    unit: "project",
    baseLow: 5000,
    baseAvg: 10000,
    baseHigh: 20000,
    costFactors: [
      "System type (central AC, heat pump, mini-split, furnace)",
      "Home square footage and number of zones",
      "SEER/AFUE efficiency rating",
      "Ductwork condition — repairs or replacement add cost",
      "Brand and warranty tier",
      "Permits and inspections",
    ],
    bidTips: [
      "Confirm brand, model number, and SEER/AFUE rating are specified",
      "Ask if a load calculation (Manual J) was performed — undersized systems fail early",
      "Verify ductwork inspection and repair are in scope",
      "Check if thermostat upgrade is included",
      "Confirm removal and disposal of old equipment",
      "Ask about manufacturer and labor warranty terms",
    ],
    components: [
      { name: "Equipment", lowPct: 50, highPct: 65 },
      { name: "Labor & Installation", lowPct: 25, highPct: 35 },
      { name: "Ductwork", lowPct: 5, highPct: 20 },
      { name: "Permits & Refrigerant", lowPct: 3, highPct: 8 },
    ],
    faqs: [
      {
        question: "How long does HVAC replacement take?",
        answer: "A standard furnace or AC replacement takes 4–8 hours. A full system with ductwork changes can take 2–3 days.",
      },
      {
        question: "What SEER rating should I get?",
        answer: "Minimum SEER2 ratings vary by region (13.4–15.2). Higher SEER means better efficiency. A 16–18 SEER unit offers a good payback period in most climates.",
      },
      {
        question: "Heat pump vs. traditional AC — which should I choose?",
        answer: "Heat pumps provide both heating and cooling and are more efficient in moderate climates. They're an excellent choice in regions where temperatures rarely drop below 20°F.",
      },
    ],
    relatedProjects: ["electrical", "plumbing", "window-replacement"],
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    description: "Plumbing projects range from fixture replacements to full repiping. Costs depend heavily on accessibility, pipe material, and scope of work.",
    unit: "project",
    baseLow: 500,
    baseAvg: 2500,
    baseHigh: 8000,
    costFactors: [
      "Type of work (repair vs. replacement vs. repiping)",
      "Pipe material (copper, PEX, PVC)",
      "Accessibility — walls or floors that need opening",
      "Number of fixtures and connection points",
      "Permit requirements",
      "Water heater included or separate",
    ],
    bidTips: [
      "Confirm pipe material is specified by type and size",
      "Ask if drywall patching after plumbing is included or extra",
      "Verify permit and inspection costs are included",
      "Ask about pressure testing after work is complete",
      "Check if shutoff valves are included at each fixture",
      "Confirm cleanup and haul-away of old materials",
    ],
    components: [
      { name: "Labor", lowPct: 55, highPct: 65 },
      { name: "Pipe & Fittings", lowPct: 20, highPct: 30 },
      { name: "Fixtures", lowPct: 10, highPct: 20 },
      { name: "Permits", lowPct: 3, highPct: 8 },
    ],
    faqs: [
      {
        question: "How do I know if I need to repipe my house?",
        answer: "Signs include discolored water, frequent leaks, low water pressure throughout, or polybutylene pipes (gray plastic, common in homes built 1978–1995).",
      },
      {
        question: "Copper vs. PEX piping — which is better?",
        answer: "PEX is less expensive, easier to install, and handles freezing better than copper. Copper has a longer track record and is preferred by some for drinking water lines.",
      },
      {
        question: "Do I need a permit for plumbing work?",
        answer: "Most plumbing work beyond simple fixture replacement requires a permit. Always ask your contractor to pull permits — it protects you if you ever sell the home.",
      },
    ],
    relatedProjects: ["bathroom-remodel", "kitchen-remodel", "electrical"],
  },
  {
    name: "Electrical Work",
    slug: "electrical",
    description: "Electrical projects range from adding circuits to full panel upgrades. Costs depend on scope, accessibility, panel capacity, and local permit requirements.",
    unit: "project",
    baseLow: 500,
    baseAvg: 2800,
    baseHigh: 8500,
    costFactors: [
      "Type of work (outlets, circuits, panel upgrade, rewiring)",
      "Panel amperage upgrade (100A vs. 200A vs. 400A)",
      "Number of circuits or outlets being added",
      "Accessibility — running wire through finished walls",
      "Local permit and inspection fees",
      "Code compliance upgrades required",
    ],
    bidTips: [
      "Confirm panel brand and amperage are specified",
      "Ask if permit and inspection are included",
      "Verify wire gauge is specified for each circuit type",
      "Check if AFCI/GFCI outlets are specified where required by code",
      "Ask about drywall patching after wire runs",
      "Confirm load calculation is included for panel upgrades",
    ],
    components: [
      { name: "Labor", lowPct: 60, highPct: 70 },
      { name: "Materials & Wire", lowPct: 15, highPct: 25 },
      { name: "Panel & Breakers", lowPct: 10, highPct: 20 },
      { name: "Permits & Inspection", lowPct: 5, highPct: 10 },
    ],
    faqs: [
      {
        question: "How do I know if I need a panel upgrade?",
        answer: "Signs include frequently tripping breakers, flickering lights, a 60–100 amp panel in an older home, or plans to add EV charging, a hot tub, or an addition.",
      },
      {
        question: "What's the difference between 200A and 400A service?",
        answer: "200A is sufficient for most single-family homes. 400A is needed for large homes (4,000+ sq ft), multi-unit properties, or homes with heavy electrical loads.",
      },
      {
        question: "Can I do my own electrical work?",
        answer: "Homeowners can do some electrical work in many states, but permits and inspections are still required. Licensed electricians are recommended for panel work and complex projects.",
      },
    ],
    relatedProjects: ["hvac-replacement", "kitchen-remodel", "bathroom-remodel"],
  },
  {
    name: "Landscaping",
    slug: "landscaping",
    description: "Professional landscaping boosts curb appeal and outdoor enjoyment. Costs depend on the scope — from simple cleanups to full yard redesigns with irrigation.",
    unit: "project",
    baseLow: 2000,
    baseAvg: 8000,
    baseHigh: 25000,
    costFactors: [
      "Yard size and terrain",
      "Design complexity and plant selection",
      "Irrigation system installation",
      "Hardscaping (pavers, retaining walls, patios)",
      "Sod vs. seed vs. existing turf",
      "Tree and shrub removal",
    ],
    bidTips: [
      "Confirm plant species, size (caliper for trees, gallon size for shrubs) are specified",
      "Verify irrigation zones and head coverage are detailed",
      "Ask if soil amendment and mulch are included",
      "Check if grading and drainage improvements are in scope",
      "Confirm warranty on plants (most pros offer 1-year plant replacement)",
      "Ask about ongoing maintenance options",
    ],
    components: [
      { name: "Plants & Materials", lowPct: 35, highPct: 45 },
      { name: "Labor", lowPct: 35, highPct: 45 },
      { name: "Irrigation", lowPct: 10, highPct: 20 },
      { name: "Hardscaping", lowPct: 10, highPct: 25 },
    ],
    faqs: [
      {
        question: "What's the ROI on professional landscaping?",
        answer: "Good landscaping can increase home value by 5–15%. Mature trees alone can add 10% to property values.",
      },
      {
        question: "When is the best time to landscape?",
        answer: "Fall is ideal for planting trees and shrubs in most regions. Spring works well too. Avoid planting during summer heat or winter freezes.",
      },
      {
        question: "Do I need an irrigation system?",
        answer: "Irrigation systems pay for themselves in water savings and plant health. They're especially valuable in dry climates. Smart controllers can cut water use by 30–50%.",
      },
    ],
    relatedProjects: ["fence-installation", "deck-building", "driveway-paving"],
  },
  {
    name: "Window Replacement",
    slug: "window-replacement",
    description: "New windows improve energy efficiency, comfort, and home value. Costs depend on window count, size, frame material, and glass package.",
    unit: "window",
    baseLow: 3500,
    baseAvg: 9500,
    baseHigh: 20000,
    costFactors: [
      "Number of windows",
      "Window size and style (double-hung, casement, bay, picture)",
      "Frame material (vinyl, wood, fiberglass, aluminum)",
      "Glass package (double vs. triple pane, low-E coating, gas fill)",
      "Installation complexity (rot repair, trim work)",
      "Manufacturer warranty and brand tier",
    ],
    bidTips: [
      "Confirm window brand, series, and U-factor/SHGC ratings are specified",
      "Ask if exterior trim and interior casing are included",
      "Verify caulking and weatherstripping details",
      "Check if rot repair is in scope or separate",
      "Ask about ENERGY STAR qualification",
      "Confirm old window disposal is included",
    ],
    components: [
      { name: "Windows", lowPct: 55, highPct: 65 },
      { name: "Labor", lowPct: 25, highPct: 35 },
      { name: "Trim & Finishing", lowPct: 5, highPct: 12 },
      { name: "Disposal", lowPct: 2, highPct: 5 },
    ],
    faqs: [
      {
        question: "How many windows should I replace at once?",
        answer: "Replacing all windows at once typically costs less per unit due to economies of scale. It also ensures consistent appearance and maximizes energy savings.",
      },
      {
        question: "Vinyl vs. fiberglass windows — which is better?",
        answer: "Fiberglass windows outperform vinyl in thermal efficiency, dimensional stability, and longevity, but cost 15–30% more. Vinyl is the most popular choice for value.",
      },
      {
        question: "Will new windows lower my energy bills?",
        answer: "Yes — ENERGY STAR certified windows can reduce heating and cooling costs by 7–15% annually, depending on your climate and existing windows.",
      },
    ],
    relatedProjects: ["siding", "roof-replacement", "painting-exterior"],
  },
  {
    name: "Siding Replacement",
    slug: "siding",
    description: "New siding dramatically refreshes your home's appearance and improves insulation. Costs vary by material — vinyl, fiber cement, wood, and metal all have different price points.",
    unit: "sq ft",
    baseLow: 5500,
    baseAvg: 14000,
    baseHigh: 35000,
    costFactors: [
      "Home square footage and stories",
      "Siding material (vinyl, fiber cement, wood, metal, stucco)",
      "Old siding removal and disposal",
      "Sheathing and house wrap condition",
      "Trim and soffit/fascia included",
      "Window and door trim work",
    ],
    bidTips: [
      "Confirm siding brand, product line, and thickness are specified",
      "Ask if house wrap replacement is included",
      "Verify trim boards, soffit, and fascia are in scope",
      "Check if sheathing repairs are included or billed separately",
      "Confirm caulking at all openings is specified",
      "Ask about manufacturer warranty transferability",
    ],
    components: [
      { name: "Siding Material", lowPct: 40, highPct: 55 },
      { name: "Labor", lowPct: 30, highPct: 40 },
      { name: "Trim & Accessories", lowPct: 8, highPct: 15 },
      { name: "House Wrap & Sheathing", lowPct: 5, highPct: 12 },
      { name: "Disposal", lowPct: 3, highPct: 7 },
    ],
    faqs: [
      {
        question: "How long does siding installation take?",
        answer: "Most homes take 1–2 weeks for a full siding replacement. Larger homes or those with complex trim details can take 3 weeks.",
      },
      {
        question: "Vinyl vs. fiber cement siding — which is better?",
        answer: "Fiber cement (James Hardie) is more durable, fire-resistant, and provides better insulation than vinyl. It costs 20–30% more but lasts significantly longer.",
      },
      {
        question: "Does new siding add value to my home?",
        answer: "Siding replacement offers some of the best ROI of any exterior project — typically 70–80% cost recoup at resale, plus improved curb appeal and energy efficiency.",
      },
    ],
    relatedProjects: ["roof-replacement", "window-replacement", "painting-exterior"],
  },
  {
    name: "Driveway Paving",
    slug: "driveway-paving",
    description: "A new driveway improves curb appeal and functionality. Costs depend on material (asphalt, concrete, pavers), size, and whether the old driveway needs removal.",
    unit: "sq ft",
    baseLow: 2500,
    baseAvg: 7000,
    baseHigh: 18000,
    costFactors: [
      "Driveway size in square feet",
      "Material choice (asphalt, concrete, pavers, gravel)",
      "Old driveway removal and disposal",
      "Grading and base preparation",
      "Drainage requirements",
      "Edging, borders, and decorative elements",
    ],
    bidTips: [
      "Confirm material thickness is specified (asphalt: 2–4\", concrete: 4–6\")",
      "Ask if base gravel depth and compaction are specified",
      "Verify old driveway demo and haul-away are included",
      "Check grading plan for proper drainage away from house",
      "Ask about expansion joints for concrete",
      "Confirm sealer application for asphalt is included",
    ],
    components: [
      { name: "Material", lowPct: 35, highPct: 50 },
      { name: "Labor", lowPct: 30, highPct: 40 },
      { name: "Base Prep & Grading", lowPct: 10, highPct: 20 },
      { name: "Demo & Disposal", lowPct: 8, highPct: 15 },
    ],
    faqs: [
      {
        question: "Asphalt vs. concrete driveway — which is better?",
        answer: "Asphalt costs less and is easier to repair but needs resealing every 3–5 years. Concrete lasts longer (30+ years), looks better, but costs more and cracks are harder to repair.",
      },
      {
        question: "How long does a new driveway last?",
        answer: "Asphalt lasts 20–30 years with proper maintenance. Concrete lasts 30–50 years. Pavers can last 50+ years and individual pavers can be replaced if damaged.",
      },
      {
        question: "How long to wait before driving on a new driveway?",
        answer: "For asphalt, wait at least 24–48 hours (longer in hot weather). For concrete, wait 7 days before regular use and 28 days before heavy vehicles.",
      },
    ],
    relatedProjects: ["landscaping", "fence-installation", "deck-building"],
  },
];

export const cities: CityData[] = [
  { name: "Las Vegas", slug: "las-vegas", state: "NV", multiplier: 0.95 },
  { name: "Los Angeles", slug: "los-angeles", state: "CA", multiplier: 1.4 },
  { name: "New York", slug: "new-york", state: "NY", multiplier: 1.65 },
  { name: "Chicago", slug: "chicago", state: "IL", multiplier: 1.2 },
  { name: "Houston", slug: "houston", state: "TX", multiplier: 0.9 },
  { name: "Phoenix", slug: "phoenix", state: "AZ", multiplier: 0.95 },
  { name: "Dallas", slug: "dallas", state: "TX", multiplier: 0.92 },
  { name: "San Francisco", slug: "san-francisco", state: "CA", multiplier: 1.75 },
  { name: "Seattle", slug: "seattle", state: "WA", multiplier: 1.3 },
  { name: "Boston", slug: "boston", state: "MA", multiplier: 1.45 },
  { name: "Denver", slug: "denver", state: "CO", multiplier: 1.1 },
  { name: "Atlanta", slug: "atlanta", state: "GA", multiplier: 0.95 },
  { name: "Miami", slug: "miami", state: "FL", multiplier: 1.1 },
  { name: "Austin", slug: "austin", state: "TX", multiplier: 1.05 },
  { name: "Portland", slug: "portland", state: "OR", multiplier: 1.2 },
];

export function getCostData(project: ProjectData, city: CityData): CostData {
  return {
    low: Math.round((project.baseLow * city.multiplier) / 100) * 100,
    avg: Math.round((project.baseAvg * city.multiplier) / 100) * 100,
    high: Math.round((project.baseHigh * city.multiplier) / 100) * 100,
  };
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

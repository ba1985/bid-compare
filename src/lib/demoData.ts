export interface LineItem {
  category: string;
  description: string;
  prices: (number | null)[]; // null = missing from this bid
}

export interface ContractorBid {
  name: string;
  company: string;
  total: number;
}

export interface DemoComparison {
  project: string;
  contractors: ContractorBid[];
  lineItems: LineItem[];
}

export const demoComparison: DemoComparison = {
  project: "Kitchen Remodel",
  contractors: [
    { name: "Mike Johnson", company: "ABC Contractors", total: 24350 },
    { name: "Tom Rivera", company: "Premier Home Services", total: 21800 },
    { name: "Dave Chen", company: "Reliable Builders Inc.", total: 28100 },
  ],
  lineItems: [
    {
      category: "Demolition",
      description: "Remove existing cabinets, counters & flooring",
      prices: [1200, 950, 1500],
    },
    {
      category: "Cabinets",
      description: "Supply & install shaker-style cabinets (40 LF)",
      prices: [8400, 7200, 9600],
    },
    {
      category: "Countertops",
      description: "Quartz countertops with undermount sink cutout",
      prices: [3800, 3500, 4200],
    },
    {
      category: "Flooring",
      description: "Tile flooring (200 sq ft) including install",
      prices: [2400, 2100, 2800],
    },
    {
      category: "Plumbing",
      description: "Sink, faucet, dishwasher hookup",
      prices: [1800, 1600, 2000],
    },
    {
      category: "Electrical",
      description: "Under-cabinet lighting, GFCI outlets, recessed lights",
      prices: [2200, 2400, 2600],
    },
    {
      category: "Backsplash",
      description: "Subway tile backsplash (40 sq ft)",
      prices: [950, 800, 1100],
    },
    {
      category: "Painting",
      description: "Paint walls & ceiling (primer + 2 coats)",
      prices: [600, null, 700],
    },
    {
      category: "Permits",
      description: "Building & electrical permits",
      prices: [450, 400, null],
    },
    {
      category: "Cleanup & Haul-Away",
      description: "Debris removal & final cleanup",
      prices: [550, 850, 600],
    },
    {
      category: "Project Management",
      description: "Site supervision and scheduling",
      prices: [null, null, 3000],
    },
  ],
};

export function getMinPrice(prices: (number | null)[]): number {
  const valid = prices.filter((p): p is number => p !== null);
  return Math.min(...valid);
}

export function getMaxPrice(prices: (number | null)[]): number {
  const valid = prices.filter((p): p is number => p !== null);
  return Math.max(...valid);
}

export function getCellClass(price: number | null, prices: (number | null)[]): string {
  if (price === null) return "missing";
  const valid = prices.filter((p): p is number => p !== null);
  if (valid.length < 2) return "neutral";
  const min = Math.min(...valid);
  const max = Math.max(...valid);
  if (price === min && min !== max) return "lowest";
  if (price === max && min !== max) return "highest";
  return "neutral";
}

export function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export interface RedFlag {
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  contractor?: string;
}

export function computeRedFlags(data: DemoComparison): RedFlag[] {
  const flags: RedFlag[] = [];

  // Missing permits
  const permitItem = data.lineItems.find((l) => l.category === "Permits");
  if (permitItem) {
    permitItem.prices.forEach((p, i) => {
      if (p === null) {
        flags.push({
          severity: "high",
          title: "No permit fee included",
          description: `${data.contractors[i].company} did not include a building permit. This could mean unlicensed work, or permits will be charged later as an extra.`,
          contractor: data.contractors[i].company,
        });
      }
    });
  }

  // Items only in one bid
  data.lineItems.forEach((item) => {
    const nonNull = item.prices.filter((p) => p !== null).length;
    if (nonNull === 1) {
      const idx = item.prices.findIndex((p) => p !== null);
      flags.push({
        severity: "medium",
        title: `"${item.description}" only in one bid`,
        description: `Only ${data.contractors[idx].company} included ${item.category.toLowerCase()}. The other contractors may have omitted this cost, which could become an expensive change order later.`,
        contractor: data.contractors[idx].company,
      });
    }
  });

  // Prices significantly above median (>40% over min)
  data.lineItems.forEach((item) => {
    const valid = item.prices.filter((p): p is number => p !== null);
    if (valid.length < 2) return;
    const min = Math.min(...valid);
    item.prices.forEach((price, i) => {
      if (price !== null && price > min * 1.4 && price - min > 500) {
        flags.push({
          severity: "low",
          title: `High ${item.category} price from ${data.contractors[i].company}`,
          description: `${data.contractors[i].company} quoted $${(price - min).toLocaleString()} more than the lowest bid for ${item.description}. Ask them to justify this difference.`,
          contractor: data.contractors[i].company,
        });
      }
    });
  });

  return flags;
}

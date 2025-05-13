
export type Provider = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  address: string;
  imageUrl: string;
  category: string;
  distance?: string;
};

export type FilterType = "relevance" | "distance" | "rating" | "availability";

export type CategoryLabels = Record<string, string>;

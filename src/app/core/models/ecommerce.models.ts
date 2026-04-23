export interface Wood {
  id: string;
  name: string;
  imageUrl?: string | null;
  isActive: boolean;
}

export interface Variant {
  id: string;
  productId: string;
  woodId: string;
  price: number;
  stock: number;
  wood: Wood;
}

export interface Bed {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  isActive: boolean;
  variants: Variant[];
}
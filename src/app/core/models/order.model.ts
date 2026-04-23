export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'PAID' | 'MANUFACTURING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  subtotal: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items: Item[];
}

export interface Item {
  id: string;
  orderId: string;
  productVariantId: string;
  fabricId: string;
  productName: string;
  woodName: string;
  fabricName: string;
  quantity: number;
  unitWoodPrice: number;
  unitFabricPrice: number;
  unitTotalPrice: number;
  createdAt: Date;
}

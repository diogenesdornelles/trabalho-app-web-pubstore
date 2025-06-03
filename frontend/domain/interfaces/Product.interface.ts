type ProductType = 'chopp' | 'wine' | 'beer' | 'sparkling' | 'whiskey';

interface BaseProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  alcohol_content: number;
  ibu: number;
  type: ProductType;
  disponible: boolean;
  quantity: number;
  volume: number;
  brand: string;
  created_at: string;
  source: string;
}

export interface ProductBasketProps extends BaseProductProps {
  customer_id: string | null;
  total_price: number;
}

export interface ProductProps extends BaseProductProps {}

export interface ProductQueryProps {
  name?: string;
  description?: string;
  min_price?: number;
  max_price?: number;
  brand?: string;
  product_type?: ProductType;
  skip?: number;
}

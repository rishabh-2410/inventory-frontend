export type EditProductRequest = Partial<{
    name: string;
    sku: string;
    selling_price: number;
    cost_price: number;
    category_id: string;
    image_url: string;
}>
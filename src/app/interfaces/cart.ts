import { Product } from "./product";

export interface Cart {
    quantity: number,
    products: Product[],
    total: number
}

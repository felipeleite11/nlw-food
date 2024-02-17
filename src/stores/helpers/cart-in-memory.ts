import { ProductProps } from "@/utils/data/products"
import { ProductCartProps } from "../cart-store"

export function add(products: ProductCartProps[], newProduct: ProductProps) {
	const existingProduct = products.find(prod => prod.id === newProduct.id)

	if (existingProduct) {
		return products.map(prod => prod.id === existingProduct.id ? { ...prod, quantity: prod.quantity + 1 } : prod)
	}

	return [...products, { ...newProduct, quantity: 1 }]
}
import { ProductProps } from "@/utils/data/products"
import { ProductCartProps } from "../cart-store"

export function add(products: ProductCartProps[], newProduct: ProductProps) {
	const existingProduct = products.find(prod => prod.id === newProduct.id)

	if (existingProduct) {
		return products.map(prod => prod.id === existingProduct.id ? { ...prod, quantity: prod.quantity + 1 } : prod)
	}

	return [...products, { ...newProduct, quantity: 1 }]
}

export function remove(products: ProductCartProps[], productIdToRemove: string) {
	const updateProducts = products.map(product => product.id === productIdToRemove ? {
		...product,
		quantity: product.quantity > 1 ? product.quantity - 1 : 0
	} : product)

	return updateProducts.filter(product => product.quantity > 0)
}
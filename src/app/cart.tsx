import { useState } from "react"
import { Text, View, ScrollView, Alert, Linking } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "expo-router"

import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { ProductCartProps, useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/utils/functions/format-currency"
import { Input } from "@/components/input"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button } from "@/components/button"
import { LinkButton } from "@/components/link-button"

const PHONE_NUMBER = '5591981293338'

export default function Cart() {
	const cartStore = useCartStore()

	const navigation = useNavigation()

	const [address, setAddress] = useState('')

	const total = cartStore.products.reduce((total, prod) => total + prod.price * prod.quantity, 0)

	function handleRemoveProduct(product: ProductCartProps) {
		Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
			{
				text: 'Cancelar'
			},
			{
				text: 'Remover',
				onPress: () => cartStore.remove(product.id)
			}
		])
	}

	function handleOrder() {
		if (!address.trim()) {
			return Alert.alert('Pedido', 'Informe o endereço de entrega.')
		}

		const products = cartStore.products.map(prod => `\n${prod.quantity} ${prod.title}`).join('')

		const message = `🍔 NOVO PEDIDO 🍕
			\n🛵 Entregar em: ${address}
			${products}
			\n💰 Valor total: ${formatCurrency(total)}`

		Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

		cartStore.clear()

		navigation.goBack()
	}

	return (
		<View className="flex-1 pt-8">
			<Header title="Seu carrinho" />

			<KeyboardAwareScrollView
				extraHeight={100}
				showsVerticalScrollIndicator={false}
			>
				<ScrollView>
					<View className="p-5 flex-1">
						{cartStore.products.length > 0 ? (
							<View className="border-b border-slate-700">
								{cartStore.products.map(prod => (
									<Product data={prod} key={prod.id} onPress={() => handleRemoveProduct(prod)} />
								))}
							</View>
						) : (
							<Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio</Text>
						)}

						<View className="flex-row gap-2 items-center mt-1 mb-4">
							<Text className="text-white text-xl font-subtitle">Total:</Text>
							<Text className="text-lime-400 text-2xl font-title">{formatCurrency(total)}</Text>
						</View>

						<Input
							placeholder="Informe o endereço de entrega"
							onChangeText={setAddress}
							onSubmitEditing={handleOrder}
							blurOnSubmit
							returnKeyType="next"
						/>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>

			<View className="p-5 gap-5">
				<Button onPress={handleOrder}>
					<Button.Text>Enviar pedido</Button.Text>
					<Button.Icon>
						<Feather name="arrow-right-circle" size={20} />
					</Button.Icon>
				</Button>

				<LinkButton title="Voltar ao cardápio" href="/" />
			</View>
		</View>
	)
}
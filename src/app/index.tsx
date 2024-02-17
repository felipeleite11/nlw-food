import React, { useState, useRef } from 'react'
import { View, FlatList, SectionList, Text } from 'react-native'

import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category_button'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Product } from '@/components/product'
import { Link } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'

export default function Home() {
	const sectionListRef = useRef<SectionList<ProductProps>>(null)

	const cartStore = useCartStore()

	const [category, setCategory] = useState(CATEGORIES[0])

	function handleCategorySelect(selectedCttegory: string) {
		setCategory(selectedCttegory)

		const sectionIndex = CATEGORIES.findIndex(cat => cat === selectedCttegory)

		if (sectionListRef.current) {
			sectionListRef.current.scrollToLocation({
				animated: true,
				sectionIndex,
				itemIndex: 0
			})
		}
	}

	const cartItemsQuantity = cartStore.products.reduce((total, prod) => total + prod.quantity, 0)

	return (
		<View className="flex-1 pt-8">
			<Header title="Cardápio" cartItemsQuantity={cartItemsQuantity} />

			<FlatList
				data={CATEGORIES}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<CategoryButton
						title={item}
						isSelected={item === category}
						onPress={() => {
							handleCategorySelect(item)
						}}
					/>
				)}
				horizontal
				className="max-h-10 mt-5"
				contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
				showsHorizontalScrollIndicator={false}
			/>

			<SectionList
				ref={sectionListRef}
				sections={MENU}
				keyExtractor={item => item.id}
				stickySectionHeadersEnabled
				renderItem={({ item }) => (
					<Link href={`/product/${item.id}`} asChild>
						<Product data={item} />
					</Link>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>
				)}
				className="flex-1 p-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 100
				}}
			/>
		</View>
	)
}

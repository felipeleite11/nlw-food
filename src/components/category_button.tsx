import { View, Pressable, PressableProps, Text } from "react-native"
import { clsx } from 'clsx'

type CategoryProps = PressableProps & {
	title: string
	isSelected?: boolean
}

export function CategoryButton({ title, isSelected, ...props }: CategoryProps) {
	return (
		<View>
			<Pressable
				className={
					clsx('bg-slate-800 px-4 justify-center rounded-md h-10',
						isSelected && 'border-2 border-lime-300'
					)
				}
				{...props}
			>
				<Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
			</Pressable>
		</View>
	)
}
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export type AccountsType = 'LDAP' | 'Локальная'
export type Accounts = Map<number, AccountsItem>
export interface AccountsItem {
	mark?: { text: string }[]
	type?: AccountsType
	login?: string
	password?: string | null
}

export const useAccounts = defineStore('accounts', () => {
	const data = useStorage<Accounts>('accounts', () => {
		const data = new Map()
		data.set(0, {
			type: 'Локальная'
		})
		return data
	})

	const countId = useStorage('countId', 1)
	const countIdUp = () => {
		countId.value++
	}

	const addDataItem = () => {
		data.value.set(countId.value, { type: 'Локальная' })
		countIdUp()
	}

	const updateDataItem = (id: number, _value: AccountsItem) => {
		data.value.set(id, { ...data.value.get(id), ..._value, })
	}

	const deleteDataItem = (id: number) => {
		data.value.delete(id)
	}

	return {
		data,
		addDataItem,
		updateDataItem,
		deleteDataItem
	}
})
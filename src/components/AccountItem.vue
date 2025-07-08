<template>
	<div class="grid grid-cols-subgrid col-span-full">
		<FormKit type="text" @blur="handleMark" :value="account.mark?.map(a => a.text).join(';')" validation="length:0,50" validation-visibility="blur" validation-label=" " />
		<FormKit type="select" @blur="handleType" :options="['Локальная', 'LDAP']" placeholder=" " :value="account.type" input-class="placeholder:text-red-500" ></FormKit>
		<FormKit @blur="handleLogin" type="text" :value="account.login" :outer-class="{ 'col-span-2': account.type !== 'Локальная' }" validation="required:trim | length:0,100" validation-visibility="blur" validation-label=" " />
		<FormKit @blur="handlePassword" v-if="account.type === 'Локальная'" :type="isPassword ? 'password' : 'text'" :value="account.password ?? ''" @suffix-icon-click="passwordToggle" :suffix-icon="isPassword ? 'eyeClosed' : 'eye'" validation="required:trim | length:0,100"
			validation-visibility="blur" validation-label=" " />
		<button @click="deleteDataItem(id)" class="cursor-pointer flex items-start mt-2.25">
			<svg class="text-red-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" />
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { useAccounts, type AccountsItem, type AccountsType } from '@/stores/accounts';
import { empty } from '@formkit/utils'
import { ref } from 'vue';

const { id, account } = defineProps<{
	id: number,
	account: AccountsItem
}>()

const { deleteDataItem, updateDataItem } = useAccounts()

const handleMark = (event: FocusEvent) => {
	const _value = (event?.target as HTMLInputElement).value

	if (_value.length > 50) return

	updateDataItem(id, {
		mark: _value.split(';').map((a) => ({ text: a })),
	})
}

const handleType = (event: FocusEvent) => {
	const _value = (event?.target as HTMLSelectElement).value as AccountsType

	const object: { type: AccountsType, password?: null } = {
		type: _value,
	}
	if (_value === 'LDAP') object.password = null

	updateDataItem(id, object)
}

const handleLogin = (event: FocusEvent) => {
	const _value = (event?.target as HTMLInputElement).value

	if (empty(_value.trim()) || _value.length > 100) return

	updateDataItem(id, {
		login: _value,
	})
}

const handlePassword = (event: FocusEvent) => {
	const _value = (event?.target as HTMLInputElement).value

	if (empty(_value.trim()) || _value.length > 100) return

	updateDataItem(id, {
		password: _value,
	})
}

const isPassword = ref(true)
const passwordToggle = () => {
	isPassword.value = !isPassword.value
}
</script>
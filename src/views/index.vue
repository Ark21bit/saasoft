<template>
	<div class="flex items-center gap-3 mt-12 rounded-lg px-3 py-2 bg-blue-300/20">
		<svg class="text-blue-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z" />
		</svg>
		Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
	</div>
	<h1 class="text-3xl mt-5">Учетные записи</h1>
	<div class="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-5 mt-4">
		<div class="grid grid-cols-subgrid col-span-full -mb-4 z-1 sticky bg-white top-0 py-2">
			<div>Метки</div>
			<div>Тип записи</div>
			<div>Логин</div>
			<div>Пароль</div>
		</div>
		<AccountItem v-for="item in data" :id="item[0]" :account="item[1]" />
		<FormKit type="button" @click="addDataItem()" outer-class="col-span-full" input-class="w-full justify-center text-xl $remove:!text-sm $remove:text-sm cursor-pointer">+</FormKit>
	</div>
</template>

<script setup lang="ts">
import AccountItem from '@/components/AccountItem.vue';
import { useAccounts } from '@/stores/accounts';
import { storeToRefs } from 'pinia';

const { data } = storeToRefs(useAccounts())
const { addDataItem } = useAccounts()
</script>
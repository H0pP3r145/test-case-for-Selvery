<template>
	<table class="table">
		<thead>
			<tr>
				<td>Переменная</td>
				<td>тип</td>
				<td>{{ titleCol3 }}</td>
				<td>Удалить</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in getActualData" :key="row.id">
				<td>
					<input
						type="text"
						v-model="row.variable"
						placeholder="Переменная"
						@input="updateVariableInput({ event: $event, id: row.id })"
					/>
				</td>
				<td>
					<select
						class="table__select"
						@change="updateTableData({ event: $event, id: row.id, key: 'type' })"
						:value="row.type"
					>
						<option value="">Выберите тип</option>
						<option value="number">Число</option>
						<option value="boolean">Логическое значение</option>
					</select>
				</td>
				<td>
					<div v-if="category === 'InputDataForm'">
						<input
							v-if="row.type === 'number'"
							type="number"
							placeholder="Значение"
							:value="row.value"
							@change="
								updateTableData({
									event: $event,
									id: row.id,
									key: 'value',
								})
							"
						/>
						<select
							v-else-if="row.type === 'boolean'"
							@change="updateTableData({ event: $event, id: row.id, key: 'value' })"
							:value="row.value"
							class="table__select"
						>
							<option value="true">Да</option>
							<option value="false">Нет</option>
						</select>
					</div>
					<input
						v-else
						type="text"
						:disabled="activeCategory !== 2"
						placeholder="Значение"
						@change="updateTableData({ event: $event, id: row.id, key: 'value' })"
						:value="row.value"
					/>
				</td>
				<td class="trash--icon">
					<TrashIcon v-if="tableDataVariable.length > 1" @click="removeElement(row.id)" />
					<span v-else>Единственное значение!</span>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { defineComponent } from "vue";
import TrashIcon from "@/assets/TrashIcon.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default defineComponent({
	name: "GenerateTable",
	components: { TrashIcon },
	props: {
		titleCol3: "Начальное значение" || "Формула",
		category: "InputDataForm" || "FormulaeDataForm",
	},
	data() {
		return {
			inputValue: "",
		};
	},
	methods: {
		...mapMutations({
			removeElement: "removeElement",
			updateTableData: "updateTableData",
			updateVariableInput: "updateVariableInput",
		}),
	},
	computed: {
		...mapState({
			tableDataVariable: (state) => state.store.tableDataVariable,
			activeCategory: (state) => state.store.activeCategory,
		}),
		...mapGetters({
			getActualData: "getActualData",
		}),
	},
});
</script>

<style scoped>
.trash--icon {
	text-align: center;
	vertical-align: center;
}

.table__select {
	width: 100%;
	height: 100%;
	background: none;
	border: none;
}

td input {
	background: none;
	border: none;
	outline: none;
	height: 100%;
	width: 100%;
}

.table {
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	height: auto;
	margin-top: 1rem;
}

.table,
.table td,
.table th {
	border: 1px solid #595959;
}

.table td,
.table th {
	padding: 3px 3px 3px 10px;
	width: 30px;
	height: 35px;
}
</style>

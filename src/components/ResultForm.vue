<template>
	<div class="result--block">
		<div class="result--block__input--data">
			<span class="input--data__title">Вводимые значения</span>
			<div class="input--data__cards">
				<div class="cards__single--card" v-for="row in getActualData" :key="row.id">
					<span>{{ row.variable }}</span>
					<select v-if="row.type === 'boolean'" class="single--card__table--boolean--select">
						<option value="true">Да</option>
						<option value="false">Нет</option>
					</select>
					<input
						v-else
						type="number"
						class="single--card__input"
						:value="row.value"
						@change="updateTableData({ event: $event, id: row.id, key: 'value' })"
					/>
				</div>
			</div>
		</div>
		<div class="result--block__output--data">
			<span class="input--data__title">Результат вычесляемых значений</span>
			<table class="result--block__table">
				<tbody>
					<tr v-for="row in tableDataFormulae" :key="row.id" class="table__tr">
						<td class="table__td">{{ row.variable }}</td>
						<td>
							<span>{{
								result1({ variable: row.variable, value: row.value, type: row.type })
							}}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default defineComponent({
	name: "ResultForm",
	data() {
		return {
			resultTable: [],
		};
	},
	methods: {
		...mapMutations({
			updateTableData: "updateTableData",
		}),
		result({ variable, value, type }) {
			let cache = value.split(/[\s,;]+/);
			for (let i = 0; i < cache.length; i++) {
				const variableMatch = this.tableDataVariable.find((item) => item.variable === cache[i]);
				if (variableMatch) {
					cache[i] = variableMatch.value;
				}
			}

			for (let i = 0; i < cache.length; i++) {
				const resultMatch = this.resultTable.find((item) => item.variable === cache[i]);
				if (resultMatch) {
					cache[i] = resultMatch.result;
				}
			}

			try {
				let evalResult = eval(cache.join(" "));
				this.resultTable.push({ variable: variable, result: evalResult });
				return type === "boolean" ? Boolean(evalResult) : evalResult;
			} catch (e) {
				console.log(e);
				return "Ошибка в выражении!";
			}
		},
	},
	computed: {
		...mapGetters({
			getActualData: "getActualData",
		}),
		...mapState({
			actionCategory: (state) => state.store.actionCategory,
			tableDataVariable: (state) => state.store.tableDataVariable,
			tableDataFormulae: (state) => state.store.tableDataFormulae,
		}),
	},
});
</script>

<style scoped>
.result--block {
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-top: 2rem;
}

.result--block__input--data {
	width: 50%;
	font-size: 1.3rem;
}

.input--data__cards {
	margin-top: 1.5rem;
}

.cards__single--card {
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	width: 55%;
	font-size: 1rem;
	color: #8d8d8d;
}

.single--card__input {
	font-size: 1.3rem;
	font-weight: bold;
	margin-top: 0.5rem;
	padding: 10px;
	border: none;
	border-radius: 10px;
	outline: none;
}

.single--card__table--boolean--select {
	font-size: 1.3rem;
	font-weight: bold;
	padding: 10px;
	border: none;
	border-radius: 10px;
	outline: none;
}

table {
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	height: auto;
	margin-top: 1rem;
}

table,
table td,
table th {
	border: 1px solid #595959;
}

table td,
table th {
	padding: 3px 3px 3px 10px;
	width: 30px;
	height: 35px;
}

table th {
	background: #347c99;
	color: #fff;
	font-weight: normal;
}

.input--data__title {
	font-weight: bold;
	font-size: 1.5rem;
}
</style>

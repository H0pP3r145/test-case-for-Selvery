<template>
	<div class="table--block__button">
		<button
			v-if="activeCategory !== 3"
			class="table-block__button--add button"
			@click="addNewLine"
		>
			Добавить переменную
		</button>
		<div class="localstorage--block__button">
			<button class="localstorage--block__button--save button" @click="saveToLocalStorage">
				Сохранить
			</button>
			<button class="localstorage--block__button--clear button" @click="clearLocalStorage">
				Очистить
			</button>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
	name: "FunctionalButtons",
	methods: {
		...mapMutations({
			addNewLine: "addNewLine",
			saveToLocalStorage: "saveToLocalStorage",
		}),
		clearLocalStorage() {
			localStorage.clear();
			location.reload();
		},
	},
	computed: {
		...mapState({
			activeCategory: (state) => state.store.activeCategory,
			tableDataVariable: (state) => state.store.tableDataVariable,
			tableDataFormulae: (state) => state.store.tableDataFormulae,
		}),
	},
});
</script>

<style scoped>
.table--block__button {
	margin-top: 2rem;
	width: 100%;
	height: 10rem;
	position: relative;
}

.button {
	height: 3rem;
	border-radius: 10px;
	outline: none;
	border: none;
	font-weight: bold;
	font-size: 1rem;
}

.button:not(.table-block__button--add) {
	width: 8rem;
}

.table-block__button--add {
	width: 14rem;
	background: #9e6ef6;
	color: white;
}

.localstorage--block__button {
	display: flex;
	flex-direction: row;
	right: 0;
	bottom: 0;
	position: absolute;
}

.localstorage--block__button--save {
	margin-right: 2rem;
}

.localstorage--block__button--clear {
}
</style>

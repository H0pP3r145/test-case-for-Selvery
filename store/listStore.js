export const listStore = {
	state: {
		activeCategory: 1,
		tableDataVariable: [],
		tableDataFormulae: [],
	},
	getters: {
		getTitle(state) {
			return state.activeCategory === 1
				? "Вводимые значения"
				: state.activeCategory === 2
				? "Вычисляемые значения"
				: "Проверка результатов";
		},
		getActualData(state) {
			return state.activeCategory === 2 ? state.tableDataFormulae : state.tableDataVariable;
		},
	},
	mutations: {
		setActiveCategory(state, newValue) {
			state.activeCategory = newValue;
		},
		addNewLine(state) {
			if (state.activeCategory === 1) {
				state.tableDataVariable.push({ id: Date.now(), variable: "", type: "", value: "" });
			} else {
				state.tableDataFormulae.push({ id: Date.now(), variable: "", type: "", value: "" });
			}
		},
		removeElement(state, id) {
			if (state.activeCategory === 1) {
				state.tableDataVariable = state.tableDataVariable.filter((row) => row["id"] !== id);
			} else {
				state.tableDataFormulae = state.tableDataFormulae.filter((row) => row["id"] !== id);
			}
		},
		updateTableData(state, { event, id, key }) {
			if (state.activeCategory === 2) {
				state.tableDataFormulae[state.tableDataFormulae.findIndex((item) => item.id === id)][
					key
				] = event.target.value;
			} else {
				state.tableDataVariable[state.tableDataVariable.findIndex((item) => item.id === id)][
					key
				] = event.target.value;
			}
		},
		updateVariableInput(state, { event, id }) {
			const result = event.target.value.replace(/[^a-zA-Z]/g, "");
			if (state.activeCategory === 1) {
				state.tableDataVariable[state.tableDataVariable.findIndex((item) => item.id === id)][
					"variable"
				] = result;
			} else {
				state.tableDataFormulae[state.tableDataFormulae.findIndex((item) => item.id === id)][
					"variable"
				] = result;
			}
		},
		initialLocalStorage(state) {
			const tableDataVariable_localstorage = JSON.parse(
				localStorage.getItem("tableDataVariable")
			);
			const tableDataFormulae_localstorage = JSON.parse(
				localStorage.getItem("tableDataFormulae")
			);
			if (!tableDataVariable_localstorage) {
				state.tableDataVariable = [{ id: Date.now(), variable: "", type: "", value: "" }];
				state.tableDataFormulae = [{ id: Date.now() * 2, variable: "", type: "", value: "" }];
			} else {
				state.tableDataVariable = tableDataVariable_localstorage;
				state.tableDataFormulae = tableDataFormulae_localstorage;
			}
		},
		saveToLocalStorage(state) {
			localStorage.clear();
			localStorage.setItem("tableDataVariable", JSON.stringify(state.tableDataVariable));
			localStorage.setItem("tableDataFormulae", JSON.stringify(state.tableDataFormulae));
		},
	},
	namespaces: true,
};

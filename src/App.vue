<template>
	<div id="app">
		<main class="container">
			<Header />
			<h1>{{ getTitle }}</h1>
			<InputValueForm v-if="activeCategory === 1" />
			<FormulaeDataForm v-else-if="activeCategory === 2" />
			<ResultForm v-else />
			<FunctionalButtons />
		</main>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import InputValueForm from "@/components/inputValueForm.vue";
import Header from "@/components/Header.vue";
import FunctionalButtons from "@/components/FunctionalButtons.vue";
import FormulaeDataForm from "@/components/FormulaeDataForm.vue";
import ResultForm from "@/components/ResultForm.vue";

export default {
	name: "App",
	components: { ResultForm, FormulaeDataForm, FunctionalButtons, Header, InputValueForm },
	data() {
		return {};
	},
	methods: {
		...mapMutations({
			initialLocalStorage: "initialLocalStorage",
		}),
	},
	computed: {
		...mapGetters({
			getTitle: "getTitle",
		}),
		...mapState({
			activeCategory: (state) => state.store.activeCategory,
		}),
	},
	mounted() {
		this.initialLocalStorage();
	},
};
</script>

<style>
* {
	font-family: "PT Sans", sans-serif;
	margin: 0;
	padding: 0;
}

.no--select {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>

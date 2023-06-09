<template>
	<header class="header">
		<div class="category--titles">
			<span
				class="no--select category--titles__title"
				:class="{ active: activeCategory === 1 }"
				@click="setActiveCategory(1)"
				>Вводимые значения</span
			>
			<span
				class="no--select category--titles__title"
				:class="{ active: activeCategory === 2 }"
				@click="setActiveCategory(2)"
				>Вычисляемые значения</span
			>
			<span
				class="no--select category--titles__title"
				:class="{ active: activeCategory === 3 }"
				@click="setActiveCategory(3)"
				>Проверка расчетов</span
			>
		</div>
	</header>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default defineComponent({
	name: "Header",
	methods: {
		...mapMutations({
			setActiveCategory: "setActiveCategory",
		}),
	},
	computed: {
		...mapState({
			activeCategory: (state) => state.store.activeCategory,
		}),
		...mapGetters({
			getTitle: "getTitle",
		}),
	},
});
</script>

<style scoped>
.header {
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: start;
	position: relative;
	margin-bottom: 2rem;
	border-bottom: 1px solid rgba(113, 113, 113, 30%);
}

.category--titles {
	display: flex;
	flex-direction: row;
	font-size: 1.3rem;
}

.category--titles__title {
	margin-right: 2vw;
	padding-bottom: 0.5rem;
}

.active {
	border-bottom: 3px solid #9e6ef6;
}
</style>

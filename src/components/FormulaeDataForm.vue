<template>
	<div>
		<GenerateTable title-col3="Формула" category="FormulaeDataForm" />
	</div>
</template>

<script>
import { defineComponent } from "vue";
import GenerateTable from "@/components/GenerateTable.vue";

export default defineComponent({
	name: "FormulaeDataForm",
	components: { GenerateTable },
	data() {
		return {};
	},
});
</script>

<style scoped></style>

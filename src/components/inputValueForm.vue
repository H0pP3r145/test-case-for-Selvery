<template>
	<div>
		<GenerateTable title-col3="Начальное значение" category="InputDataForm" />
	</div>
</template>

<script>
import { defineComponent } from "vue";
import GenerateTable from "@/components/GenerateTable.vue";

export default defineComponent({
	name: "inputValueForm",
	components: { GenerateTable },
	data() {
		return {};
	},
});
</script>

<style scoped></style>

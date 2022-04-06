<template>
	<div class="head">
		<Logo></Logo>
		<ChangeMenu></ChangeMenu>
	</div>
</template>
<script setup>
import Logo from "./logo";
import ChangeMenu from "./changeMenu";
</script>
<style lang="scss" scoped>
.head {
	height: 100%;
	display: flex;
	align-items: center;
}
</style>

<template>
	<header class="main-header">
		<h1>TodoList for {{ this.userName }} </h1>
		<h2 align="right">——What do you want to be?</h2>
	</header>
</template>

<script>
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Name',
	data () {
		return {
			userName: 'ChangQingAAS'
		}
	}
}
</script>

<style lang="stylus" scoped>
.main-header
	text-align center

	h1
		font-size 60px
		color red
		font-weight 400
		margin 20px
	h2
		font-size 50px
		color red
		font-weight 300
		margin 20px
</style>

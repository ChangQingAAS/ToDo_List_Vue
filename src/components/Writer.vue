<template>
	<div id="footer">
		<span>Written by {{ this.writer }}</span>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Writer',
	data () {
		return {
			writer: 'ChangQingAAS'
		}
	}
}
</script>

<style lang="stylus" scoped>
#footer
	margin-top 30px
	text-align center
	color skyblue
	font-size 10px
	text-shadow 0 1px 0 #ffffff
</style>
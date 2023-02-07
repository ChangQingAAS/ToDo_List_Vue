<template>
	<div class="todo-header">
		<input v-model="title"
		       autofocus="autofocus"
		       placeholder="What to do?"
		       type="text"
		       @keyup.enter="add"/>
	</div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
	name: 'MyHeader',
	data () {
		return {
			title: ''
		}
	},
	methods: {
		add () {
			// 校验数据
			if (!this.title.trim()) {
				return alert('输入不能为空！')
			}
			// 将用户的输入包装成一个输入todo对象
			const todoObj = {
				id: nanoid(),
				title: this.title,
				done: false,
			}
			// 清空输入
			this.title = ''
			// 通知APP组件去添加一个todo对象
			this.$emit('addTodo', todoObj)
		}
	}
}
</script>

<style scoped>
/*header*/
.todo-header input {
	width: 560px;
	height: 30px;
	font-size: 18px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 4px 7px;
}

.todo-header input:focus {
	outline: none;
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
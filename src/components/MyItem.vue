<template>
	<transition appear name="todo">
		<li>
			<label>
				<input :checked="todo.done"
				       type="checkbox"
				       @change="handleCheck(todo.id)"/>
				<span v-show="!todo.isEdit"
				      :style="todo.done==true ? 'color: #d9d900; text-decoration: line-through' : '' "
				>{{ todo.title }}</span>
				<input
					v-show="todo.isEdit"
					ref="inputTitle"
					:value="todo.title"
					style="color: skyblue"
					type="text"
					@blur="handleBlur(todo,$event)">
			</label>
			<!--<button class="btn btn-danger" style="display: none">删除</button>-->
			<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
			<button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
		</li>
	</transition>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
	name: 'MyItem',
	// 声明接收TODO对象
	props: [
		'todo',
	],
	methods: {
		handleCheck (id) {
			// 通知App组件将对应的todo对象的done值取反
			this.$bus.$emit('checkTodo', id)
		},
		handleDelete (id) {
			if (confirm('确定删除吗?')) {
				// 通知App组件将对应的todo对象删除
				pubsub.publish('deleteTodo', id)
			}
		},
		handleEdit (todo) {
			if (todo.hasOwnProperty('isEdit')) {
				todo.isEdit = true
			} else {
				this.$set(todo, 'isEdit', true)
			}
			this.$nextTick(function () {
				this.$refs.inputTitle.focus()
			})
		},
		// 失去焦点回调（真正执行修改逻辑）
		handleBlur (todo, e) {
			todo.isEdit = false
			if (!e.target.value.trim()) {
				return alert('输入不能为空！')
			} else {
				this.$bus.$emit('updateTodo', todo.id, e.target.value)
			}
		},
	}
}
</script>

<style scoped>
/*item*/
li {
	list-style: none;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #ddd;
	font-size: 24px;
}

li label {
	float: left;
	cursor: pointer;
	color: red;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li button {
	float: right;
	display: none;
	margin-top: 3px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}

li:hover {
	background-color: #ddd;
}

li:hover button {
	display: block;
}

.todo-enter-active {
	animation: atguigu 0.5s linear;
}

.todo-leave-active {
	animation: atguigu 0.5s linear reverse;
}

@keyframes atguigu {
	from {
		transform: translateX(-10%);
	}
	to {
		transform: translateX(0px);
	}
}
</style>

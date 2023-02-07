<template>
	<div v-show="total" class="todo-footer">
		<label>
			<input v-model="isAll" type="checkbox" class="toggle"/>
			<span>{{ doneTotal }} Done / {{ total }} All</span>
		</label>
		<button class="btn btn-danger" @click="clearAll">Clear All Todos</button>
	</div>
</template>

<script>

export default {
	name: 'MyFooter',
	props: [
		'todos',
	],
	computed: {
		total () {
			return this.todos.length
		},
		doneTotal () {
			let temp = 0
			this.todos.forEach((todo) => {
				if (todo.done === true) {
					temp++
				}
			})
			// console.log('计算属性doneNumber: ', temp)
			return temp
		},
		isAll: {
			get () {
				return this.total === this.doneTotal && this.total > 0
			},
			set (value) {
				this.$emit('checkAllTodo', value)
			},
		},
	},
	methods: {
		clearAll () {
			this.$emit('clearAllTodo')
		},
	}
}
</script>

<style scoped>
/*footer*/
.todo-footer {
	height: 40px;
	line-height: 40px;
	padding-left: 6px;
	margin-top: 5px;
}

.todo-footer span {
	color: orangered;
	font-size: 16px;
}

.todo-footer label {
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}

.todo-footer label input {
	position: relative;
	top: -1px;
	vertical-align: middle;
	margin-right: 5px;
}

.todo-footer button {
	float: right;
	margin-top: 5px;
}

.toggle {
	margin: auto 0;
	appearance: none;
}
.toggle:after {
	content: url("../assets/unChecked.svg");
}
.toggle:checked:after {
	content: url("../assets/checked.svg");
}
</style>
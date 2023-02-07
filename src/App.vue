<template>
	<div id="root">
		<Name></Name>
		<div class="todo-container">
			<div class="todo-wrap">
				<MyHeader @addTodo="addTodo"></MyHeader>
				<MyList :todos="todos"></MyList>
				<MyFooter
					:todos="todos"
					@checkAllTodo="checkAllTodo"
					@clearAllTodo="clearAllTodo"
				></MyFooter>
			</div>
		</div>
		<Writer></Writer>
	</div>

</template>

<script>
//引入组件
import pubsub from 'pubsub-js'
import MyHeader from '@/components/MyHeader.vue'
import MyList from '@/components/MyList.vue'
import MyFooter from '@/components/MyFooter.vue'
import Writer from '@/components/Writer.vue'
import Name from '@/components/Name.vue'

export default {
	name: 'App',
	components: {
		Name,
		Writer,
		MyFooter,
		MyHeader,
		MyList
	},
	data () {
		return {
			todos: JSON.parse(localStorage.getItem('todos')) || []
		}
	},
	watch: {
		todos: {
			deep: true,
			handler (value) {
				localStorage.setItem('todos', JSON.stringify(value))
			}
		}
	},
	mounted () {
		this.$bus.$on('checkTodo', this.checkTodo)
		this.$bus.$on('updateTodo', this.updateTodo)
		this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
	},
	beforeDestroy () {
		this.$bus.off('checkTodo')
		this.$bus.off('updateTodo')
		pubsub.unsubscribe(this.pubId)
	},
	methods: {
		// 添加一个todo
		addTodo (todoObj) {
			// console.log('收到数据', todoObj)
			this.todos.unshift(todoObj)
		},
		// 修改todo对象的勾选
		checkTodo (id) {
			this.todos.forEach((todo) => {
				if (todo.id === id) {
					todo.done = !todo.done
				}
			})
		},
		// 修改todo对象的title
		updateTodo (id, value) {
			this.todos.forEach((todo) => {
				if (todo.id === id) {
					todo.title = value
				}
			})
		},
		// 删除todo对象的勾选
		deleteTodo (_, id) {
			this.todos = this.todos.filter((todo) => {
				return todo.id !== id
			})
		},
		// 全选 or 全不选
		checkAllTodo (done) {
			this.todos.forEach((todo) => {
				todo.done = done
			})
		},
		// 清除所有已完成的todo
		clearAllTodo () {
			this.todos = this.todos.filter((todo) => {
				return !todo.done
			})
		}
	},
}
</script>

<style>
/*base*/
body {
	background: #fff;
}

.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}

.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}

.btn-edit {
	color: #fff;
	background-color: skyblue;
	border: 1px solid deepskyblue;
	margin-right: 5px;
}

.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}

.btn:focus {
	outline: none;
}

.todo-container {
	width: 600px;
	margin: 0 auto;
	box-shadow: 0 0 5px #666;
}

.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>

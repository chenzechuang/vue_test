<template>
  <div>
    <BaseInput v-model="inputText" aria-placeholder="todo text" @keydown.enter="addTodo" />
    <ul v-if="todoList.length">
      <TodoListItem v-for="todo in todoList" :key="todo.id" :todo="todo" @remove="removeTodo" />
    </ul>
    <p v-else>No TodoItem</p>
  </div>
</template>

<script>
import BaseInput from "./BaseInput";
import TodoListItem from "./TodoListItem";
export default {
  name: "TodoList",
  components: {
    BaseInput,
    TodoListItem
  },
  data() {
    return {
      inputText: "",
      todoList: []
    };
  },
  methods: {
    addTodo() {
      const trimmedText = this.inputText.trim();
      if (trimmedText) {
        this.todoList.push({
          id: this.todoList.length,
          text: this.inputText
        });
        this.inputText = "";
      }
    },
    removeTodo(id) {
      this.todoList = this.todoList.filter(todo => {
				return todo.id !== id
			})
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
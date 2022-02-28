import HttpService from "./http.service";

class _TodoService extends HttpService {
  async getList(params = {}) {
    const response = await this.get("/todos", {
      params,
    });

    return response.data;
  }

  async createTodo(todo = {}) {
    const response = await this.post("/todos", {
      body: todo,
    });

    return response.data;
  }

  async updateTodo(todoId, data) {
    const response = await this.patch(`/todos/${todoId}`, {
      body: data,
    });

    return response.data;
  }

  async changeStatus(todoId, status) {
    const response = await this.patch(`/todos/${todoId}/status`, {
      body: {
        status,
      },
    });

    return response.data;
  }

  async deleteTodo(todoId) {
    const response = await this.delete(`/todos/${todoId}`);

    return response.data;
  }
}

const TodoService = new _TodoService();
export default TodoService;

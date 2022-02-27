import HttpService from "./http.service";

class _TodoService extends HttpService {
  async getList(params = {}) {
    try {
      const response = await this.get("/todos", {
        params,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createTodo(todo = {}) {
    try {
      const response = await this.post("/todos", {
        body: todo,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async changeStatus(todoId, status) {
    try {
      const response = await this.patch(`/todos/${todoId}/status`, {
        body: {
          status,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTodo(todoId) {
    try {
      const response = await this.delete(`/todos/${todoId}`);

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const TodoService = new _TodoService();
export default TodoService;

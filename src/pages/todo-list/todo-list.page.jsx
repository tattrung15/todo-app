import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoAdd from "../../components/todo-add/todo-add.component";
import TodoItem from "../../components/todo-item/todo-item.component";
import TodoFilter from "../../components/todo-filter/todo-filter.component";
import { Roles, TODO_STATUS } from "../../constants/common";
import TodoService from "../../services/http/todo.service";
import StorageService from "../../services/storage.service";
import "./todo-list.page.scss";
import {
  NotificationType,
  openNotification,
} from "../../services/notification.service";
import { FILTER, SORT } from "../../constants/common";

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  const handleLogout = () => {
    StorageService.set("role", Roles.GUEST);
    StorageService.set("access_token", "");
    navigate("/sign-in");
  };

  const addTodo = (todo) => {
    const newTodo = {
      title: todo.title,
      ...(todo.dueDate ? { dueDate: todo.dueDate } : {}),
    };

    const [...currTodos] = todos;

    TodoService.createTodo(newTodo)
      .then((response) => {
        currTodos.unshift(response.result.data);
        setTodos(currTodos);
        openNotification(NotificationType.SUCCESS)("Create success");
      })
      .catch(() => {
        openNotification(NotificationType.ERROR)("Create failed");
      });
  };

  const deleteTodo = (todo) => {
    const [...currTodos] = todos;

    TodoService.deleteTodo(todo.id)
      .then(() => {
        const updatedTodos = currTodos.filter((item) => item.id !== todo.id);
        setTodos(updatedTodos);
        openNotification(NotificationType.SUCCESS)("Delete success");
      })
      .catch(() => {
        openNotification(NotificationType.ERROR)("Delete failed");
      });
  };

  const getListTodo = (filter = "", sort = "") => {
    const params = {};

    switch (filter) {
      case FILTER.COMPLETED:
        params.equal = {
          status: TODO_STATUS.DONE,
        };
        break;
      case FILTER.ACTIVE:
        params.equal = {
          status: TODO_STATUS.UN_DONE,
        };
        break;
      case FILTER.HAS_DUE_DATE:
        params.dueDate = true;
        break;
      default:
        params.equal = {};
    }

    switch (sort) {
      case SORT.CREATED_AT_ASC:
        params.sort = {
          createdAt: "asc",
        };
        break;
      case SORT.CREATED_AT_DESC:
        params.sort = {
          createdAt: "desc",
        };
        break;
      case SORT.DUE_DATE_ASC:
        params.sort = {
          dueDate: "asc",
        };
        break;
      default:
        params.sort = {};
    }

    TodoService.getList(params)
      .then((response) => {
        setTodos(response.result.data);
      })
      .catch(() => {
        openNotification(NotificationType.ERROR)("Cannot fetch list todos");
      });
  };

  useEffect(() => {
    getListTodo();
  }, []);

  return (
    <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
      <div className="row m-1 p-4">
        <div className="col">
          <p className="d-flex justify-content-end text-decoration-underline text-primary">
            <span className="btn-logout" onClick={handleLogout}>
              Log out
            </span>
          </p>
          <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
            <i className="fa fa-check bg-primary text-white rounded p-2 mx-2"></i>
            <u>My Todos</u>
          </div>
        </div>
      </div>
      <div className="row m-1 p-3">
        <TodoAdd addTodo={addTodo} />
      </div>
      <div className="p-2 mx-4 border-black-25 border-bottom"></div>
      <div className="row m-1 p-3 px-5 justify-content-end">
        <TodoFilter getListTodo={getListTodo} />
      </div>
      <div className="row mx-1 px-5 pb-3 w-80">
        <div className="col mx-auto">
          {!!todos.length &&
            todos.map((item, index) => (
              <TodoItem key={index} todo={item} deleteTodo={deleteTodo} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;

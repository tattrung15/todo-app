import { useNavigate } from "react-router-dom";
import AddTodo from "../../components/todo-add/todo-add.component";
import TodoFilter from "../../components/todo-filter/todo-filter.component";
import TodoItem from "../../components/todo-item/todo-item.component";
import { Roles } from "../../constants/common";
import StorageService from "../../services/storage.service";
import "./todo-list.page.scss";

function TodoList() {
  const navigate = useNavigate();

  const handleLogout = () => {
    StorageService.set("role", Roles.GUEST);
    StorageService.set("access_token", "");
    navigate("/sign-in");
  };

  return (
    <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
      <div className="row m-1 p-4">
        <div className="col">
          <p
            className="d-flex justify-content-end text-decoration-underline text-primary btn-logout"
            onClick={handleLogout}
          >
            Log out
          </p>
          <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
            <i className="fa fa-check bg-primary text-white rounded p-2 mx-2"></i>
            <u>My Todos</u>
          </div>
        </div>
      </div>
      <div className="row m-1 p-3">
        <AddTodo />
      </div>
      <div className="p-2 mx-4 border-black-25 border-bottom"></div>
      <div className="row m-1 p-3 px-5 justify-content-end">
        <TodoFilter />
      </div>
      <div className="row mx-1 px-5 pb-3 w-80">
        <div className="col mx-auto">
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </div>
      </div>
    </div>
  );
}

export default TodoList;

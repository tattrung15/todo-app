import { useState } from "react";
import { DatePicker, Button } from "antd";
import moment from "moment";

function AddTodo(props) {
  const { addTodo } = props;

  const [todo, setTodo] = useState({
    title: "",
    dueDate: "",
  });

  const onDatePickerChange = (date, dateString) => {
    setTodo({
      ...todo,
      dueDate: dateString,
    });
  };

  const onChange = (event) => {
    setTodo({
      ...todo,
      title: event.target.value,
    });
  };

  return (
    <div className="col col-11 mx-auto">
      <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
        <div className="col">
          <input
            className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
            type="text"
            placeholder="Add new .."
            onChange={onChange}
            value={todo.title}
          />
        </div>
        <div className="col-auto m-0 px-2 d-flex align-items-center">
          <DatePicker
            className="mx-2"
            onChange={onDatePickerChange}
            placeholder="Set due date"
            value={todo.dueDate ? moment(todo.dueDate) : ""}
          />
        </div>
        <div className="col-auto px-0 mx-0 mr-2">
          <Button
            type="primary"
            onClick={() => {
              addTodo(todo);
              setTodo({ title: "", dueDate: "" });
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;

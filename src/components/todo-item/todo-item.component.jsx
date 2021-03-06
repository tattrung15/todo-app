import { useEffect, useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { Checkbox, DatePicker, Popconfirm, Tooltip } from "antd";
import { DEFAULT_DATE_FORMAT, TODO_STATUS } from "../../constants/common";
import TodoService from "../../services/http/todo.service";
import {
  NotificationType,
  openNotification,
} from "../../services/notification.service";
import { useStateFromProp } from "../../hooks/use-state-from-prop.hook";

function TodoItem(props) {
  const { todo, deleteTodo } = props;
  const [isEdit, setEdit] = useState(false);
  const [todoState] = useStateFromProp(() => {
    todo.dueDate = todo.dueDate
      ? moment(todo.dueDate).format(DEFAULT_DATE_FORMAT)
      : "";
    return todo;
  });
  const [todoEdit, setTodoEdit] = useState(todoState);

  useEffect(() => {
    setTodoEdit(todoState);
  }, [todoState]);

  const handleChangeStatus = () => {
    const newStatus =
      todoEdit.status === TODO_STATUS.DONE
        ? TODO_STATUS.UN_DONE
        : TODO_STATUS.DONE;
    TodoService.changeStatus(todo.id, newStatus)
      .then(() => {
        setTodoEdit({
          ...todoEdit,
          status: newStatus,
        });
      })
      .catch((e) => {
        const { message } = e.response.data;
        openNotification(NotificationType.ERROR)(message);
      });
  };

  const onDatePickerChange = (date, dateString) => {
    setTodoEdit({
      ...todoEdit,
      dueDate: dateString ? moment(dateString).format(DEFAULT_DATE_FORMAT) : "",
    });
  };

  const onInputChange = (event) => {
    setTodoEdit({
      ...todoEdit,
      title: event.target.value,
    });
  };

  const updateTodo = () => {
    const newData = {
      title: todoEdit.title,
      ...(todoEdit.dueDate ? { dueDate: todoEdit.dueDate } : {}),
    };

    TodoService.updateTodo(todo.id, newData)
      .then(() => {
        setEdit(false);
        openNotification(NotificationType.SUCCESS)("Update success");
      })
      .catch((e) => {
        const { message } = e.response.data;
        openNotification(NotificationType.ERROR)(message);
      });
  };

  const cancelUpdate = () => {
    setEdit(false);
    setTodoEdit(todoState);
  };

  return (
    <div className="row px-3 align-items-center todo-item rounded">
      <div className="col-auto m-1 p-0 d-flex align-items-center">
        <Tooltip
          placement="bottom"
          title={
            todoEdit.status === TODO_STATUS.DONE
              ? "Mark as todo"
              : "Mark as complete"
          }
        >
          <div>
            <Checkbox checked={todoEdit.status} onChange={handleChangeStatus} />
          </div>
        </Tooltip>
      </div>
      <div className="col px-1 m-1 d-flex align-items-center">
        <Tooltip placement="bottom" title={todo.title}>
          <input
            type="text"
            className={clsx(
              "form-control form-control-lg border-0 edit-todo-input rounded px-3",
              {
                "bg-white": isEdit,
                "bg-transparent": !isEdit,
              }
            )}
            readOnly={!isEdit}
            value={todoEdit.title}
            onChange={onInputChange}
          />
        </Tooltip>
      </div>
      {todoEdit.dueDate && !isEdit && (
        <div className="col-auto m-0 p-0 px-2">
          <div className="row">
            <div
              className={clsx(
                "col-auto d-flex align-items-center rounded bg-white border",
                {
                  "border-warning": moment(todoEdit.dueDate).isAfter(
                    new Date()
                  ),
                  "border-danger": moment(todoEdit.dueDate).isBefore(
                    new Date()
                  ),
                }
              )}
            >
              <Tooltip placement="bottom" title="Due on date">
                <i
                  className={clsx("fa fa-hourglass-2 my-2 px-2", {
                    "text-warning": moment(todoEdit.dueDate).isAfter(
                      new Date()
                    ),
                    "text-danger": moment(todoEdit.dueDate).isBefore(
                      new Date()
                    ),
                  })}
                  data-toggle="tooltip"
                ></i>
              </Tooltip>
              <h6 className="text my-2 pr-2">
                {moment(todoEdit.dueDate).format(DEFAULT_DATE_FORMAT)}
              </h6>
            </div>
          </div>
        </div>
      )}
      {isEdit && (
        <div className="col-auto m-0 p-0 px-2">
          <div className="row">
            <DatePicker
              className="mx-2"
              onChange={onDatePickerChange}
              placeholder="Update due date"
              value={todoEdit.dueDate ? moment(todoEdit.dueDate) : ""}
            />
          </div>
        </div>
      )}
      <div className="col-auto m-1 p-0 todo-actions">
        <div className="d-flex align-items-center justify-content-end">
          {isEdit ? (
            <i
              className="fa fa-check text-info mx-4 p-0 fs-5 btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Update todo"
              onClick={updateTodo}
            ></i>
          ) : (
            <i
              className="fa fa-pencil text-info mx-4 p-0 fs-5 btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit todo"
              onClick={() => setEdit(true)}
            ></i>
          )}
          {!isEdit ? (
            <Popconfirm
              placement="top"
              title="Are you sure to delete this todo?"
              onConfirm={() => deleteTodo(todo)}
            >
              <i
                className="fa fa-trash-o text-danger m-0 p-0 fs-5 btn"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Delete todo"
              ></i>
            </Popconfirm>
          ) : (
            <i
              className="fa fa-times text-danger m-0 p-0 fs-5 btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Cancel"
              onClick={cancelUpdate}
            ></i>
          )}
        </div>
        <div className="row todo-created-info">
          <div className="col-auto d-flex align-items-center pr-2">
            <i
              className="fa fa-info-circle my-0 px-2 text-black-50 btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Created date"
              data-original-title="Created date"
            ></i>
            <label className="date-label my-2 text-black-50">
              {moment(todo.createdAt).format(DEFAULT_DATE_FORMAT)}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;

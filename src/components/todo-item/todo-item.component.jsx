import { Checkbox, Popconfirm, Tooltip } from "antd";
import moment from "moment";
import { useState } from "react";
import { DEFAULT_DATE_FORMAT, TODO_STATUS } from "../../constants/common";
import TodoService from "../../services/http/todo.service";
import {
  NotificationType,
  openNotification,
} from "../../services/notification.service";

function TodoItem(props) {
  const { todo, deleteTodo } = props;
  const [isDone, setIsDone] = useState(todo.status);

  const handleChangeStatus = () => {
    const newStatus =
      isDone === TODO_STATUS.DONE ? TODO_STATUS.UN_DONE : TODO_STATUS.DONE;
    TodoService.changeStatus(todo.id, newStatus)
      .then(() => {
        setIsDone(newStatus);
      })
      .catch(() => {
        openNotification(NotificationType.ERROR)("Change status failed");
      });
  };

  return (
    <div className="row px-3 align-items-center todo-item rounded">
      <div className="col-auto m-1 p-0 d-flex align-items-center">
        <Tooltip
          placement="bottom"
          title={
            isDone === TODO_STATUS.DONE ? "Mark as todo" : "Mark as complete"
          }
        >
          <div>
            <Checkbox checked={isDone} onChange={handleChangeStatus} />
          </div>
        </Tooltip>
      </div>
      <div className="col px-1 m-1 d-flex align-items-center">
        <Tooltip placement="bottom" title={todo.title}>
          <input
            type="text"
            className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
            readOnly
            value={todo.title}
          />
        </Tooltip>
      </div>
      {todo.dueDate && (
        <div className="col-auto m-0 p-0 px-2">
          <div className="row">
            <div className="col-auto d-flex align-items-center rounded bg-white border border-warning">
              <Tooltip placement="bottom" title="Due on date">
                <i
                  className="fa fa-hourglass-2 my-2 px-2 text-warning"
                  data-toggle="tooltip"
                ></i>
              </Tooltip>
              <h6 className="text my-2 pr-2">
                {moment(todo.dueDate).format(DEFAULT_DATE_FORMAT)}
              </h6>
            </div>
          </div>
        </div>
      )}
      <div className="col-auto m-1 p-0 todo-actions">
        <div className="d-flex align-items-center justify-content-end">
          <i
            className="fa fa-pencil text-info mx-4 p-0 fs-5 btn"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Edit todo"
          ></i>
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

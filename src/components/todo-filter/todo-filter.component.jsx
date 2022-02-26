function TodoFilter() {
  return (
    <>
      <div className="col-auto d-flex align-items-center">
        <label className="text-secondary my-2 mx-2 view-opt-label">
          Filter
        </label>
        <select className="form-select">
          <option value="all" selected>
            All
          </option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
          <option value="has-due-date">Has due date</option>
        </select>
      </div>
      <div className="col-auto d-flex align-items-center px-1 pr-3">
        <label className="text-secondary my-2 mx-2 view-opt-label">Sort</label>
        <select className="form-select">
          <option value="added-date-asc" selected>
            Added date
          </option>
          <option value="due-date-desc">Due date</option>
        </select>
        <i
          className="fa fa fa-sort-amount-asc text-info btn mx-2 px-0 pl-1"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Ascending"
        ></i>
        <i
          className="fa fa fa-sort-amount-desc text-info btn mx-2 px-0 pl-1 d-none"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Descending"
        ></i>
      </div>
    </>
  );
}

export default TodoFilter;

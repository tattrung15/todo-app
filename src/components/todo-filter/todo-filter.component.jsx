import clsx from "clsx";
import { useState } from "react";
import { FILTER, SORT } from "../../constants/common";

function TodoFilter(props) {
  const { getListTodo } = props;

  const [isAsc, setIsAsc] = useState(false);
  const [filter, setFilter] = useState(FILTER.ALL);
  const [sort, setSort] = useState(SORT.CREATED_AT_DESC);

  const onFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    getListTodo(value, sort);
  };

  const onSortSelectChange = (event) => {
    const value = event.target.value;
    setSort(value);
    getListTodo(filter, value);
  };

  const onSortClick = () => {
    const value = !isAsc ? SORT.CREATED_AT_ASC : SORT.CREATED_AT_DESC;
    setIsAsc(!isAsc);
    getListTodo(filter, value);
  };

  return (
    <>
      <div className="col-auto d-flex align-items-center">
        <label className="text-secondary my-2 mx-2 view-opt-label">
          Filter
        </label>
        <select
          value={filter}
          className="form-select"
          onChange={onFilterChange}
        >
          <option value={FILTER.ALL}>All</option>
          <option value={FILTER.COMPLETED}>Completed</option>
          <option value={FILTER.ACTIVE}>Active</option>
          <option value={FILTER.HAS_DUE_DATE}>Has due date</option>
        </select>
      </div>
      <div className="col-auto d-flex align-items-center px-1 pr-3">
        <label className="text-secondary my-2 mx-2 view-opt-label">Sort</label>
        <select
          className="form-select"
          value={sort}
          onChange={onSortSelectChange}
        >
          <option value={SORT.CREATED_AT_DESC}>Added date</option>
          <option value={SORT.DUE_DATE_ASC}>Due date</option>
        </select>
        <i
          className={clsx("fa fa text-info btn mx-2 px-0 pl-1", {
            "fa-sort-amount-asc": isAsc,
            "fa-sort-amount-desc": !isAsc,
          })}
          data-toggle="tooltip"
          data-placement="bottom"
          title={isAsc ? "Ascending" : "Descending"}
          onClick={onSortClick}
        ></i>
      </div>
    </>
  );
}

export default TodoFilter;

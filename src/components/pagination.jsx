import React from "react";
import "./style.css"

const Pagination = (props) => {
  let pages = Math.ceil(props.count / props.pageSize);
  let pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <div style={{display:"grid", justifyContent:"center"}}>
        <ul className="pagination">
          {pagesArray.map((page) => (
            <li
              onClick={() => props.onActivePageChange(page)}
              className={
                page === props.activePage
                  ? "page-item active bg-dark border-0"
                  : "page-item"
              }
            >
              <span className="page-link">
                {page}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;

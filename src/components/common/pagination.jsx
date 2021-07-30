import React, { Component } from "react";

class Pagination extends Component {
  calculatePages = () => {
    const { list, moviePerPage } = this.props;
    const newArray = new Array(Math.ceil(list.length / moviePerPage)).fill(0);
    return newArray;
  };

  render() {
    const { onSelectPage, currentPage, maxPage } = this.props;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage <= 1 ? "disabled" : ""}
              onClick={() => onSelectPage(currentPage - 1)}
            >
              Prev
            </button>
          </li>
          {this.calculatePages().map((movie, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                onClick={() => onSelectPage(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage >= maxPage ? "disabled" : ""}
              onClick={() => onSelectPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;

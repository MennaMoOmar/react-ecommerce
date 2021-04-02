import React, {Component} from "react";
import Filter from "./filter";
import Pagination from "./pagination";

class Admin extends Component {
  state = {};
  render() {
    const { onDelete } = this.props;
    // Filter
    let filteredProducts = this.props.products;
    if (this.props.activeFilter)
      filteredProducts = this.props.products.filter(
        (p) => p.type === this.props.activeFilter
      );

    //sort

    // Pagination
    const { activePage, pageSize } = this.props;
    let start = (activePage - 1) * pageSize;
    let end = start + pageSize;
    let showedProducts = filteredProducts.slice(start, end);
    return (
      <>
        <div className="row mt-4">
          <div className="col-3">
            <Filter
              types={this.props.types}
              activeFilter={this.props.activeFilter}
              onActiveFilterChange={this.props.onActiveFilterChange}
            />
          </div>
          <div className="col">
            <table className="table">
              <thead className="thead-dark text-center">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center align-center">
                {showedProducts.map((prdct) => (
                  <tr>
                    <td style={{ verticalAlign: "middle !important" }}>
                      <img
                        src={prdct.image}
                        alt=""
                        style={{
                          height: "60px",
                          width: "70px",
                          padding: "0px",
                          margin: "0px",
                        }}
                      ></img>
                    </td>
                    <td>{prdct.name}</td>
                    <td>{prdct.price}</td>
                    <td style={{ cursor: "pointer" }}>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          this.props.history.push(`/adminAdd/${prdct.id}`)
                        }
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete(prdct)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredProducts.length >= this.props.pageSize && (
              <Pagination
                key={this.props.products.id}
                pageSize={this.props.pageSize}
                activePage={this.props.activePage}
                count={filteredProducts.length}
                onActivePageChange={this.props.onActivePageChange}
              />
            )}
            <button
              className="btn btn-dark"
              onClick={() => this.props.history.push("/adminAdd/new")}
            >
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Admin;

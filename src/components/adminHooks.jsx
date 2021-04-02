import React, { useState, useEffect } from "react";
import Cart from "./cart";
import Filter from "./filter";
import Pagination from "./pagination";
import Sort from "./sort";

const AdminHooks = () => {
  const [products, setproducts] = useState([]);
  const [pageSize, setpageSize] = useState();
  const [activePage, setactivePage] = useState();
  const [activeFilter, setactiveFilter] = useState();
  const [types, settypes] = useState([]);

  useEffect(() => {
    setpageSize(4);
    setactivePage(1);
    setactiveFilter(0);
    settypes([
      { id: 0, name: "All" },
      { id: 1, name: "Burger" },
      { id: 2, name: "Fries" },
      { id: 3, name: "Cola" },
    ]);
  }, []);

  // Filter
  let filteredProducts = products;
  if (activeFilter)
    filteredProducts = products.filter((p) => p.type === activeFilter);
  let sortedProd = filteredProducts;
  //sort asc
  const sortAsc = () => {
    console.log("asc");
    const sortedProductAsc = [...filteredProducts];
    sortedProductAsc.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    sortedProd = sortedProductAsc;
    console.log(sortedProd);
  };

  //sort desc
  const sortDesc = () => {
    console.log("desc");
    const sortedProductDesc = [...filteredProducts];
    sortedProductDesc.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    sortedProd = sortedProductDesc;
    console.log(sortedProd);
  };
  // Pagination
  let start = (activePage - 1) * pageSize;
  let end = start + pageSize;
  let showedProducts = sortedProd.slice(start, end);

  return (
    <React.Fragment>
      <div className="row mt-4 m-0">
        <div className="col-3 text-center">
          <Filter
            types={types}
            activeFilter={activeFilter}
            //   onActiveFilterChange={this.props.onActiveFilterChange}
          />
          <Sort
            products={products}
            sortedByAsc={sortAsc}
            sortedByDesc={sortDesc}
          ></Sort>
        </div>
        <div className="col">
          <table className="table">
            <thead className="thead-dark text-center">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Cart</th>
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
                      // onClick={() =>
                      //   this.props.history.push(`/adminAdd/${prdct.id}`)
                      // }
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      // onClick={() => onDelete(prdct)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {sortedProd.length >= pageSize && (
            <Pagination
              key={products.id}
              pageSize={pageSize}
              activePage={activePage}
              count={sortedProd.length}
              onActivePageChange={this.props.onActivePageChange}
            />
          )}
          <button
            className="btn btn-dark"
            // onClick={() => this.props.history.push("/adminAdd/new")}
          >
            Add
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminHooks;

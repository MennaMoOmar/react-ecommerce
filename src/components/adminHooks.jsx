import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./filter";
import Pagination from "./pagination";
import Sort from "./sort";

const AdminHooks = (props) => {
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

  //get data
  useEffect(async () => {
    const { data } = await axios.get("http://localhost:3003/products");
    setproducts(data);
  }, []);

  //handleChangeActivePage
  let handleChangeActivePage = (page) => {
      setactivePage(page);
  };

  //handleChangeActiveFilter
  let handleChangeActiveFilter = (type) => {
    setactiveFilter(type.id);
    setactivePage(1)
  };

  //handleDeleteDB
  let handleDeleteDB = async (product) => {
    console.log(product.id);

    await axios.delete("http://localhost:3003/products/" + product.id);
    // Clone
    const newProducts = [...products];
    // Edit
    const filteredProducts = newProducts.filter((p) => p.id !== product.id);
    // Set State
    setproducts(filteredProducts)
  };

  // Filter
  let filteredProducts = products;
  if (activeFilter)
    filteredProducts = products.filter((p) => p.type === activeFilter);
  let sortedProd = filteredProducts;
  //sort asc
  const sortAsc = () => {
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
    setproducts(sortedProd)
  };
  {console.log(products)}

  //sort desc
  const sortDesc = () => {
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
    setproducts(sortedProd)
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
              onActiveFilterChange={handleChangeActiveFilter}
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
                      onClick={() =>
                        props.history.push(`/adminHooksCRUD/${prdct.id}`)
                      }
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteDB(prdct)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {/* {console.log(products)} */}
          {sortedProd.length >= pageSize && (
            <Pagination
              key={products.id}
              pageSize={pageSize}
              activePage={activePage}
              count={sortedProd.length}
              onActivePageChange={handleChangeActivePage}
            />
          )}
          <button
            className="btn btn-dark"
            onClick={() =>props.history.push("/adminHooksCRUD/new")}
          >
            Add
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminHooks;

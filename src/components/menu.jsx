import React, { Component } from "react";
import Cart from "./cart";
import Filter from "./filter";
import Pagination from "./pagination";
import Sort from "./sort";

class Menu extends Component {
  state = {};

  render() {
    // Filter
    let filteredProducts = this.props.products;
    if (this.props.activeFilter)
      filteredProducts = this.props.products.filter(
        (p) => p.type === this.props.activeFilter
      );

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
      sortedProd = sortedProductDesc
      console.log(sortedProd);
    };

    // Pagination
    const { activePage, pageSize } = this.props;
    let start = (activePage - 1) * pageSize;
    let end = start + pageSize;
    let showedProducts = sortedProd.slice(start, end);
    return (
      <>
        <div className="row mt-4 m-0">
          <div className="col-3 text-center">
            <Filter
              types={this.props.types}
              activeFilter={this.props.activeFilter}
              onActiveFilterChange={this.props.onActiveFilterChange}
            />
            <Sort
              products={this.props.products}
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
                      <Cart
                        product={prdct}
                        onToggleInCart={this.props.onToggleInCart}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {sortedProd.length >= this.props.pageSize && (
              <Pagination
                key={this.props.products.id}
                pageSize={this.props.pageSize}
                activePage={this.props.activePage}
                count={sortedProd.length}
                onActivePageChange={this.props.onActivePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Menu;

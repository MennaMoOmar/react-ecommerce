import React, { Component } from "react";
import Cart from "./cart";
import Filter from "./filter";
import Pagination from "./pagination";
import style from  "./style.css"

class Menu extends Component {
  state = {};
  //sortasc
  // sortAsc() {
  //   console.log("jj");
  //   const sortedProductAsc = [...this.props.products];
  //   sortedProductAsc.sort((a, b) => {
  //     if (a.name < b.name) {
  //       return -1;
  //     }
  //     if (a.name > b.name) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   this.state.product = sortedProductAsc;
  // }
  render() {
    // Filter
    let filteredProducts = this.props.products;
    if (this.props.activeFilter)
      filteredProducts = this.props.products.filter(
        (p) => p.type === this.props.activeFilter
      );

    //sort
    // sortAsc = (props) => {
    //   const sortedProductAsc = [...this.props.products];
    //   sortedProductAsc.sort((a, b) => {
    //     if (a.name < b.name) {
    //       return -1;
    //     }
    //     if (a.name > b.name) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    //   console.log(sortedProductAsc);
    // };

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
          <div>
            <i class="fas fa-arrow-up"></i>
            <i class="fas fa-arrow-down"></i>
          </div>
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {showedProducts.map((prdct) => (
                  <tr>
                    <td><img src={prdct.image} style={{height:"100px", width:"130px"}}></img></td>
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
            {filteredProducts.length >= this.props.pageSize && (
              <Pagination
                pageSize={this.props.pageSize}
                activePage={this.props.activePage}
                count={filteredProducts.length}
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

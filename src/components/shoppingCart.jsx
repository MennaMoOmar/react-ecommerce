import React, { Component } from "react";
import Product from "./product";

class ShoppingCart extends Component {

  render() {
    return (
      <div>
        {this.props.products.map((prdct) => (
          <Product
            key={prdct.id}
            product={prdct}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
          />
        ))}
      </div>
    );
  }
}

export default ShoppingCart;

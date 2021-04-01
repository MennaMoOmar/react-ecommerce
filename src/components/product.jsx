import React, { Component } from "react";

class Product extends Component {
  state = {};
  componentWillUnmount() {
    console.log("Product =>> WillUNMPUNT");
  }
  render() {
    const { image, name, count } = this.props.product;
    return (
      <>
        <div>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <img
                    src={image}
                    alt=""
                    style={{ height: "60px", width: "100px" }}
                  ></img>
                </td>
                <td>{name}</td>
                <td>
                  {" "}
                  <span
                    onClick={() => this.props.onDecrement(this.props.product)}
                    style={{ cursor: "pointer" }}
                  >
                    -
                  </span>
                  <span> {count + 1} </span>
                  <span
                    onClick={() => this.props.onIncrement(this.props.product)}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </span>
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => this.props.onDelete(this.props.product)}
                    className="btn btn-danger btn-sm m-2"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Product;

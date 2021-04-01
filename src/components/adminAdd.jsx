import React, { Component } from "react";
import axios from "axios";
import joi from "joi-browser";

class AdminAdd extends Component {
  state = {
    id: "",
    name: "",
    image: "",
    type: "",
    price: "",
    errors: {},
  };

  /* schema joi */
  schema = {
    name: joi.string().required(),
    price: joi.number().required(),
  };
  /* validation */
  validate = () => {
    const errors = {};
    const state = { ...this.state };
    delete state.errors;
    const res = joi.validate(state, this.schema, { abortEarly: false });
    if (res.error === null) {
      return null;
    }
    for (const errors of res.error.details) {
      errors["error.path"] = res.error.message;
    }
    // console.log(errors["error.path"]);
    this.setState({errors})
    console.log(errors);
  };

  /* edit */
  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== "new") {
      const { data } = await axios.get("http://localhost:3003/products/" + id);
      console.log(data.image);
      //Clone
      const state = { ...this.state };
      //Edit
      state.name = data.name;
      state.price = data.price;
      state.type = data.type;
      state.id = data.id;
      state.image = data.image;
      //Set state
      this.setState(state);
    }
  }

  /* submit */
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      console.log("errrrrr");
      return;
    }
    //ADD
    if (this.props.match.params.id === "new") {
      const obj = {
        ...this.state,
        count: 0,
        isInCart: false,
        image: "./images/default.jpg",
      };
      await axios.post("http://localhost:3003/products/", obj);
    } else {
      //EDit
      const obj = {
        ...this.state,
        count: 0,
        isInCart: false,
      };
      //Delete Redundant ID
      delete obj.id;
      await axios.put("http://localhost:3003/products/" + this.state.id, obj);
    }
    this.props.history.replace("/admin");
  };

  /* input */
  handleChange = (e) => {
    //Clone
    let state = { ...this.state };
    //Edit
    state[e.currentTarget.name] = e.currentTarget.value;
    //Set state
    this.setState(state);
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{padding:"30px 50px", color:"#af3810"}}>
          {this.props.match.params.id === "new"
            ? "Add Product"
            : "Edit Product"}
        </h1>
        <form onSubmit={this.handleSubmit} style={{padding:"0px 50px"}}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              value={this.state.name}
              id="name"
              name="name"
              type="text"
            />
            <div className="alrt alrt-danger">{this.state.errors.name}</div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              value={this.state.price}
              id="price"
              name="price"
              type="text"
            />
            <div className="alrt alrt-danger">{this.state.errors.price}</div>
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              value={this.state.type}
              id="type"
              name="type"
              type="text"
            />
            <div className="alrt alrt-danger">{this.state.errors.type}</div>
          </div>
          <button type="submit" className="btn btn-success">
            {this.props.match.params.id === "new" ? "Add" : "Edit"}
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AdminAdd;

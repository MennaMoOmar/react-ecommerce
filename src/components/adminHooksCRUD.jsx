import React, { useState, useEffect } from "react";
import axios from "axios";
import joi from "joi-browser";

const AdminHooksCRUD = (props) => {
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [image, setimage] = useState();
  const [type, settype] = useState();
  const [price, setprice] = useState();
  const [errors, setErrors] = useState({ name, price, type });
  const [product, setproduct] = useState({
    id,
    image,
    type,
    name,
    price,
    errors,
  });

  // const [validate, setvalidate] = {name, price, errors};

  const schema = {
    name: joi.string().alphanum().min(3).max(10).required(),
    price: joi.number().required(),
    type: joi.number().required().min(0).max(3),
  };

  /* validate */
  const validate = () => {
    const errors = {};
    const prod = { ...product };
    const prod2 = {
      name: prod.name,
      price: prod.price,
      type: prod.type,
      errors: prod.errors,
    };
    delete prod2.errors;
    const res = joi.validate(prod2, schema, { abortEarly: false });
    console.log(res);
    if (res.error === null) {
      setErrors({});
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    setErrors(errors);
    return errors;
  };

  /* Edit */
  useEffect(async () => {
    const id = props.location.pathname.split("/")[2];
    if (id !== "new") {
      const { data } = await axios.get("http://localhost:3003/products/" + id);
      const p = { ...product };
      setid(data.id);
      setimage(data.image);
      setname(data.name);
      setimage(data.image);
      settype(data.type);
      setprice(data.price);
      setproduct({
        id: id,
        name: name,
        image: image,
        type: type,
        price: price,
        errors: errors
      });
    }
  }, []);

  /* submit */
  let handleSubmit = async (e) => {
    e.preventDefault();
    const errorr = validate();
    console.log(errorr);
    if (errorr) return;
    else {
      const id = props.location.pathname.split("/")[2];
      //ADD
      if (id === "new") {
        const obj = {
          // ...product,
          name: product.name,
          price: parseInt(product.price),
          type: parseInt(product.type),
          image: "./images/default.jpg",
          count: 0,
          isInCart: false,
          errors: product.errors,
        };
        console.log(typeof obj.type)
        await axios.post("http://localhost:3003/products/", obj);
      } else {
        //EDit
        console.log(product);
        const obj = {
          // ...product,
          name: product.name,
          price: parseInt(product.price),
          type: parseInt(product.type),
          errors: product.errors,
          count: 0,
          isInCart: false,
        };
        //Delete Redundant ID
        delete obj.id;
        await axios.put("http://localhost:3003/products/" + product.id, obj);
      }
      props.history.replace("/adminHooks");
    }
  };

  /* input */
  let handleChange = (e) => {
    //Clone
    let p = { ...product };
    //Edit
    p[e.currentTarget.name] = e.currentTarget.value;
    p[e.currentTarget.price] = e.currentTarget.value;
    p[e.currentTarget.type] = e.currentTarget.value;
    //Set state
    setproduct(p);
  };

  return (
    <React.Fragment>
      <h1 style={{ padding: "30px 50px", color: "#af3810" }}>
        {props.location.pathname.split("/")[2] === "new"
          ? "Add Product"
          : "Edit Product"}
      </h1>
      <form onSubmit={handleSubmit} style={{ padding: "0px 50px" }}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={name}
            id="name"
            name="name"
            type="text"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={price}
            id="price"
            name="price"
            type="text"
          />
          {errors.price && <div className="text-danger">{errors.price}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          {/* <input
            className="form-control"
            onChange={handleChange}
            value={type}
            id="type"
            name="type"
            type="text"
          /> */}
          <select 
           className="form-control"
           onChange={handleChange}
           value={type}
           id="type"
           name="type" 
           >
            <option value="1">Burger</option>
            <option value="2">Fries</option>
            <option value="3">Cola</option>
          </select>
          {errors.type && <div className="text-danger">{errors.type}</div>}
        </div>
        <button type="submit" className="btn btn-success">
          {props.location.pathname.split("/")[2] === "new" ? "Add" : "Edit"}
        </button>
      </form>
    </React.Fragment>
  );
};

export default AdminHooksCRUD;

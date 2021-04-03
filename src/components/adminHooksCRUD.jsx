import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHooksCRUD = (props) => {
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [image, setimage] = useState();
  const [type, settype] = useState();
  const [price, setprice] = useState();
  const [product, setproduct] = useState({ id, name, image, type, price });

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
        image: image,
        type: type,
        price: price,
      });
    }
  }, []);

  /* submit */
  let handleSubmit = async (e) => {
    e.preventDefault();
    const id = props.location.pathname.split("/")[2];
    //ADD
    if (id === "new") {
      const obj = {
        ...product,
        count: 0,
        isInCart: false,
        image: "./images/default.jpg",
      };
      await axios.post("http://localhost:3003/products/", obj);
    } else {
      //EDit
      console.log(product);
      const obj = {
        ...product,
        count: 0,
        isInCart: false,
      };
      //Delete Redundant ID
      delete obj.id;
      console.log(obj);
      await axios.put("http://localhost:3003/products/" + product.id, obj);
    }
    props.history.replace("/adminHooks");
  };

  /* input */
  let handleChange = (e) => {
    //Clone
    let p = { ...product };
    //Edit
    p[e.currentTarget.name] = e.currentTarget.value;
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
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={type}
            id="type"
            name="type"
            type="text"
          />
        </div>
        <button type="submit" className="btn btn-success">
          {props.location.pathname.split("/")[2] === "new" ? "Add" : "Edit"}
        </button>
      </form>
    </React.Fragment>
  );
};

export default AdminHooksCRUD;

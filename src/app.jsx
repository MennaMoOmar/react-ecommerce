import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/navbar/navbar";
import ShoppingCart from "./components/shoppingCart";
import About from "./components/about";
import ContactUs from "./components/contactus";
import Home from "./components/home";
import User from "./components/user";
import NotFound from "./components/notfound";
import Menu from "./components/menu";

class App extends Component {
  state = {
    types: [
      { id: 0, name: "All" },
      { id: 1, name: "Burger" },
      { id: 2, name: "Fries" },
      { id: 3, name: "Cola" },
    ],
    products: [
      {
        id: 1,
        type: 1,
        name: "Burger",
        image: "./images/beefburger.png",
        count: 0,
        price: 30,
        inCart: false,
      },
      {
        id: 2,
        type: 2,
        name: "Fries",
        image: "./images/fries.jpg",
        count: 0,
        price: 20,
        inCart: false,
      },
      {
        id: 3,
        type: 3,
        name: "Cola",
        image: "./images/coke.png",
        count: 0,
        price: 10,
        inCart: false,
      },
      {
        id: 4,
        type: 1,
        name: "Large Burger",
        image: "./images/largeburger.jpg",
        count: 0,
        price: 40,
        inCart: false,
      },
      {
        id: 5,
        type: 2,
        name: "Large Fries",
        image: "./images/fries.jpg",
        count: 0,
        price: 25,
        inCart: false,
      },
      {
        id: 6,
        type: 3,
        name: "Large Cola",
        image: "./images/coke.png",
        count: 0,
        price: 15,
        inCart: false,
      },
    ],
    pageSize: 4,
    activePage: 1,
    activeFilter: 0,
  };

  /* delete */
  handleDelete = (product) => {
    // Clone
    const newProducts = [...this.state.products];
    // Edit
    const filteredProducts = newProducts.filter((p) => p.id !== product.id);
    // Set State
    this.setState({ products: filteredProducts });
  };

  /* reset */
  handleReset = () => {
    // Clone
    let products = [...this.state.products];
    // Edit
    products = products.map((p) => {
      return { ...p, count: 0 };
    });
    // Set State
    this.setState({ products });
  };

  //   increment
  handleIncrement = (product) => {
    // Clone
    let products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    // Edit
    products[index].count++;
    // Set State
    this.setState({ products });
  };

  /*decremnt*/
  handleDecrement = (product) => {
    //clone
    let products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    //edit
    if (products[index].count <= 0) {
      return;
    }
    console.log(products[index].count);
    if (products[index].count <= 1) {
      document.querySelectorAll(".addCart")[index].textContent = "Add to cart";
    }
    products[index].count--;
    //set state
    this.setState({ products: products });
  };

  /* cart */
  handleToggleInCart = (product) => {
    // Clone
    let products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    // Edit
    products[index].inCart = !products[index].inCart;
    // Set State
    this.setState({ products });
  };

  /* active page */
  handleChangeActivePage = (page) => {
    this.setState({ activePage: page });
  };

  /* filter */
  handleChangeActiveFilter = (type) => {
    this.setState({ activeFilter: type.id, activePage: 1 });
  };

  /////////////////////
  render() {
    return (
      <>
        <NavBar count={this.state.products.filter((p) => p.count > 0).length} />
        <main className="container">
          <Switch>
            <Route
              path="/cart"
              render={() => (
                <ShoppingCart
                  products={this.state.products.filter((p) => p.inCart)}
                  onIncrement={this.handleIncrement}
                  onDelete={this.handleToggleInCart}
                  onReset={this.handleReset}
                />
              )}
            />
            <Route
              path="/menu"
              render={() => (
                <Menu
                  products={this.state.products}
                  types={this.state.types}
                  pageSize={this.state.pageSize}
                  activePage={this.state.activePage}
                  activeFilter={this.state.activeFilter}
                  onToggleInCart={this.handleToggleInCart}
                  onActivePageChange={this.handleChangeActivePage}
                  onActiveFilterChange={this.handleChangeActiveFilter}
                />
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/user/:id" component={User} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/home" component={Home} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
          {/* <ShoppingCart
            products={this.state.products}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
          /> */}
        </main>
      </>
    );
  }
}

export default App;

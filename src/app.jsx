import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/navbar";
import ShoppingCart from "./components/shoppingCart";
import About from "./components/about";
import ContactUs from "./components/contactus";
import Home from "./components/home";
import NotFound from "./components/notfound";
import Menu from "./components/menu";
import Admin from "./components/admin";
import AdminAdd from "./components/adminAdd";

import AdminHooks from "./components/adminHooks";
import AdminHooksCRUD from "./components/adminHooksCRUD";

class App extends Component {
  state = {
    types: [
      { id: 0, name: "All" },
      { id: 1, name: "Burger" },
      { id: 2, name: "Fries" },
      { id: 3, name: "Cola" },
    ],
    products: [],
    pageSize: 4,
    activePage: 1,
    activeFilter: 0,
  };

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3003/products");
    this.setState({ products: data });
  }

  /* delete */
  handleDeleteDB = async (product) => {
    console.log(product.id);

    await axios.delete("http://localhost:3003/products/" + product.id);
    // Clone
    const newProducts = [...this.state.products];
    // Edit
    const filteredProducts = newProducts.filter((p) => p.id !== product.id);
    // Set State
    this.setState({ products: filteredProducts });
  };

  /* delete */
  handleDelete = async (product) => {
    // Clone
    const newProducts = [...this.state.products];
    // Edit
    const filteredProducts = newProducts.filter((p) => p.id !== product.id);
    // Set State
    this.setState({ products: filteredProducts });
  };

  /* increment */
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
        <main>
          <Switch>
            <Route
              path="/cart"
              render={() => (
                <ShoppingCart
                  products={this.state.products.filter((p) => p.inCart)}
                  onIncrement={this.handleIncrement}
                  onDecrement={this.handleDecrement}
                  onDelete={this.handleToggleInCart}
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
            <Route path="/adminHooks" render={() => <AdminHooks />} />
            <Route path="/adminHooksCRUD" render={() => <AdminHooksCRUD />} />
            <Route
              path="/admin"
              render={(props) => (
                <Admin
                  {...props}
                  key={this.state.products.id}
                  products={this.state.products}
                  onDelete={this.handleDeleteDB}
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
            <Route path="/adminAdd/:id" component={AdminAdd} />
            <Route path="/about" component={About} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/home" component={Home} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;

import React, { Component } from "react";
import {BrowserRouter as Router, Route, Redirect , Switch , Link } from 'react-router-dom';
import OrderService from "../services/orderservice";
import OrdersForm from "./add-order.component"; 

export default class OrderList extends Component {

  constructor(props) {
    super(props);

    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this); 
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveOrders() {
    OrderService.getAll()
      .then(response => {
        this.setState({
          orders: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOrders();
    this.setState({
      currentOrder: null,
      currentIndex: -1
    });
  }
 
  searchTitle() {
    OrderService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          orders: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle} >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="list row">
          <div className="col-md-12"> 
               
              <Link to={"/ordersForm"} className="btn btn-outline-primary">
                Create Order
              </Link>

          </div>
        </div>

        <div className="col-md-6">
          <h4>Orders List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Orders</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/orders/" + currentTutorial.id}
                className="badge badge-warning" >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Order...</p>
            </div>
          )}
        </div>
      </div>
    );

  }
}
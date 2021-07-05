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

  setActiveOrder(order, index) {
    this.setState({
      currentOrder: order,
      currentIndex: index
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
    const { searchTitle, orders, currentOrder, currentIndex } = this.state;

    return (
      <div className="list row"> 

       

        <div className="col-md-12">
          <h4>Orders List</h4>

          <div className="list row"> 
            <div className="col-md-12">
              <Link to={"/ordersForm"} className="btn btn-outline-primary">
                Create Order
              </Link>
            </div>
          </div>
          
          <table className="table">
            <thead>
              <tr>
                <th>N</th>
                <th>Consumer</th>
                <th>Status</th>
                <th>Date</th> 
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {orders &&
              orders.map((order, index) => ( 
                <tr
                  className={
                    " " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveOrder(order, index)}
                  key={index}
                >
                  <td>{index+1}</td>
                  <td>{order.customer}</td>
                  <td>{order.staus}</td>
                  <td>{order.date}</td> 
                  <td>{order.totalAmount}</td> 
                  <td> 
                    <Link
                        to={"/ordersForm/" + order.id}
                        className="badge badge-info" >
                        Edit
                    </Link>

                  </td>
                </tr> 
              ))}
              </tbody>
          </table>

        </div>
        
      </div>
    );

  }
}
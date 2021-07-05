import React, { Component } from "react";
import {BrowserRouter as Router, Route, Redirect , Switch , Link } from 'react-router-dom';
import OrderService from "../services/orderservice";

export default class AddOrder extends Component {

  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.getOrder = this.getOrder.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.newOrder = this.newOrder.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  componentDidMount() {

    if( this.props.match ){
      this.getOrder(this.props.match.params.id);
    }else{
      this.newOrder();
    }
    
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveOrder() {

    var data = {
      title: this.state.title,
      description: this.state.description
    };

    OrderService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addItem() {}

  cancelOrder() {
    this.newOrder();
  }

  newOrder() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  getOrder(id) { 
    OrderService.get(id)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: false
        });
        console.log('Respuesta = '+response.data);
      })
      .catch(e => {
        console.log('Exception: '+ e);
      });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newOrder}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label>ORDER N°</label> 
            </div>

            <Link
                to={"/orders" }
                className="btn btn-danger float-right" >
                Back
              </Link>

            <div className="form-group">
              <label htmlFor="customer">Customer</label>
              <input
                type="text"
                className="form-control"
                id="customer"
                required
                value={this.state.customer}
                onChange={this.onChangeCustomer}
                name="customer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                required
                value={this.state.status}
                onChange={this.onChangeStatus}
                name="status"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                className="form-control"
                id="date"
                required
                value={this.state.date}
                onChange={this.onChangeDate}
                name="date"
              />
            </div>

            <table className="table">
              <thead>
                <tr>
                <th>N</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Cost</th>
                <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table> 

            <div className="row float-right">
              <button onClick={this.addItem} className="btn btn-info ">
                Add Item +
              </button>
            </div> 
            <div className="row">
              <div className="col-md-6">
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">Subtotal</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Taxes</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Total City Tax</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Total Country Tax</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Total State Tax</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Total Federal Tax</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Total Taxes</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row">
                  <div className="col-md-6">Total</div>
                  <div className="col-md-6">$0</div>
                </div>
                <div className="row"></div>
              </div>
            </div> 

            <div className="row float-right">
              <button onClick={this.saveOrder} className="btn btn-success">
                Complete Order
              </button>

              <button onClick={this.cancelOrder} className="btn btn-success">
                Reject Order
              </button>
            </div>


            <div className="row ">
             <Link
                to={"/orders" }
                className="btn btn-danger" >
                List
              </Link>
            </div>

          </div>
        )}
      </div>
    );
  }

}
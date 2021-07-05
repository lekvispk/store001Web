import React, { Component } from "react";
import {BrowserRouter as Router, Route, Redirect , Switch , Link } from 'react-router-dom';
import ProductService from "../services/productservice";

export default class AddProduct extends Component {

  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.getProduct = this.getProduct.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      name: "",
      category: "", 
      unitPrice: 0.0,
      status: 1,
      active:true,
      submitted: false
    };

  }

  componentDidMount() {

    if( this.props.match ){
      this.getProduct(this.props.match.params.id);
    }else{
      this.newProduct();
    }
    
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      unitPrice: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  saveProduct() {

    var data = {
      name: this.state.name,
      category: this.state.category,
      unitPrice: this.state.unitPrice,
      status: this.state.status,
      active:true
    };

    ProductService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          category: response.data.category,
          unitPrice: response.data.unitPrice,
          status: response.data.status,
          active: response.data.active,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: "",
      category: "",
      unitPrice: 0.0,
      status: 1,
      acrive:true,
      submitted: false
    });
  }

  getProduct(id) {
    console.log( 'getProduct(' + id + ')');
    ProductService.get(id)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          category: response.data.category,
          unitPrice: response.data.unitPrice,
          status: response.data.status,
          active: response.data.active,
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
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category" />
            </div>

            <div className="form-group">
              <label htmlFor="unitPrice">price</label>
              <input
                type="text"
                className="form-control"
                id="unitPrice"
                required
                value={this.state.unitPrice}
                onChange={this.onChangePrice}
                name="unitPrice" />
            </div>

            <div className="form-group">
              <label htmlFor="status">status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                required
                value={this.state.status}
                onChange={this.onChangeStatus}
                name="status" />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>

            <Link
                to={"/products" }
                className="btn btn-danger" >
                List
            </Link>

          </div>
        )}
      </div>
    );
  }

}
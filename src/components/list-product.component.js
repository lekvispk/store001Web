import React, { Component } from "react";
import ProductService from "../services/productservice";
import { Link } from "react-router-dom";

export default class ProductList extends Component {

  constructor(props) {
    super(props);

    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this); 
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchTitle: ""
    };

  }

  componentDidMount() {
    this.retrieveProducts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveProducts() {
    ProductService.getAll()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

 setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }
 
  searchTitle() {
    ProductService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    const { searchTitle, products, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        
        <div className="col-md-12">

          <h4>Products</h4>

            <div className="col-md-8">
              <Link
                  to={"/productsForm"}
                  className="btn btn-info" >
                  Create Product
                </Link>
            </div>

          <table className="table">
            <thead>
              <tr>
                <th>N</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>         
            {products &&
              products.map((product, index) => (
                 <tr 
                  className={
                    " " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                  >
                    <td>{index+1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.active=='true'? 'Active' : 'Inactive'}</td>
                    <td>
                      <Link
                        to={"/productsForm/" + product.id}
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
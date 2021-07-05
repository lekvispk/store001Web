import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Switch , Link, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container, Navbar, Nav } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'

//import Orders from './pages/orders'
//import OrdersForm from './pages/ordersForm'
//import Products from './pages/products'

import Orders from "./components/list-order.component";
import OrdersForm from "./components/add-order.component";
import Products from "./components/list-product.component";
import ProductsForm from "./components/add-product.component";

import './index.css'

const routes = [
  { path: '/orders', name: 'Orders', Component: Orders },
  { path: '/ordersForm', name: 'Create', Component: OrdersForm },
  { path: '/products', name: 'Products', Component: Products },
  { path: '/productsForm', name: 'ProductsForm', Component: ProductsForm },
]

class App extends Component {
  render() {
    return (
      <div className="App">
         <Router>
          <>
            <Navbar bg="light">
              <Nav className="mx-auto">
                {routes.map(route => (
                  <Nav.Link
                    key={route.path}
                    as={NavLink}
                    to={route.path}
                    activeClassName="active"
                    exact
                  >
                    {route.name}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar>
            <Container className="container">
              {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                    <CSSTransition
                      in={match != null}
                      timeout={300}
                      classNames="page"
                      unmountOnExit
                    >
                      <div className="page">
                        <Component />
                      </div>
                    </CSSTransition>
                  )}
                </Route>
              ))}
            </Container>
          </>

           <Switch>
            <Route path="/productsForm/:id" component={ProductsForm} />
            <Route path="/ordersForm/:id" component={OrdersForm} /> 
          </Switch>

        </Router>

         <div className="container mt-3">
         
        </div>
        
      </div>
     

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
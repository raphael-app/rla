import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

//Bootstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

// Screens
import Home from './screens/Home'
import Login from './screens/Account/Login'
import Register from './screens/Account/Register'
import Restaurants from './screens/Restaurants'
import RestaurantsDetail from './screens/Restaurants/RestaurantsDetail'
import RestaurantsEdit from './screens/Restaurants/RestaurantsEdit'
import RestaurantsCreate from './screens/Restaurants/RestaurantsCreate'

// Actions
import {initApp} from './actions/init';
import {logout} from "./actions/auth";
import {refreshToken} from "./actions/auth";

class App extends Component {

  componentWillMount() {
    const {history, initApp} = this.props;
    const redirectUrl = history.location.pathname;
    initApp(redirectUrl);
  }

  componentDidUpdate() {
    const {history, isAppInitializing, isLoggedIn} = this.props;

    if (isLoggedIn) {
        refreshToken();
    }

  }

  render() {
    const {props} = this;
    const {isLoggedIn} = props;
    return (
      <div>
      <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Raphael</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={false} navbar>
                <Nav className="ml-auto" navbar>

                  <NavItem>
                    { !isLoggedIn ? <NavLink href="/login">Login</NavLink> 
                    :  <NavLink onClick={()=>props.logout()}>Logout</NavLink>
                    }
                  </NavItem>
                  <NavItem>
                    <NavLink href="/register">Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/restaurants">Restaurants</NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink href="/restaurants/create">Add Restaurant</NavLink>
                  </NavItem>
                  
                  
                </Nav>
              </Collapse>
            </Navbar>
      

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurants" component={Restaurants} />
          <Route exact path="/restaurants/detail/:restaurantId" component={RestaurantsDetail} />
          <Route exact path="/restaurants/edit/:restaurantId" component={RestaurantsEdit} />
          <Route exact path="/restaurants/create/" component={RestaurantsCreate} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </main>
      </div>
);


  }

};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    isLoggedIn: state.auth.isLoggedIn,
    redirectUrl: "testUrl",
    isAppInitializing: state.init.isAppInitializing
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  initApp,
  logout,
  refreshToken,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
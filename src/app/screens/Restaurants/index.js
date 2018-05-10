import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

//Bootstrap
import {Row, Col, Button, Input, Card, CardHeader, CardBody, CardFooter, Form, FormGroup} from 'reactstrap'

import {
  getRestaurants
} from '../../actions/restaurants'

class Restaurants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
  }

  componentDidMount() {
    const {getRestaurants} = this.props;
    getRestaurants('default');
  }

render() {
    const {state, props} = this;
    return (
      <div className=" animatedfadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>

              <CardHeader>
                <FormGroup row>
          
                </FormGroup>
              </CardHeader>
              
                <CardBody className="animated fadeIn">
                  { 
                    props.restaurants.map((restaurant, key) => {

                    let link = "/restaurants/detail/" + restaurant.id
                    
                    return (<div key={key}><Link className="nav-link" to={ link }>{restaurant.title}</Link></div>)

                    })
                  }
                </CardBody>
             
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants.restaurants
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getRestaurants
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants)
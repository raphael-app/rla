import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

//Bootstrap
import {Row, Col, Button, Input, Card, CardHeader, CardBody, CardFooter, Form, FormGroup} from 'reactstrap'

//Actions
import {
  getRestaurant
} from '../../../actions/restaurants'


//Components
import RestaurantButton from '../../../components/Buttons/';


class Restaurants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      editButton: false,
    }
  }

  componentDidMount() {
    const {getRestaurant} = this.props;
    const {restaurantId} = this.props.match.params;
    getRestaurant(restaurantId);
  }

render() {
    const {state, props} = this;
    const {selectedRestaurant} = props;

    if(props.userData.user) {

        if(props.userData.user.id === selectedRestaurant.owner_id) {

          state['editButton'] = "/restaurants/edit/" + selectedRestaurant.id;
        }
    }
    return (
      <div className=" animatedfadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              
                <CardBody className="animated fadeIn">
                  {selectedRestaurant.title}
                  <br />
                  {selectedRestaurant.description}
                  <br />
                  {selectedRestaurant.body}

                  <br /><br /><br />

                  { state['editButton'] && <RestaurantButton link={ state['editButton'] } text="Edit"/> }

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
    selectedRestaurant: state.restaurants.selectedRestaurant,
    userData: state.auth.userData
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getRestaurant
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants)
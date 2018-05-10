import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

//Bootstrap
import {Row, Alert, Label, Col, Button, Input, Card, CardHeader, CardBody, CardFooter, Form, FormGroup} from 'reactstrap'

//Actions
import {initApp} from '../../../actions/init';
import {
  getRestaurant,
  editRestaurant
} from '../../../actions/restaurants'
import {
  refreshToken  
} from '../../../actions/auth'

//Components
import RestaurantButton from '../../../components/Buttons/';

const formValidation = {
  title: true,
  description: true,
  body: true
};

class Restaurants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      body: '',
      formValidation: {
        isValidForm: true,
        title: true,
        description: true,
        body: true
      }
    }
  }

  componentWillMount() {
    const {initApp} = this.props;
    initApp('/');
  }

  componentDidMount() {
    const {getRestaurant} = this.props;
    const {restaurantId} = this.props.match.params;
    getRestaurant(restaurantId);

  }

  edit = () => {

    const {props, state} = this;
    formValidation.isValidForm = true;

    if (state.title === '') {
      formValidation.title = false;
      formValidation.isValidForm = false;
    }

    if (state.description === '') {
      formValidation.description = false;
      formValidation.isValidForm = false;
    }

    if (state.body === '') {
      formValidation.body = false;
      formValidation.isValidForm = false;
    }

    this.setState({formValidation});

    if (formValidation.isValidForm) {
      props.editRestaurant(this.props.match.params.restaurantId, this.props.selectedRestaurant.slug, state.title, state.description, state.body, props.userData)
    }

  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    if (event.target.value !== '') {
      this.unsetError(event.target.name);
    }
  };

  unsetError = (inputName) => {
    formValidation[inputName] = true;
    this.setState({formValidation})
  };

render() {
    const {state, props} = this;
    const {selectedRestaurant} = props;

    if(props.userData.user) {

        if(props.userData.user.id !== selectedRestaurant.owner_id) {

          push('/restaurants');
        }
    }
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

                { props.restaurantsResponseMessage && <Alert color="primary"> { 
                    props.restaurantsResponseMessage.map((error, key) => {
                    
                    return (<div key={key}>{error}</div>)

                    })
                  } </Alert> }

                  <Form>
        <FormGroup>

        <Label for="exampleEmail">Title</Label>
          <Input
                                   onChange={this.handleChange} type="text" name="title" placeholder="Title"/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Description</Label>
          <Input
                                   onChange={this.handleChange} type="textarea" name="description" placeholder="Description"/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Body</Label>
          <Input
                                   onChange={this.handleChange} type="textarea" name="body" placeholder="Body"/>
        </FormGroup>
        
        <Button onClick={() => this.edit()} color="primary"
                                      className="px-4">Edit</Button>

      </Form>
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
    restaurantsResponseMessage: state.restaurants.restaurantsResponseMessage,
    userData: state.auth.userData
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  initApp,
  getRestaurant,
  editRestaurant
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants)
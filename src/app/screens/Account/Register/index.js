import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

//Bootstrap
import {Alert, Row, Col, Button, Input, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, FormText} from 'reactstrap'

import {register} from '../../../actions/auth';
import {initApp} from '../../../actions/init';

const redirectUrl = '/login';
const formValidation = {
  username: true,
  password: true
};

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      formValidation: {
        isValidForm: true,
        username: true,
        email: true,
        password: true
      }
    };
  }

  componentWillMount() {
    const {initApp} = this.props;
  }

  signUp = () => {

    const {props, state} = this;
    formValidation.isValidForm = true;

    if (state.username === '') {
      formValidation.username = false;
      formValidation.isValidForm = false;
    }

    if (state.password === '') {
      formValidation.password = false;
      formValidation.isValidForm = false;
    }

    if (state.email === '') {
      formValidation.email = false;
      formValidation.isValidForm = false;
    }

    this.setState({formValidation});

    if (formValidation.isValidForm) {
      props.register(state.username, state.password, state.email, state.first_name, state.last_name)
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

                { props.registerResponseMessage && <Alert color="primary"> { 
                    props.registerResponseMessage.map((error, key) => {
                    
                    return (<div key={key}>{error}</div>)

                    })
                  } </Alert> }
                  <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input className={!state.formValidation.email ? "is-invalid" : "is-valid"}
                                   onChange={this.handleChange} type="text" name="email" placeholder="E-mail"/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Username</Label>
          <Input className={!state.formValidation.username ? "is-invalid" : "is-valid"}
                                   onChange={this.handleChange} type="text" name="username" placeholder="Username"/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">First Name</Label>
          <Input className={!state.formValidation.first_name ? "is-invalid" : "is-valid"}
                                   onChange={this.handleChange} type="text" name="first_name" placeholder="First Name"/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Last Name</Label>
          <Input className={!state.formValidation.last_name ? "is-invalid" : "is-valid"}
                                   onChange={this.handleChange} type="text" name="last_name" placeholder="Last Name"/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input className={!state.formValidation.password ? "is-invalid" : "is-valid"}
                                   onChange={this.handleChange} type="password" name="password"
                                   placeholder="Password"/>
        </FormGroup>
        <Button onClick={() => this.signUp()} color="primary"
                                      className="px-4">Register</Button>

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
    userData: state.auth.userData,
    registerResponseMessage: state.auth.registerResponseMessage,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  register,
  initApp,
  changePage: (url) => push(url)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
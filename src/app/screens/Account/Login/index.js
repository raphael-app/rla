import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

//Bootstrap
import {Row, Col, Button, Input, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, FormText} from 'reactstrap'

import {login} from '../../../actions/auth';
import {initApp} from '../../../actions/init';

const redirectUrl = '/login';
const formValidation = {
  username: true,
  password: true
};

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      formValidation: {
        isValidForm: true,
        username: true,
        password: true
      }
    };
  }

  componentWillMount() {
    const {initApp} = this.props;
    initApp(redirectUrl);
  }

  signIn = () => {

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

    this.setState({formValidation});

    if (formValidation.isValidForm) {
      props.login(state.username, state.password)
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
                  <Form>
        <FormGroup>
          <Label for="exampleEmail">Username</Label>
          <Input className={!state.formValidation.username ? "is-invalid" : "is-valid"}
                                   onChange={this.handleChange} type="text" name="username" placeholder="Username"/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input className={!state.formValidation.password ? "is-invalid" : "is-valid"}
                                   onChange={this.handleChange} type="password" name="password"
                                   placeholder="Password"/>
        </FormGroup>
        <Button onClick={() => this.signIn()} color="primary"
                                      className="px-4">Login</Button>

                                      <p dangerouslySetInnerHTML={{"__html":props.loginResponseMessage}} className="text-danger"></p>
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
    userData: state.auth.userData
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  initApp,
  changePage: (url) => push(url)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
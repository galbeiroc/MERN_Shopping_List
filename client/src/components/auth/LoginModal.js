import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  FormGroup,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //if authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        console.log('isAuthenticated', isAuthenticated);
        console.log('this.state.modal', this.state.modal);
        this.toggle();
      }
    }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = ({ target: { name, value } }) => {
    console.log('value', value);
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
        email, password
    }

    //Attempt to login
    this.props.login(user)

  };

  render() {
    return (
      <div>
        <NavLink
          onClick={this.toggle}
          style={{ color: 'white', cursor: 'pointer' }}
        >
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for={'email'}>Email</Label>
                <Input
                  type="email"
                  name={'email'}
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for={'password'}>Password</Label>
                <Input
                  type="password"
                  name={'password'}
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color={'dark'} style={{ marginTop: '2rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
